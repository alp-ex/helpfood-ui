import React, { createContext, useReducer, useContext, ReactNode } from 'react'

import dishesFixtures from 'api/fixtures/dishes.json'
import categoriesFixtures from 'api/fixtures/categories.json'
import ingredientsFixtures from 'api/fixtures/ingredients.json'
import {
    searchDishesAPI,
    searchCategoriesAPI,
    searchIngredientsAPI,
    addDishAPI,
    editDishAPI,
} from './actions'
import { Dish, Category, Ingredient } from './types'

type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = {
    matchedDishes: ReadonlyArray<Dish>
    dishes: ReadonlyArray<Dish>
    categories: ReadonlyArray<Category>
    ingredients: ReadonlyArray<Ingredient>
}
type DishesProviderProps = { children: ReactNode }

const DishesStateContext = createContext<State | undefined>(undefined)
const DishesDispatchContext = createContext<Dispatch | undefined>(undefined)

const {
    ADD_DISH_START,
    EDIT_DISH_START,
    ADD_DISH_SUCCEED,
    EDIT_DISH_SUCCEED,
    ADD_DISH_FAILED,
    EDIT_DISH_FAILED,
    SEARCH_DISHES_START,
    SEARCH_DISHES_SUCCEED,
    SEARCH_DISHES_FAILED,
    SEARCH_CATEGORIES_START,
    SEARCH_CATEGORIES_SUCCEED,
    SEARCH_CATEGORIES_FAILED,
    SEARCH_INGREDIENTS_START,
    SEARCH_INGREDIENTS_SUCCEED,
    SEARCH_INGREDIENTS_FAILED,
} = {
    ADD_DISH_START: 'start adding a dish to existing dishes',
    EDIT_DISH_START: 'start editing an existing dish',
    ADD_DISH_SUCCEED: 'adding a dish to existing dishes succeed',
    EDIT_DISH_SUCCEED: 'editing an existing dish succeed',
    ADD_DISH_FAILED: 'adding a dish to existing dishes failed',
    EDIT_DISH_FAILED: 'editing an existing dish failed',
    SEARCH_DISHES_START: 'start searching dishes',
    SEARCH_DISHES_SUCCEED: 'searching dishes succeed',
    SEARCH_DISHES_FAILED: 'searching dishes failed',
    SEARCH_CATEGORIES_START: 'start searching categories',
    SEARCH_CATEGORIES_SUCCEED: 'searching categories succeed',
    SEARCH_CATEGORIES_FAILED: 'searching categories failed',
    SEARCH_INGREDIENTS_START: 'start searching ingredients',
    SEARCH_INGREDIENTS_SUCCEED: 'searching ingredients succeed',
    SEARCH_INGREDIENTS_FAILED: 'searching ingredients failed',
}

