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
    day,
}: {
    meals: ReadonlyArray<Omit<Meal, 'id'>>
    day: string
}) =>
    Promise.all(
        meals.map(({ name, category, ingredients }) =>
            httpRequests.post(`?day=${day}`, {
                data: { name, category, ingredients },
            })
        )
    )

export const removeMealsFromPlan = async ({
    mealsIds,
}: {
    mealsIds: ReadonlyArray<string>
}) =>
    Promise.all(
        mealsIds.map((id) => {
            return httpRequests.delete(`/${id}`)
        })
    )
