import { HTTPCommon } from '@utils/http-common'

const httpRequests = new HTTPCommon({
    baseUrl: `http://localhost:3000/mealPlans`,
})

// dto ? schemas ? we might need a way to interface/convert to expected params and responses format
export const getWeekPlan = () => httpRequests.get('')

export const getDayMealPlan = ({ day }) => httpRequests.get(`/${day}`)

export const editMealInPlan = ({
    day,
    dish: { name, ingredients, category },
}) =>
    httpRequests.put(`/${day}`, {
        data: { day, dish: { name, ingredients, category } },
    })

export const addMealToPlan = ({ day, dish: { name, ingredients, category } }) =>
    httpRequests.post(`/${day}`, {
        data: { day, dish: { name, ingredients, category } },
    })

export const removeMealFromPlan = ({ day, dishName }) =>
    httpRequests.delete(`/${day}/${dishName}`)
