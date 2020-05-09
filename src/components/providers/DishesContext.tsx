import React, { createContext, useReducer, useContext } from 'react'
import mealClient from '@client/mealClient'

const MealStateContext = createContext()
const MealDispatchContext = createContext()

const { UPDATE_MEALS_STARTED, , UPDATE_MEALS_SUCCEED, UPDATE_MEALS_FAILED } = {
    UPDATE_MEALS_STARTED: 'we start updating meals',
    UPDATE_MEALS_SUCCEED:
        'update of meals succeed',
    UPDATE_MEALS_FAILED: 'update of meals failed',
}

// meals: [{
//     category: dessert,
//     dishes: [{name: tarte à la courge,
//     ingredients: [{label: tarte, value: qsd3444kj4455lk4}]}]
// }]

function mealReducer(prevState, { type, payload }) {
    switch (type) {
        case UPDATE_MEALS_STARTED: {
            return {
                ...prevState,
                meals: payload,
                isFetching: true
            }
        }
        case UPDATE_MEALS_SUCCEED: {
            return {
                ...prevState,
                meals: payload,
                isFetching: false
            }
        }
        case UPDATE_MEALS_FAILED: {
            return {
                ...prevState,
                meals: payload,
                isFetching: false
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

function MealProvider({ children }) {
    const [state, dispatch] = useReducer(mealReducer, {
        meals: [],
    })

    return (
        <MealStateContext.Provider value={state}>
            <MealDispatchContext.Provider value={dispatch}>
                {children}
            </MealDispatchContext.Provider>
        </MealStateContext.Provider>
    )
}

function useMealState() {
    const context = useContext(MealStateContext)

    if (context === undefined) {
        throw new Error(
            'useMealState must be used within a MealProvider'
        )
    }

    return context
}

function useMealDispatch() {
    const context = useContext(MealDispatchContext)

    if (context === undefined) {
        throw new Error(
            'useMealDispatch must be used within a MealProvider'
        )
    }

    return context
}

async function updateMeals(dispatch, meals, prevStateOfMeals) {
    dispatch({ type: UPDATE_MEALS_STARTED, payload: { meals } })

    try {
        const updatedMeals = await mealClient.updateMeal({ meals })
        dispatch({ type: UPDATE_MEALS_SUCCEED, payload: { meals: updatedMeals } })
    } catch (error) {
        dispatch({
            type: UPDATE_MEALS_FAILED,
            payload: { meals: prevStateOfMeals, error },
        })
    }
}

export { MealProvider, useMealState, useMealDispatch }
