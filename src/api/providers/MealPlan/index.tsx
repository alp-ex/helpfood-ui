import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import {
    addMealToPlan as addMealToPlanAPI,
    removeMealsFromPlan as removeMealsFromPlanAPI,
    getMealPlan as getMealPlanAPI,
} from 'api/services/MealPlanRequests'

type Meal = {
    name: string
    day: string
    category: string
    ingredients: ReadonlyArray<string>
}
type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = {
    meals: ReadonlyArray<Meal>
}

type MealPlanProviderProps = { children: ReactNode }

const MealPlanStateContext = createContext<State | undefined>(undefined)
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

function mealPlanReducer(prevState, { type, payload }) {
    switch (type) {
        case GETTING_MEAL_PLAN_SUCCEED: {
            return {
                ...prevState,
                meals: payload,
            }
        }
        case REMOVE_MEAL_FROM_PLAN_STARTED: {
            return {
                ...prevState,
                meals: prevState.meals.filter(
                    ({ name, day }) => !payload[day].includes(name)
                ),
            }
        }
        case ADD_MEAL_TO_PLAN_STARTED: {
            return {
                ...prevState,
                meals: [...prevState.meals, payload],
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
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

export async function getMealPlan({ dispatch, day }) {
    try {
        const meals = await getMealPlanAPI({ day })

        dispatch({
            type: GETTING_MEAL_PLAN_SUCCEED,
            payload: meals,
        })
    } catch (error) {
        console.error(error)
    }
}

export async function addMealToPlan({
    dispatch,
    meal: { name, category, ingredients },
    day,
}) {
    dispatch({
        type: ADD_MEAL_TO_PLAN_STARTED,
        payload: { day, name, category, ingredients },
    })

    try {
        await addMealToPlanAPI({
            meal: { day, name, category, ingredients },
        })
    } catch (error) {
        console.error(error)
    }
}

export async function removeMealsFromPlan({ dispatch, meals, day }) {
    dispatch({
        type: REMOVE_MEAL_FROM_PLAN_STARTED,
        payload: { [day]: meals },
    })

    try {
        await removeMealsFromPlanAPI({
            meals,
            day,
        })
    } catch (error) {
        console.error(error)
    }
}
