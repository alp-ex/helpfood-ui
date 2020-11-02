import { HTTPCommon } from 'utils/http-common'

type WeekDay = number
interface Meal {
    id: string
    weekday: WeekDay
    recipe: {
        id: string
        name: string
        category: string
        ingredients: ReadonlyArray<string>
    }
}

interface MealResponse {
    id: string
    weekday: number
    recipes: {
        id: string
        name: string
        categories: string
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
    const meals = await httpRequests.get<
        ReadonlyArray<MealResponse> | undefined
    >(`/${weekday}`)

    // take a look at this https://github.com/pelotom/runtypes
    return (
        meals?.map((meal: MealResponse) => ({
            id: meal.id || '',
            weekday: meal.weekday || 0,
            recipe: {
                id: meal.recipes.id || '',
                name: meal.recipes.name || '',
                category: meal.recipes.categories || '',
                ingredients: meal.recipes.ingredients || [],
            },
        })) || []
    )
}

export const addMealsToPlan = async ({
    meals: mealsToAdd,
    weekday,
}: {
    meals: ReadonlyArray<{ recipeId: string }>
    weekday: WeekDay
}): Promise<ReadonlyArray<Meal>> => {
    const meals = await Promise.all(
        mealsToAdd.map(
            async ({ recipeId }) =>
                await httpRequests.post<MealResponse | undefined>('', {
                    data: JSON.stringify({ recipeId: recipeId, weekday }),
                })
        )
    )

    return (
        meals?.map((meal: MealResponse | undefined) => ({
            id: meal?.id || '',
            weekday: meal?.weekday || 0,
            recipe: {
                id: meal?.recipes.id || '',
                name: meal?.recipes.name || '',
                category: meal?.recipes.categories || '',
                ingredients: meal?.recipes.ingredients || [],
            },
        })) || []
    )
}

export const removeMealsFromPlan = async ({
    meals: mealsToRemove,
}: {
    meals: ReadonlyArray<{ id: string }>
}): Promise<ReadonlyArray<Meal>> => {
    const meals = await Promise.all(
        mealsToRemove.map(async ({ id }) => {
            return await httpRequests.delete<MealResponse | undefined>(`/${id}`)
        })
    )

    return (
        meals?.map((meal: MealResponse | undefined) => ({
            id: meal?.id || '',
            weekday: meal?.weekday || 0,
            recipe: {
                id: meal?.recipes.id || '',
                name: meal?.recipes.name || '',
                category: meal?.recipes.categories || '',
                ingredients: meal?.recipes.ingredients || [],
            },
        })) || []
    )
}
