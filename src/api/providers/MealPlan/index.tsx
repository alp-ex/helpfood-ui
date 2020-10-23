import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import {
    addMealsToPlan as addMealsToPlanAPI,
    removeMealsFromPlan as removeMealsFromPlanAPI,
    getMealPlan as getMealPlanAPI,
} from 'api/services/MealPlanRequests'

type Meal = {
    id: string
    name: string
    day: string
    category: string
    ingredients: ReadonlyArray<string>
}
type Action = {
    type: string
    payload?: {
        mealsIds?: ReadonlyArray<string>
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

const {
    ADD_MEAL_TO_PLAN_STARTED,
    REMOVE_MEAL_FROM_PLAN_STARTED,
    GETTING_MEAL_PLAN_SUCCEED,
} = {
    GETTING_MEAL_PLAN_SUCCEED: 'getting meal plan succeed',
    ADD_MEAL_TO_PLAN_STARTED: 'start adding dish to meal plan',
    REMOVE_MEAL_FROM_PLAN_STARTED: 'start removing dish to meal plan',
}

function mealPlanReducer(prevState: State, { type, payload }: Action): State {
    switch (type) {
        case GETTING_MEAL_PLAN_SUCCEED: {
            return {
                ...prevState,
                meals: payload?.meals || prevState.meals,
            }
        }
        case REMOVE_MEAL_FROM_PLAN_STARTED: {
            return {
                ...prevState,
                meals: prevState.meals.filter(({ id }) =>
                    payload?.mealsIds?.includes(id)
                ),
            }
        }
        case ADD_MEAL_TO_PLAN_STARTED: {
            return {
                ...prevState,
                meals: [...prevState.meals, ...(payload?.meals || [])],
            }
        }
        default: {
            throw new Error(
                `Unhandled action type: ${type} under MealPlan provider`
            )
        }
    }
}

export function MealPlanProvider({ children }: MealPlanProviderProps) {
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

export function useMealPlan() {
    return { state: useMealPlanState(), dispatch: useMealPlanDispatch() }
}

export async function getMealPlan({
    dispatch,
    day,
}: {
    dispatch: Dispatch
    day: string
}) {
    try {
        const meals = await getMealPlanAPI({ day })

        dispatch({
            type: GETTING_MEAL_PLAN_SUCCEED,
            payload: { meals },
        })
    } catch (error) {
        console.error(error)
    }
}

export async function addMealsToPlan({
    dispatch,
    meals,
    day,
}: {
    dispatch: Dispatch
    meals: ReadonlyArray<Omit<Meal, 'id'>>
    day: string
}) {
    try {
        const mealsResponse = await addMealsToPlanAPI({
            meals,
            day,
        })

        dispatch({
            type: ADD_MEAL_TO_PLAN_STARTED,
            payload: { meals: mealsResponse },
        })
    } catch (error) {
        console.error(error)
    }
}

export async function removeMealsFromPlan({
    dispatch,
    mealsIds,
}: {
    dispatch: Dispatch
    mealsIds: ReadonlyArray<string>
}) {
    dispatch({
        type: REMOVE_MEAL_FROM_PLAN_STARTED,
        payload: { mealsIds },
    })

    try {
        await removeMealsFromPlanAPI({
            mealsIds,
        })
    } catch (error) {
        console.error(error)
    }
}
