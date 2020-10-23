import { HTTPCommon } from '@utils/http-common'

type Recipe = {
    id: string
    name: string
    category: string
    ingredients: ReadonlyArray<string>
}

const httpRequests = new HTTPCommon({
    baseUrl: `http://localhost:3000`,
})

export const getCategories = () => httpRequests.get(`/categories`)

export const getRecipes = () => httpRequests.get(`/recipes`)

export const getRecipe = ({ name }: Recipe) =>
    httpRequests.get(`/recipes?name=${name}`)

export const searchRecipes = ({
    q,
    category,
}: {
    q: string
    category: string
}) => httpRequests.get(`/recipes?q=${q}&category=${category}`)

export const searchCategories = ({ q }: { q: string }) =>
    httpRequests.get(`/categories?q=${q}`)

export const searchIngredients = ({ q }: { q: string }) =>
    httpRequests.get(`/ingredients?q=${q}`)

export const editRecipe = ({ name, ingredients, category }: Recipe) =>
    httpRequests.put(`/recipes?name=${name}`, {
        data: { name, ingredients, category },
    })

export const addRecipe = ({ name, ingredients, category }: Recipe) =>
    httpRequests.post(`/recipes`, {
        data: { name, ingredients, category },
    })

export const removeRecipe = ({ name }: Recipe) =>
    httpRequests.delete(`/recipes?name=${name}`)
