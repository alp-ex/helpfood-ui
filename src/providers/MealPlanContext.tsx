import React, { createContext, useReducer, useContext, ReactNode } from 'react'
// import mealPlanClient from '@client/mealPlanClient'
import mealPlanFixtures from './fixtures/mealPlan.json'

type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = { meals: {} }
type MealPlanProviderProps = { children: ReactNode }

const MealPlanStateContext = createContext<State | undefined>(undefined)
const MealPlanDispatchContext = createContext<Dispatch | undefined>(undefined)

const {
    UPDATE_MEAL_PLAN_STARTED,
    UPDATE_MEAL_PLAN_SUCCEED,
    UPDATE_MEAL_PLAN_FAILED,
} = {
    UPDATE_MEAL_PLAN_STARTED:
        'we start updating meals of specified day and category',
    UPDATE_MEAL_PLAN_SUCCEED:
        'update of meals of specified day and category succeed',
    UPDATE_MEAL_PLAN_FAILED:
        'update of meals of specified day and category failed',
}

function mealPlanReducer(prevState, { type, payload }) {
    switch (type) {
        case UPDATE_MEAL_PLAN_STARTED: {
            return {
                ...prevState,
                meals: payload,
                isFetching: true,
            }
        }
        case UPDATE_MEAL_PLAN_SUCCEED: {
            return {
                ...prevState,
                meals: payload,
                isFetching: false,
            }
        }
        case UPDATE_MEAL_PLAN_FAILED: {
            return {
                ...prevState,
                meals: payload,
                isFetching: false,
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

function MealPlanProvider({ children }: MealPlanProviderProps) {
    const [state, dispatch] = useReducer(mealPlanReducer, {
        meals: mealPlanFixtures,
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
        throw new Error(
            'useMealPlanState must be used within a MealPlanProvider'
        )
    }

    return context
}

function useMealPlanDispatch() {
    const context = useContext(MealPlanDispatchContext)

    if (context === undefined) {
        throw new Error(
            'useMealPlanDispatch must be used within a MealPlanProvider'
        )
    }

    return context
}

async function updateMeals({ dispatch, meal }) {
    dispatch({ type: UPDATE_MEAL_PLAN_STARTED, payload: { meal } })

    try {
        // const updatedMeals = await mealClient.updateMeal({ meals })
        dispatch({ type: UPDATE_MEAL_PLAN_SUCCEED, payload: { meal } })
    } catch (error) {
        dispatch({
            type: UPDATE_MEAL_PLAN_FAILED,
            // payload: { meals: prevMeals, error },
        })
    }
}

export { MealPlanProvider, useMealPlanState, useMealPlanDispatch, updateMeals }
