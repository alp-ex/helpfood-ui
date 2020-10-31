import { HTTPCommon } from '@utils/http-common'

type Recipe = {
    id: string
    name: string
    category: string
    ingredients: ReadonlyArray<string>
}

const httpRequests = new HTTPCommon({
    baseUrl: 'http://localhost:3000',
})

export const getCategories = (): Promise<
    ReadonlyArray<{ id: number; name: string }>
> => httpRequests.get('/categories')

export const getRecipes = async (): Promise<ReadonlyArray<Recipe>> => {
    const recipes = await httpRequests.get('/recipes')

    return recipes
        ? recipes.map(
              (recipe: {
                  id: string
                  name: string
                  categories: string
                  ingredients: ReadonlyArray<string>
              }) => ({
                  id: recipe.id || '',
                  name: recipe.name || '',
                  category: recipe.categories || '',
                  ingredients: recipe.ingredients || [],
              })
          )
        : []
}

export const searchRecipes = async ({
    q,
    category,
}: {
    q: string
    category: string
}): Promise<ReadonlyArray<Recipe>> => {
    const recipes = await httpRequests.get(
        `/recipes?q=${q}&category=${category}`
    )

    return recipes
        ? recipes.map(
              (recipe: {
                  id: string
                  name: string
                  categories: string
                  ingredients: ReadonlyArray<string>
              }) => ({
                  id: recipe.id || '',
                  name: recipe.name || '',
                  category: recipe.categories || '',
                  ingredients: recipe.ingredients || [],
              })
          )
        : []
}

export const editRecipe = ({
    name,
    ingredients,
    category,
}: Recipe): Promise<Recipe> =>
    httpRequests.put(`/recipes?name=${name}`, {
        data: JSON.stringify({ name, ingredients, category }),
    })

export const addRecipe = ({
    name,
    ingredients,
    category,
}: Recipe): Promise<Recipe> =>
    httpRequests.post('/recipes', {
        data: JSON.stringify({ name, ingredients, category }),
    })

export const removeRecipe = ({ name }: Recipe): Promise<Recipe> =>
    httpRequests.delete(`/recipes?name=${name}`)
