import {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    ReactElement,
} from 'react'
import {
    getCategories as getCategoriesAPI,
    searchRecipes as searchRecipesAPI,
} from '~/services/Food/FoodAPI'

type Recipe = {
    id: string
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

const { SEARCH_RECIPES_SUCCEED, GET_CATEGORIES_SUCCEED } = {
    GET_CATEGORIES_SUCCEED: 'getting all categories succeed',
    SEARCH_RECIPES_SUCCEED: 'searching recipes succeed',
}

function dishesReducer(prevState: State, { type, payload }: Action): State {
    switch (type) {
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

export function DishesProvider({
    children,
}: DishesProviderProps): ReactElement {
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

export function useDish(): { state: State; dispatch: Dispatch } {
    return { state: useDishesState(), dispatch: useDishesDispatch() }
}

export async function getCategories({
    dispatch,
}: {
    dispatch: Dispatch
}): Promise<void> {
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
}): Promise<void> {
    try {
        const response = await searchRecipesAPI({ q, category })

        dispatch({
            type: SEARCH_RECIPES_SUCCEED,
            payload: {
                recipes: response.map(
                    ({ id, name, category, ingredients }: Recipe) => ({
                        id,
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