function dishesReducer(prevState, { type, payload }) {
    switch (type) {
        case SEARCH_INGREDIENTS_START: {
            return {
                ...prevState,
                categories: [
                    ...prevState.categories,
                    {
                        ...prevState.categories.map(
                            (dish) => dish.id === payload.id
                        ),
                        status: 'pending',
                        name: payload.name,
                    },
                ],
            }
        }
        case SEARCH_INGREDIENTS_SUCCEED: {
            return {
                ...prevState,
                categories: [
                    ...prevState.categories,
                    {
                        ...prevState.categories.map(
                            (dish) => dish.id === payload.id
                        ),
                        name: payload.name,
                        status: 'added',
                    },
                ],
            }
        }
        case SEARCH_INGREDIENTS_FAILED: {
            return {
                ...prevState,
                categories: [
                    ...prevState.categories,
                    {
                        ...prevState.categories.map(
                            (dish) => dish.id === payload.id
                        ),
                        status: 'error',
                    },
                ],
            }
        }
        case SEARCH_CATEGORIES_START: {
            return {
                ...prevState,
                categories: [
                    ...prevState.categories,
                    {
                        ...prevState.categories.map(
                            (dish) => dish.id === payload.id
                        ),
                        status: 'pending',
                        name: payload.name,
                    },
                ],
            }
        }
        case SEARCH_CATEGORIES_SUCCEED: {
            return {
                ...prevState,
                categories: [
                    ...prevState.categories,
                    {
                        ...prevState.categories.map(
                            (dish) => dish.id === payload.id
                        ),
                        name: payload.name,
                        status: 'added',
                    },
                ],
            }
        }
        case SEARCH_CATEGORIES_FAILED: {
            return {
                ...prevState,
                categories: [
                    ...prevState.categories,
                    {
                        ...prevState.categories.map(
                            (dish) => dish.id === payload.id
                        ),
                        status: 'error',
                    },
                ],
            }
        }
        case SEARCH_DISHES_START: {
            return {
                ...prevState,
                dishes: [
                    ...prevState.dishes,
                    {
                        ...prevState.dishes.map(
                            (dish) => dish.id === payload.id
                        ),
                        status: 'pending',
                        name: payload.name,
                        category: payload.category,
                        ingredients: payload.ingredients,
                    },
                ],
            }
        }
        case SEARCH_DISHES_SUCCEED: {
            const { dishes, matchedDishes } = payload

            return {
                ...prevState,
                matchedDishes,
                dishes: [
                    ...prevState.dishes,
                    {
                        ...prevState.dishes.map(
                            (dish) => dish.id === dishes.id
                        ),
                        name: dishes.name,
                        category: dishes.category,
                        ingredients: dishes.ingredients,
                        status: 'added',
                    },
                ],
            }
        }
        case SEARCH_DISHES_FAILED: {
            return {
                ...prevState,
                dishes: [
                    ...prevState.dishes,
                    {
                        ...prevState.dishes.map(
                            (dish) => dish.id === payload.id
                        ),
                        status: 'error',
                    },
                ],
            }
        }
        case EDIT_DISH_START: {
            return {
                ...prevState,
                dishes: [
                    ...prevState.dishes,
                    {
                        ...prevState.dishes.map(
                            (dish) => dish.id === payload.id
                        ),
                        status: 'pending',
                        name: payload.name,
                        category: payload.category,
                        ingredients: payload.ingredients,
                    },
                ],
            }
        }
        case EDIT_DISH_SUCCEED: {
            return {
                ...prevState,
                dishes: [
                    ...prevState.dishes,
                    {
                        ...prevState.dishes.map(
                            (dish) => dish.id === payload.id
                        ),
                        name: payload.name,
                        category: payload.category,
                        ingredients: payload.ingredients,
                        status: 'added',
                    },
                ],
            }
        }
        case EDIT_DISH_FAILED: {
            return {
                ...prevState,
                dishes: [
                    ...prevState.dishes,
                    {
                        ...prevState.dishes.map(
                            (dish) => dish.id === payload.id
                        ),
                        status: 'error',
                    },
                ],
            }
        }
        case ADD_DISH_START: {
            return {
                ...prevState,
                dishes: [
                    ...prevState.dishes,
                    {
                        name: payload.name,
                        category: payload.category,
                        ingredients: payload.ingredients,
                        status: 'pending',
                    },
                ],
            }
        }
        case ADD_DISH_SUCCEED: {
            return {
                ...prevState,
                dishes: [
                    ...prevState.dishes,
                    {
                        ...prevState.dishes.map(
                            (dish) =>
                                dish.name === payload.name &&
                                dish.status === 'pending'
                        ),
                        id: payload.id,
                        name: payload.name,
                        category: payload.category,
                        ingredients: payload.ingredients,
                        status: 'added',
                    },
                ],
            }
        }
        case ADD_DISH_FAILED: {
            return {
                ...prevState,
                dishes: [
                    ...prevState.dishes,
                    {
                        ...prevState.dishes.map(
                            (dish) =>
                                dish.name === payload.name &&
                                dish.status === 'pending'
                        ),
                        id: payload.id,
                        status: 'error',
                    },
                ],
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

export function DishesProvider({ children }: DishesProviderProps) {
    const [state, dispatch] = useReducer(dishesReducer, {
        matchedDishes: dishesFixtures.dishes,
        dishes: dishesFixtures.dishes,
        categories: categoriesFixtures.categories,
        ingredients: ingredientsFixtures.ingredients,
    })

    return (
        <DishesStateContext.Provider value={state}>
            <DishesDispatchContext.Provider value={dispatch}>
                {children}
            </DishesDispatchContext.Provider>
        </DishesStateContext.Provider>
    )
}

export function useDishesState() {
    const context = useContext(DishesStateContext)

    if (context === undefined) {
        throw new Error('useDishesState must be used within a DishesProvider')
    }

    return context
}

export function useDishesDispatch() {
    const context = useContext(DishesDispatchContext)

    if (context === undefined) {
        throw new Error(
            'useDishesDispatch must be used within a DishesProvider'
        )
    }

    return context
}

export async function fetchDishes({ dispatch, q }) {
    dispatch({
        type: SEARCH_DISHES_START,
        payload: { name: q },
    })

    try {
        const response = await searchDishesAPI({
            q,
        })
        const {
            data: { dishes, matchedDishes },
        } = await response.json()

        dispatch({
            type: SEARCH_DISHES_SUCCEED,
            payload: {
                dishes,
                matchedDishes,
            },
        })
    } catch (error) {
        dispatch({
            type: SEARCH_DISHES_FAILED,
            payload: {
                error,
                q,
            },
        })
    }
}

export async function fetchCategories({ dispatch, q }) {
    dispatch({
        type: SEARCH_CATEGORIES_START,
        payload: { name: q },
    })

    try {
        const response = await searchCategoriesAPI({
            q,
        })
        const {
            data: { categories, matchedCategory },
        } = await response.json()

        dispatch({
            type: SEARCH_CATEGORIES_SUCCEED,
            payload: {
                categories,
                matchedCategory,
            },
        })
    } catch (error) {
        dispatch({
            type: SEARCH_CATEGORIES_FAILED,
            payload: {
                error,
                q,
            },
        })
    }
}

export async function fetchIngredients({ dispatch, q }) {
    dispatch({
        type: SEARCH_INGREDIENTS_START,
        payload: { name: q },
    })

    try {
        const response = await searchIngredientsAPI({
            q,
        })
        const {
            data: { ingredients, matchedIngredients },
        } = await response.json()

        dispatch({
            type: SEARCH_INGREDIENTS_SUCCEED,
            payload: {
                ingredients,
                matchedIngredients,
            },
        })
    } catch (error) {
        dispatch({
            type: SEARCH_INGREDIENTS_FAILED,
            payload: {
                error,
                q,
            },
        })
    }
}

export async function addDish({
    dispatch,
    dish: { name, ingredients, category },
}) {
    dispatch({
        type: ADD_DISH_START,
        payload: { name, ingredients, category },
    })

    try {
        const response = await addDishAPI({
            name,
            ingredients,
            category,
        })
        const {
            data: {
                id: dishResultId,
                name: dishResultName,
                ingredients: dishResultIngredients,
                category: dishResultCategory,
            },
        } = await response.json()

        dispatch({
            type: ADD_DISH_SUCCEED,
            payload: {
                id: dishResultId,
                name: dishResultName,
                ingredients: dishResultIngredients,
                category: dishResultCategory,
            },
        })
    } catch (error) {
        dispatch({
            type: ADD_DISH_FAILED,
            payload: {
                error,
                name,
                ingredients,
                category,
            },
        })
    }
}
export async function editDish({
    dispatch,
    dish: { id, name, ingredients, category },
}) {
    dispatch({
        type: EDIT_DISH_START,
        payload: { id, name, ingredients, category },
    })

    try {
        const response = await editDishAPI({
            id,
            name,
            ingredients,
            category,
        })
        const {
            data: {
                id: dishResultId,
                name: dishResultName,
                ingredients: dishResultIngredients,
                category: dishResultCategory,
            },
        } = await response.json()

        dispatch({
            type: EDIT_DISH_SUCCEED,
            payload: {
                id: dishResultId,
                name: dishResultName,
                ingredients: dishResultIngredients,
                category: dishResultCategory,
            },
        })
    } catch (error) {
        dispatch({
            type: EDIT_DISH_FAILED,
            payload: {
                error,
                id,
                name,
                ingredients,
                category,
            },
        })
    }
}
