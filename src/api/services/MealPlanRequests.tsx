import { HTTPCommon } from '@utils/http-common'

type WeekDay = number
type Meal = {
    id: string
    weekday: WeekDay
    recipes: {
        id: string
        name: string
        category: string
        ingredients: ReadonlyArray<string>
    }
}

const httpRequests = new HTTPCommon({
    baseUrl: `http://localhost:3000/mealPlan`,
})

export const getMealPlan = async ({ weekday }: { weekday: WeekDay }) => {
    const meals = await httpRequests.get(`?_expand=recipes&weekday=${weekday}`)

    return meals.map((meal: Meal) => ({
        id: meal.id,
        weekday: meal.weekday,
        recipe: {
            id: meal.recipes.id,
            name: meal.recipes.name,
            category: meal.recipes.category,
            ingredients: meal.recipes.ingredients,
        },
    }))
}

export const addMealsToPlan = async ({
    meals: mealsToAdd,
    weekday,
}: {
    meals: ReadonlyArray<{ recipeId: string }>
    weekday: WeekDay
}) => {
    await Promise.all(
        mealsToAdd.map(({ recipeId }) =>
            httpRequests.post('?_expand=recipes', {
                data: { recipesId: recipeId, weekday },
            })
        )
    )

    return await getMealPlan({ weekday })
}

export const removeMealsFromPlan = async ({
    meals: mealsToRemove,
}: {
    meals: ReadonlyArray<{ id: string }>
}) =>
    Promise.all(
        mealsToRemove.map(({ id }) => {
            return httpRequests.delete(`/${id}`)
        })
    )
