import { HTTPCommon } from '@utils/http-common'

const httpRequests = new HTTPCommon({
    baseUrl: `http://localhost:3000`,
})

export const getWeekPlan = () => httpRequests.get(`/meal-plan`)

export const getDayMealPlan = ({ day }) => httpRequests.get(`/meal-plan/${day}`)

export const editMealInPlan = ({
    day,
    dish: { name, ingredients, category },
}) =>
    httpRequests.put(`/meal-plan/${day}`, {
        data: { day, dish: { name, ingredients, category } },
    })

export const addMealToPlan = ({ day, dish: { name, ingredients, category } }) =>
    httpRequests.post(`/meal-plan/${day}`, {
        data: { day, dish: { name, ingredients, category } },
    })

export const removeMealFromPlan = ({ day, dishName }) =>
    httpRequests.delete(`/meal-plan/${day}/${dishName}`)
