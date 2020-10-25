import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import {
    getRecipes as getRecipesAPI,
    getCategories as getCategoriesAPI,
    searchRecipes as searchRecipesAPI,
} from 'api/services/DishRequests'

type Recipe = {
    name: string
    category: string
    ingredients: ReadonlyArray<string>
}
type Action = {
    type: string
    payload?: {
        recipes?: ReadonlyArray<Recipe>
        categories?: ReadonlyArray<string>
    }
}
type Dispatch = (action: Action) => void
type State = {
    recipes: ReadonlyArray<Recipe>
    categories: ReadonlyArray<string>
}
type DishesProviderProps = { children: ReactNode }

const DishesStateContext = createContext<State | undefined>(undefined)
const DishesDispatchContext = createContext<Dispatch | undefined>(undefined)

const {
    SEARCH_RECIPES_SUCCEED,
    GET_RECIPES_SUCCEED,
    GET_CATEGORIES_SUCCEED,
} = {
    GET_CATEGORIES_SUCCEED: 'getting all categories succeed',
    GET_RECIPES_SUCCEED: 'getting all recipes succeed',
    SEARCH_RECIPES_SUCCEED: 'searching recipes succeed',
}

function dishesReducer(prevState: State, { type, payload }: Action): State {
    switch (type) {
        case GET_RECIPES_SUCCEED: {
            return {
                ...prevState,
                recipes: payload?.recipes || prevState.recipes,
            }
        }
        case GET_CATEGORIES_SUCCEED: {
            return {
                ...prevState,
                categories: payload?.categories || prevState.categories,
            }
        }
        case SEARCH_RECIPES_SUCCEED: {
            return {
                ...prevState,
                recipes: payload?.recipes || [],
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type} under DishProvider`)
        }
    }
}

export function DishesProvider({ children }: DishesProviderProps) {
    const [state, dispatch] = useReducer(dishesReducer, {
        recipes: [],
        categories: [],
    })

    return (
        <DishesStateContext.Provider value={state}>
            <DishesDispatchContext.Provider value={dispatch}>
                {children}
            </DishesDispatchContext.Provider>
        </DishesStateContext.Provider>
    )
}

function useDishesState() {
    const context = useContext(DishesStateContext)

    if (context === undefined) {
        throw new Error('useDishesState must be used within a DishesProvider')
    }

    return context
}

function useDishesDispatch() {
    const context = useContext(DishesDispatchContext)

    if (context === undefined) {
        throw new Error(
            'useDishesDispatch must be used within a DishesProvider'
        )
    }

    return context
}

export function useDish() {
    return { state: useDishesState(), dispatch: useDishesDispatch() }
}

export async function getRecipes({ dispatch }: { dispatch: Dispatch }) {
    try {
        const response = await getRecipesAPI()

        dispatch({
            type: GET_RECIPES_SUCCEED,
            payload: {
                recipes: response.map(
                    ({ name, category, ingredients }: Recipe) => ({
                        name,
                        category,
                        ingredients,
                    })
                ),
            },
        })
    } catch (error) {
        console.error(error)
    }
}

export async function getCategories({ dispatch }: { dispatch: Dispatch }) {
    try {
        const response = await getCategoriesAPI()

        dispatch({
            type: GET_CATEGORIES_SUCCEED,
            payload: {
                categories: response.map(({ name }: { name: string }) => name),
            },
        })
    } catch (error) {
        console.error(error)
    }
}

export async function searchRecipes({
    params: { q, category },
    dispatch,
}: {
    params: { q: string; category: string }
    dispatch: Dispatch
}) {
    try {
        const response = await searchRecipesAPI({ q, category })

        dispatch({
            type: SEARCH_RECIPES_SUCCEED,
            payload: {
                recipes: response.map(
                    ({ name, category, ingredients }: Recipe) => ({
                        name,
                        category,
                        ingredients,
                    })
                ),
            },
        })
    } catch (error) {
        console.error(error)
    }
}
