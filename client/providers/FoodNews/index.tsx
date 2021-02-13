import {
    useContext,
    createContext,
    ReactNode,
    useReducer,
    ReactElement,
} from 'react'
import { getFoodDiveNews as getFoodDiveNewsAPI } from '~/client/services/FoodDiveRSS'
import { parseString } from 'xml2js'

type FoodDiveFeed = {
    title: ReadonlyArray<string>
    description: ReadonlyArray<string>
    link: ReadonlyArray<string>
    pubDate: ReadonlyArray<string>
    'dc:creator': ReadonlyArray<{ _: string }>
}
type FoodNews = {
    title: string
    description: string
    link: string
    pubDate: string
    author: string
}
type Action = {
    type: string
    payload?: {
        foodDiveNews?: ReadonlyArray<FoodNews>
    }
}
type Dispatch = (action: Action) => void
type State = {
    foodNews: ReadonlyArray<FoodNews>
}
type FoodNewsProviderProps = { children: ReactNode }

const FoodNewsStateContext = createContext<State | undefined>(undefined)
const FoodNewsDispatchContext = createContext<Dispatch | undefined>(undefined)

const { GET_FOOD_NEWS_SUCCEED } = Object.freeze({
    GET_FOOD_NEWS_SUCCEED: 'getting news from api succeed',
})

const convertFoodDiveRSSFeedsToNews = (
    feeds: string
): ReadonlyArray<FoodNews> => {
    const news: Array<FoodNews> = []

    parseString(
        feeds,
        (
            _: Error,
            result: {
                rss: {
                    channel: ReadonlyArray<{
                        item: ReadonlyArray<FoodDiveFeed>
                    }>
                }
            }
        ) => {
            const items = result.rss.channel[0].item
            items.forEach(
                ({
                    title,
                    link,
                    description,
                    pubDate,
                    'dc:creator': authors,
                }: FoodDiveFeed) => {
                    news.push({
                        title: title[0],
                        link: link[0],
                        description: description[0],
                        pubDate: pubDate[0],
                        author: authors.map(({ _: name }) => name)[0],
                    })
                }
            )
        }
    )

    return news
}

const foodNewsReducer = (
    prevState: State,
    { type, payload }: Action
): State => {
    switch (type) {
        case GET_FOOD_NEWS_SUCCEED: {
            return {
                ...prevState,
                foodNews: payload?.foodDiveNews || prevState.foodNews,
            }
        }
        default: {
            throw new Error(
                `Unhandled action type: ${type} under FoodNewsProvider`
            )
        }
    }
}

export function FoodNewsProvider({
    children,
}: FoodNewsProviderProps): ReactElement {
    const [state, dispatch] = useReducer(foodNewsReducer, {
        foodNews: [],
    })

    return (
        <FoodNewsStateContext.Provider value={state}>
            <FoodNewsDispatchContext.Provider value={dispatch}>
                {children}
            </FoodNewsDispatchContext.Provider>
        </FoodNewsStateContext.Provider>
    )
}

function useFoodNewsState() {
    const context = useContext(FoodNewsStateContext)

    if (context === undefined) {
        throw new Error(
            'useFoodNewsState must be used within a FoodNewsProvider'
        )
    }

    return context
}

function useFoodNewsDispatch() {
    const context = useContext(FoodNewsDispatchContext)

    if (context === undefined) {
        throw new Error(
            'useFoodNewsDispatch must be used within a FoodNewsProvider'
        )
    }

    return context
}

export function useFoodNews(): { state: State; dispatch: Dispatch } {
    return { state: useFoodNewsState(), dispatch: useFoodNewsDispatch() }
}

export async function getFoodNews({
    dispatch,
}: {
    dispatch: Dispatch
}): Promise<void> {
    const foodDiveNews = await getFoodDiveNewsAPI()

    dispatch({
        type: GET_FOOD_NEWS_SUCCEED,
        payload: { foodDiveNews: convertFoodDiveRSSFeedsToNews(foodDiveNews) },
    })
}
