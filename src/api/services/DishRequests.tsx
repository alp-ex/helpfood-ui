import { HTTPCommon } from '@utils/http-common'

const httpRequests = new HTTPCommon({
    baseUrl: `http://localhost:3000`,
})

export const getAllDishes = () => httpRequests.get(`/dishes`)

export const getDish = ({ name }) => httpRequests.get(`/dishes/${name}`)

export const editDish = ({ name, ingredients, category }) =>
    httpRequests.put(`/dishes/${name}`, {
        data: { name, ingredients, category },
    })

export const addDish = ({ name, ingredients, category }) =>
    httpRequests.post(`/dishes/${name}`, {
        data: { name, ingredients, category },
    })

export const removeDish = ({ name }) => httpRequests.delete(`/dishes/${name}`)
