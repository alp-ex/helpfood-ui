import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import {
    addDishToPlan as addDishToPlanAPI,
    removeDishToPlan as removeDishToPlanAPI,
} from 'api/dishPlan/requests'
import dishPlanFixtures from 'api/fixtures/dishPlan.json'

type Category = {
    id: string
    name: string
}
type Ingredient = {
    id: string
    name: string
}
type DishesDayPlan = {
    category: Category
    dishes: ReadonlyArray<{ id: string; name: string; ingredients: Ingredient }>
}
type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = {
    dishesWeekPlan: {
        monday: DishesDayPlan
        tuesday: DishesDayPlan
        wednesday: DishesDayPlan
        thursday: DishesDayPlan
        friday: DishesDayPlan
        saturday: DishesDayPlan
        sunday: DishesDayPlan
    }
}
type DishPlanProviderProps = { children: ReactNode }

const DishPlanStateContext = createContext<State | undefined>(undefined)
const DishPlanDispatchContext = createContext<Dispatch | undefined>(undefined)

const {
    ADD_DISH_TO_PLAN_START,
    ADD_DISH_TO_PLAN_SUCCEED,
    ADD_DISH_TO_PLAN_FAILED,
    REMOVE_DISH_TO_PLAN_START,
    REMOVE_DISH_TO_PLAN_SUCCEED,
    REMOVE_DISH_TO_PLAN_FAILED,
} = {
    ADD_DISH_TO_PLAN_START: 'start adding dish to week plan',
    ADD_DISH_TO_PLAN_SUCCEED: 'adding dish to week plan succeed',
    ADD_DISH_TO_PLAN_FAILED: 'adding dish to week plan failed',
    REMOVE_DISH_TO_PLAN_START: 'start removing dish to week plan',
    REMOVE_DISH_TO_PLAN_SUCCEED: 'removing dish to week plan succeed',
    REMOVE_DISH_TO_PLAN_FAILED: 'removing dish to week plan failed',
}

// this looks a bit heavy
function DishPlanReducer(prevState, { type, payload }) {
    switch (type) {
        case REMOVE_DISH_TO_PLAN_START: {
            return {
                ...prevState,
                dishesWeekPlan: {
                    ...prevState.dishesWeekPlan,
                    [payload.day]: [
                        ...prevState.dishesWeekPlan[payload.day],
                        prevState.dishesWeekPlan[payload.day].map(
                            (plannedDish) => {
                                if (plannedDish.id === payload.id) {
                                    plannedDish.status = 'pending'
                                }

                                return plannedDish
                            }
                        ),
                    ],
                },
            }
        }
        case REMOVE_DISH_TO_PLAN_SUCCEED: {
            return {
                ...prevState,
                dishesWeekPlan: {
                    ...prevState.dishesWeekPlan,
                    [payload.day]: [
                        ...prevState.dishesWeekPlan[payload.day],
                        prevState.dishesWeekPlan[payload.day].map(
                            (plannedDish) => {
                                if (plannedDish.id === payload.id) {
                                    plannedDish.status = 'deleted'
                                }

                                return plannedDish
                            }
                        ),
                    ],
                },
            }
        }
        case REMOVE_DISH_TO_PLAN_FAILED: {
            return {
                ...prevState,
                dishesWeekPlan: {
                    ...prevState.dishesWeekPlan,
                    [payload.day]: [
                        ...prevState.dishesWeekPlan[payload.day],
                        prevState.dishesWeekPlan[payload.day].map(
                            (plannedDish) => {
                                if (plannedDish.id === payload.id) {
                                    plannedDish.status = 'error'
                                }

                                return plannedDish
                            }
                        ),
                    ],
                },
            }
        }
        case ADD_DISH_TO_PLAN_START: {
            return {
                ...prevState,
                dishesWeekPlan: {
                    ...prevState.dishesWeekPlan,
                    [payload.day]: [
                        ...prevState.dishesWeekPlan[payload.day],
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
                dishesWeekPlan: {
                    ...prevState.dishesWeekPlan,
                    [payload.day]: [
                        ...prevState.dishesWeekPlan[payload.day],
                        prevState.dishesWeekPlan[payload.day].map(
                            (plannedDish) => {
                                if (plannedDish.id === payload.id) {
                                    plannedDish.status = 'success'
                                }

                                return plannedDish
                            }
                        ),
                    ],
                },
            }
        }
        case ADD_DISH_TO_PLAN_FAILED: {
            return {
                ...prevState,
                dishesWeekPlan: {
                    ...prevState.dishesWeekPlan,
                    [payload.day]: [
                        ...prevState.dishesWeekPlan[payload.day],
                        prevState.dishesWeekPlan[payload.day].map(
                            (plannedDish) => {
                                if (plannedDish.id === payload.id) {
                                    plannedDish.status = 'error'
                                }

                                return plannedDish
                            }
                        ),
                    ],
                },
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

export function DishPlanProvider({ children }: DishPlanProviderProps) {
    const [state, dispatch] = useReducer(DishPlanReducer, {
        dishesWeekPlan: dishPlanFixtures,
    })

    return (
        <DishPlanStateContext.Provider value={state}>
            <DishPlanDispatchContext.Provider value={dispatch}>
                {children}
            </DishPlanDispatchContext.Provider>
        </DishPlanStateContext.Provider>
    )
}

export function useDishPlanState() {
    const context = useContext(DishPlanStateContext)

    if (context === undefined) {
        throw new Error('DishPlanState must be used within a DishPlanProvider')
    }

    return context
}

export function useDishPlanDispatch() {
    const context = useContext(DishPlanDispatchContext)

    if (context === undefined) {
        throw new Error(
            'DishPlanDispatch must be used within a DishPlanProvider'
        )
    }

    return context
}

export async function addDishToPlan({
    dispatch,
    dish: { id, day, name, ingredients, category },
}) {
    dispatch({
        type: ADD_DISH_TO_PLAN_START,
        payload: { id, name, ingredients, day, category },
    })

    try {
        const response = await addDishToPlanAPI({
            id,
            day,
        })
        const {
            data: { id: dishResultId, day: dishResultDay },
        } = await response.json()

        dispatch({
            type: ADD_DISH_TO_PLAN_SUCCEED,
            payload: {
                id: dishResultId,
                day: dishResultDay,
            },
        })
    } catch (error) {
        dispatch({
            type: ADD_DISH_TO_PLAN_FAILED,
            payload: {
                error,
                id,
                day,
            },
        })
    }
}

export async function removeDishFromPlan({ dispatch, dish: { id, day } }) {
    dispatch({
        type: REMOVE_DISH_TO_PLAN_START,
        payload: { id, day },
    })

    try {
        const response = await removeDishToPlanAPI({
            id,
            day,
        })
        const {
            data: { id: dishResultId, day: dishResultDay },
        } = await response.json()

        dispatch({
            type: REMOVE_DISH_TO_PLAN_SUCCEED,
            payload: {
                id: dishResultId,
                day: dishResultDay,
            },
        })
    } catch (error) {
        dispatch({
            type: REMOVE_DISH_TO_PLAN_FAILED,
            payload: {
                error,
                id,
                day,
            },
        })
    }
}
