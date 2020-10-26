import { HTTPCommon } from '@utils/http-common'

type Meal = {
    id: string
    name: string
    day: string
    category: string
    ingredients: ReadonlyArray<string>
}

const httpRequests = new HTTPCommon({
    baseUrl: `http://localhost:3000/mealPlan`,
})

export const getMealPlan = ({ day }: { day: string }) =>
    httpRequests.get(`?day=${day}`)

export const addMealsToPlan = async ({
    meals,
}: {
    meals: ReadonlyArray<Omit<Meal, 'name' | 'category' | 'ingredients'>>
}) =>
    Promise.all(
        meals.map(({ id, day }) =>
            httpRequests.post(`?day=${day}`, {
                data: { meal_id: id },
            })
        )
    )

export const removeMealsFromPlan = async ({
    meals,
}: {
    meals: ReadonlyArray<
        Omit<Meal, 'day' | 'name' | 'category' | 'ingredients'>
    >
}) =>
    Promise.all(
        meals.map(({ id }) => {
            return httpRequests.delete(`/${id}`)
        })
    )
