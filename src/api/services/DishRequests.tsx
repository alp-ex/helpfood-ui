import { HTTPCommon } from 'utils/http-common'

type Recipe = {
    id: string
    name: string
    category: string
    ingredients: ReadonlyArray<string>
}

type RecipeResponse = {
    id: string
    name: string
    categories: string
    ingredients: ReadonlyArray<string>
}

const httpRequests = new HTTPCommon({
    baseUrl: 'http://localhost:3000',
})

export const getCategories = (): Promise<
    ReadonlyArray<{ id: number; name: string }>
> => httpRequests.get('/categories')

export const searchRecipes = async ({
    q,
    category,
}: {
    q: string
    category: string
}): Promise<ReadonlyArray<Recipe>> => {
    const recipes = await httpRequests.get<ReadonlyArray<RecipeResponse>>(
        `/recipes?q=${q}&categories=${category}&_limit=100`
    )

    return recipes
        ? recipes.map((recipe: RecipeResponse) => ({
              id: recipe.id || '',
              name: recipe.name || '',
              category: recipe.categories || '',
              ingredients: recipe.ingredients || [],
          }))
        : []
}

export const editRecipe = async ({
    name,
    ingredients,
    category,
}: Recipe): Promise<Recipe> => {
    const recipe = await httpRequests.put<RecipeResponse>(
        `/recipes?name=${name}`,
        {
            data: JSON.stringify({ name, ingredients, category }),
        }
    )

    return {
        id: recipe.id || '',
        name: recipe.name || '',
        category: recipe.categories || '',
        ingredients: recipe.ingredients || [],
    }
}

export const addRecipe = async ({
    name,
    ingredients,
    category,
}: Recipe): Promise<Recipe> => {
    const recipe = await httpRequests.post<RecipeResponse>('/recipes', {
        data: JSON.stringify({ name, ingredients, category }),
    })

    return {
        id: recipe.id || '',
        name: recipe.name || '',
        category: recipe.categories || '',
        ingredients: recipe.ingredients || [],
    }
}

export const removeRecipe = async ({ name }: Recipe): Promise<Recipe> => {
    const recipe = await httpRequests.delete<RecipeResponse>(
        `/recipes?name=${name}`
    )

    return {
        id: recipe.id || '',
        name: recipe.name || '',
        category: recipe.categories || '',
        ingredients: recipe.ingredients || [],
    }
}
