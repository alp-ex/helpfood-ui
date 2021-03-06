import {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    ReactElement,
} from 'react'
import {
    addMealsToPlan as addMealsToPlanAPI,
    removeMealsFromPlan as removeMealsFromPlanAPI,
    getMealPlan as getMealPlanAPI,
} from '~/services/FoodPlanning/FoodPlanningAPI'

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

type Action = {
    type: string
    payload?: {
        meals?: ReadonlyArray<Meal>
    }
}
type Dispatch = (action: Action) => void
type State = {
    meals: ReadonlyArray<Meal>
}

type MealPlanProviderProps = { children: ReactNode }

const MealPlanStateContext = createContext<State>({ meals: [] })
const MealPlanDispatchContext = createContext<Dispatch | undefined>(undefined)

const { MEAL_PLAN_SUCCESSFULLY_UPDATED, GETTING_MEAL_PLAN_SUCCEED } = {
    GETTING_MEAL_PLAN_SUCCEED: 'getting meal plan succeed',
    MEAL_PLAN_SUCCESSFULLY_UPDATED:
        'we both remove and add meals from plan successfully',
}

function mealPlanReducer(prevState: State, { type, payload }: Action): State {
    switch (type) {
        case GETTING_MEAL_PLAN_SUCCEED: {
            return {
                ...prevState,
                meals: payload?.meals || prevState.meals,
            }
        }
        case MEAL_PLAN_SUCCESSFULLY_UPDATED: {
            return {
                ...prevState,
                meals: payload?.meals || prevState.meals,
            }
        }
        default: {
            throw new Error(
                `Unhandled action type: ${type} under MealPlan provider`
            )
        }
    }
}

export function MealPlanProvider({
    children,
}: MealPlanProviderProps): ReactElement {
    const [state, dispatch] = useReducer(mealPlanReducer, {
        meals: [],
    })

    return (
        <MealPlanStateContext.Provider value={state}>
            <MealPlanDispatchContext.Provider value={dispatch}>
                {children}
            </MealPlanDispatchContext.Provider>
        </MealPlanStateContext.Provider>
    )
}

function useMealPlanState() {
    const context = useContext(MealPlanStateContext)

    if (context === undefined) {
        throw new Error('MealPlanState must be used within a MealPlanProvider')
    }

    return context
}

function useMealPlanDispatch() {
    const context = useContext(MealPlanDispatchContext)

    if (context === undefined) {
        throw new Error(
            'MealPlanDispatch must be used within a MealPlanProvider'
        )
    }

    return context
}

export function useMealPlan(): { state: State; dispatch: Dispatch } {
    return { state: useMealPlanState(), dispatch: useMealPlanDispatch() }
}

export async function getMealPlan({
    dispatch,
    weekday,
}: {
    dispatch: Dispatch
    weekday: WeekDay
}): Promise<void> {
    try {
        const meals = await getMealPlanAPI({ weekday })

        dispatch({
            type: GETTING_MEAL_PLAN_SUCCEED,
            payload: { meals },
        })
    } catch (error) {
        console.error(error)
    }
}

export async function updateMealPlan({
    dispatch,
    mealsToDelete,
    mealsToAdd,
    weekday,
}: {
    dispatch: Dispatch
    mealsToDelete: ReadonlyArray<{ id: string }>
    mealsToAdd: ReadonlyArray<{ recipeId: string }>
    weekday: WeekDay
}): Promise<void> {
    try {
        await addMealsToPlanAPI({
            meals: mealsToAdd,
            weekday,
        })

        await removeMealsFromPlanAPI({
            meals: mealsToDelete,
        })

        const meals = await getMealPlanAPI({ weekday })

        dispatch({
            type: MEAL_PLAN_SUCCESSFULLY_UPDATED,
            payload: { meals },
        })
    } catch (error) {
        console.error(error)
    }
}
