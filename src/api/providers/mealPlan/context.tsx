import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import {
    getWeekPlan as fetchMealPlanAPI,
    addMealToPlan as addMealToPlanAPI,
    removeMealFromPlan as removeMealFromPlanAPI,
} from 'api/services/MealPlanRequests'

type Meal = {
    name: string
    ingredients: ReadonlyArray<string>
}
type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = {
    // {
    //     mealsPlan: {
    //         monday: {
    //             dessert: [
    //                 { name: 'banana bread', ingredients: ['banana', 'bread'] },
    //             ],
    //         },
    //     },
    // }
    mealsPlan: { [key: string]: { [key: string]: ReadonlyArray<Meal> } }
}

type MealPlanProviderProps = { children: ReactNode }

const MealPlanStateContext = createContext<State | undefined>(undefined)
const MealPlanDispatchContext = createContext<Dispatch | undefined>(undefined)

const {
    ADD_DISH_TO_PLAN_STARTED,
    ADD_DISH_TO_PLAN_SUCCEED,
    ADD_DISH_TO_PLAN_FAILED,
    REMOVE_DISH_TO_PLAN_STARTED,
    REMOVE_DISH_TO_PLAN_SUCCEED,
    REMOVE_DISH_TO_PLAN_FAILED,
    GETTING_MEAL_PLAN_SUCCEED,
    GETTING_MEAL_PLAN_FAILED,
} = {
    GETTING_MEAL_PLAN_SUCCEED: 'getting meal plan succeed',
    GETTING_MEAL_PLAN_FAILED: 'getting meal plan failed',
    ADD_DISH_TO_PLAN_STARTED: 'start adding dish to meal plan',
    ADD_DISH_TO_PLAN_SUCCEED: 'adding dish to meal plan succeed',
    ADD_DISH_TO_PLAN_FAILED: 'adding dish to meal plan failed',
    REMOVE_DISH_TO_PLAN_STARTED: 'start removing dish to meal plan',
    REMOVE_DISH_TO_PLAN_SUCCEED: 'removing dish to meal plan succeed',
    REMOVE_DISH_TO_PLAN_FAILED: 'removing dish to meal plan failed',
}

function mealPlanReducer(prevState, { type, payload }) {
    switch (type) {
        case GETTING_MEAL_PLAN_SUCCEED: {
            return {
                ...prevState,
                mealsPlan: payload,
            }
        }
        case REMOVE_DISH_TO_PLAN_STARTED: {
            return {
                ...prevState,
                mealsPlan: {
                    ...prevState.mealsPlan,
                    [payload.day]: [
                        ...prevState.mealsPlan[payload.day],
                        {
                            ...prevState.mealsPlan[payload.day].find(
                                (dish) => dish.id === payload.id
                            ),
                            status: 'pending',
                        },
                    ],
                },
            }
        }
        case REMOVE_DISH_TO_PLAN_SUCCEED: {
            return {
                ...prevState,
                mealsPlan: {
                    ...prevState.mealsPlan,
                    [payload.day]: [
                        ...prevState.mealsPlan[payload.day],
                        {
                            ...prevState.mealsPlan[payload.day].find(
                                (dish) => dish.id === payload.id
                            ),
                            status: 'deleted',
                        },
                    ],
                },
            }
        }
        case REMOVE_DISH_TO_PLAN_FAILED: {
            return {
                ...prevState,
                mealsPlan: {
                    ...prevState.mealsPlan,
                    [payload.day]: [
                        ...prevState.mealsPlan[payload.day],
                        {
                            ...prevState.mealsPlan[payload.day].find(
                                (dish) => dish.id === payload.id
                            ),
                            status: 'error',
                        },
                    ],
                },
            }
        }
        case ADD_DISH_TO_PLAN_STARTED: {
            return {
                ...prevState,
                mealsPlan: {
                    ...prevState.mealsPlan,
                    [payload.day]: [
                        ...prevState.mealsPlan[payload.day],
                        {
                            id: payload.id,
                            name: payload.name,
                            ingredients: payload.ingredients,
                            category: payload.category,
                            status: 'pending',
                        },
                    ],
                },
            }
        }
        case ADD_DISH_TO_PLAN_SUCCEED: {
            return {
                ...prevState,
                mealsPlan: {
                    ...prevState.mealsPlan,
                    [payload.day]: [
                        ...prevState.mealsPlan[payload.day],
                        {
                            ...prevState.mealsPlan[payload.day].find(
                                (dish) => dish.id === payload.id
                            ),
                            status: 'error',
                        },
                    ],
                },
            }
        }
        case ADD_DISH_TO_PLAN_FAILED: {
            return {
                ...prevState,
                mealsPlan: {
                    ...prevState.mealsPlan,
                    [payload.day]: [
                        ...prevState.mealsPlan[payload.day],
                        {
                            ...prevState.mealsPlan[payload.day].find(
                                (dish) => dish.id === payload.id
                            ),
                            status: 'error',
                        },
                    ],
                },
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

export function MealPlanProvider({ children }: MealPlanProviderProps) {
    const [state, dispatch] = useReducer(mealPlanReducer, {
        mealsPlan: null,
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

export async function fetchMealPlan({ dispatch }) {
    try {
        const mealsPlan = await fetchMealPlanAPI()

        dispatch({
            type: GETTING_MEAL_PLAN_SUCCEED,
            payload: mealsPlan,
        })
    } catch (error) {
        dispatch({
            type: GETTING_MEAL_PLAN_FAILED,
            payload: {
                error,
            },
        })
    }
}

export async function addDishToPlan({
    dispatch,
    dish: { day, name, ingredients, category },
}) {
    dispatch({
        type: ADD_DISH_TO_PLAN_STARTED,
        payload: { day, name, ingredients, category },
    })

    try {
        await addMealToPlanAPI({
            day,
            dish: {
                name,
                ingredients,
                category,
            },
        })

        dispatch({
            type: ADD_DISH_TO_PLAN_SUCCEED,
            payload: {
                name,
                day,
            },
        })
    } catch (error) {
        dispatch({
            type: ADD_DISH_TO_PLAN_FAILED,
            payload: {
                error,
                name,
                day,
            },
        })
    }
}

export async function removeDishFromPlan({ dispatch, name, day }) {
    dispatch({
        type: REMOVE_DISH_TO_PLAN_STARTED,
        payload: { name, day },
    })

    try {
        await removeMealFromPlanAPI({
            dishName: name,
            day,
        })

        dispatch({
            type: REMOVE_DISH_TO_PLAN_SUCCEED,
            payload: {
                name,
                day,
            },
        })
    } catch (error) {
        dispatch({
            type: REMOVE_DISH_TO_PLAN_FAILED,
            payload: {
                error,
                name,
                day,
            },
        })
    }
}
