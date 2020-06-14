import React, { createContext, useReducer, useContext, ReactNode } from 'react'
// import dishesClient from '@client/dishesClient'
import dishesFixtures from './fixtures/dishes.json'
import categoriesFixtures from './fixtures/categories.json'
import ingredientsFixtures from './fixtures/ingredients.json'

type Category = {
    id: string
    name: string
}

type Ingredient = {
    id: string
    name: string
}
type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = {
    dishes: ReadonlyArray<{
        id: string
        name: string
        ingredients: Ingredient
        category: string
    }>
    categories: ReadonlyArray<Category>
    ingredients: ReadonlyArray<Ingredient>
}
type DishesProviderProps = { children: ReactNode }

const DishesStateContext = createContext<State | undefined>(undefined)
const DishesDispatchContext = createContext<Dispatch | undefined>(undefined)

const {} = {}

function dishesReducer(prevState, { type, payload }) {
    switch (type) {
        case '': {
            return prevState
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

export function DishesProvider({ children }: DishesProviderProps) {
    const [state, dispatch] = useReducer(dishesReducer, {
        dishes: dishesFixtures,
        categories: categoriesFixtures,
        ingredients: ingredientsFixtures,
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
    // dispatch({ type: FETCH, payload: { meal } })
    // try {
    //     // const updatedMeals = await mealClient.updateMeal({ meals })
    //     dispatch({ type: UPDATE_MEAL_PLAN_SUCCEED, payload: { meal } })
    // } catch (error) {
    //     dispatch({
    //         type: UPDATE_MEAL_PLAN_FAILED,
    //         // payload: { meals: prevMeals, error },
    //     })
    // }
}

export async function fetchCategories({ dispatch, q }) {
    // dispatch({ type: FETCH, payload: { meal } })
    // try {
    //     // const updatedMeals = await mealClient.updateMeal({ meals })
    //     dispatch({ type: UPDATE_MEAL_PLAN_SUCCEED, payload: { meal } })
    // } catch (error) {
    //     dispatch({
    //         type: UPDATE_MEAL_PLAN_FAILED,
    //         // payload: { meals: prevMeals, error },
    //     })
    // }
}

export async function fetchIngredients({ dispatch, q }) {
    // dispatch({ type: FETCH, payload: { meal } })
    // try {
    //     // const updatedMeals = await mealClient.updateMeal({ meals })
    //     dispatch({ type: UPDATE_MEAL_PLAN_SUCCEED, payload: { meal } })
    // } catch (error) {
    //     dispatch({
    //         type: UPDATE_MEAL_PLAN_FAILED,
    //         // payload: { meals: prevMeals, error },
    //     })
    // }
}

export async function removeIngredientFromDish({ dispatch, id }) {
    // dispatch({ type: FETCH, payload: { meal } })
    // try {
    //     // const updatedMeals = await mealClient.updateMeal({ meals })
    //     dispatch({ type: UPDATE_MEAL_PLAN_SUCCEED, payload: { meal } })
    // } catch (error) {
    //     dispatch({
    //         type: UPDATE_MEAL_PLAN_FAILED,
    //         // payload: { meals: prevMeals, error },
    //     })
    // }
}
