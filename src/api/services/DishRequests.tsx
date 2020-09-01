import { HTTPCommon } from '@utils/http-common'

const httpRequests = new HTTPCommon({
    baseUrl: `http://localhost:3000`,
})

export const getCategories = () => httpRequests.get(`/categories`)

export const getRecipes = () => httpRequests.get(`/recipes`)

export const getRecipe = ({ name }) => httpRequests.get(`/recipes?name=${name}`)

export const searchRecipes = ({ q }) => httpRequests.get(`/recipes?q=${q}`)

export const searchCategories = ({ q }) =>
    httpRequests.get(`/categories?q=${q}`)

export const searchIngredients = ({ q }) =>
    httpRequests.get(`/ingredients?q=${q}`)

export const editRecipe = ({ name, ingredients, category }) =>
    httpRequests.put(`/recipes?name=${name}`, {
        data: { name, ingredients, category },
    })

export const addRecipe = ({ name, ingredients, category }) =>
    httpRequests.post(`/recipes`, {
        data: { name, ingredients, category },
    })

export const removeRecipe = ({ name }) =>
    httpRequests.delete(`/recipes?name=${name}`)
