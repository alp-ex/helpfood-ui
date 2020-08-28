import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import { addRecipe as addRecipeAPI } from 'api/services/DishRequests'

type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = {
    recipes: ReadonlyArray<{
        name: string
        category: string
        ingredients: ReadonlyArray<string>
    }>
}
type DishesProviderProps = { children: ReactNode }

const DishesStateContext = createContext<State | undefined>(undefined)
const DishesDispatchContext = createContext<Dispatch | undefined>(undefined)

const { ADDING_RECIPE_STARTED } = {
    ADDING_RECIPE_STARTED: 'start adding a recipe',
}

function dishesReducer(prevState, { type, payload }) {
    switch (type) {
        case ADDING_RECIPE_STARTED: {
            return {
                ...payload,
                recipes: [...prevState.recipes, payload],
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

export function DishesProvider({ children }: DishesProviderProps) {
    const [state, dispatch] = useReducer(dishesReducer, {
        recipes: [],
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

export async function addRecipe({
    dispatch,
    recipe: { name, category, ingredients },
}) {
    dispatch({
        type: ADDING_RECIPE_STARTED,
        payload: { name, category, ingredients },
    })

    try {
        await addRecipeAPI({
            name,
            category,
            ingredients,
        })
    } catch (error) {
        console.error(error)
    }
}
