import { HTTPCommon } from '@utils/http-common'

type WeekDay = number
type Meal = {
    id: string
    weekday: WeekDay
    recipe: {
        id: string
        name: string
        category: string
        ingredients: ReadonlyArray<string>
    }
}

const httpRequests = new HTTPCommon({
    baseUrl: 'http://localhost:3000/meal-plan',
})

export const getMealPlan = async ({
    weekday,
}: {
    weekday: WeekDay
}): Promise<ReadonlyArray<Meal>> => {
    const meals = await httpRequests.get(`/${weekday}`)

    return meals
        ? meals.map(
              (meal: {
                  id: string
                  weekday: number
                  recipes: {
                      id: string
                      name: string
                      categories: string
                      ingredients: ReadonlyArray<string>
                  }
              }) =>
                  meal
                      ? {
                            id: meal.id || '',
                            weekday: meal.weekday || 0,
                            recipe: meal.recipes
                                ? {
                                      id: meal.recipes.id || '',
                                      name: meal.recipes.name || '',
                                      category: meal.recipes.categories || '',
                                      ingredients:
                                          meal.recipes.ingredients || [],
                                  }
                                : {},
                        }
                      : {}
          )
        : []
}

export const addMealsToPlan = async ({
    meals: mealsToAdd,
    weekday,
}: {
    meals: ReadonlyArray<{ recipeId: string }>
    weekday: WeekDay
}): Promise<ReadonlyArray<Meal>> => {
    await Promise.all(
        mealsToAdd.map(({ recipeId }) =>
            httpRequests.post('', {
                data: JSON.stringify({ recipeId: recipeId, weekday }),
            })
        )
    )

    return await getMealPlan({ weekday })
}

export const removeMealsFromPlan = async ({
    meals: mealsToRemove,
}: {
    meals: ReadonlyArray<{ id: string }>
}): Promise<ReadonlyArray<Meal>> =>
    Promise.all(
        mealsToRemove.map(({ id }) => {
            return httpRequests.delete(`/${id}`)
        })
    )
