import { HTTPCommon } from '@utils/http-common'

const httpRequests = new HTTPCommon({
    baseUrl: `http://localhost:3000/mealPlan`,
})

export const getMealPlan = ({ day }) => httpRequests.get(`?day=${day}`)

export const addMealToPlan = ({ meal: { name, category, ingredients, day } }) =>
    httpRequests.post(`?day=${day}`, {
        data: { name, category, ingredients, day },
    })

export const removeMealsFromPlan = async ({ day, meals }) => {
    const mealsResponse = await getMealPlan({ day })
    const mealsToDelete = mealsResponse.filter(({ name }) =>
        meals.includes(name)
    )

    Promise.all(
        mealsToDelete.map(({ id }) => {
            return httpRequests.delete(`/${id}`)
        })
    )
}
