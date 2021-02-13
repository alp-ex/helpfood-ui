import {
    useContext,
    createContext,
    ReactNode,
    useReducer,
    ReactElement,
} from 'react'
import { getLocalesWeekDays } from '~/services/WeekDays/dates'

type WeekDay = {
    label: string
    value: number
}
type Action = {
    type: string
    payload?: {
        selectedWeekDay?: WeekDay
    }
}
type Dispatch = (action: Action) => void
type State = {
    weekDays: ReadonlyArray<WeekDay>
    selectedWeekDay: WeekDay
}
type CalendarProviderProps = { children: ReactNode }

const CalendarStateContext = createContext<State | undefined>(undefined)
const CalendarDispatchContext = createContext<Dispatch | undefined>(undefined)

const { SET_SELECTED_WEEKDAY } = Object.freeze({
    SET_SELECTED_WEEKDAY: 'set the value of the weekday who was selected',
})

const calendarReducer = (
    prevState: State,
    { type, payload }: Action
): State => {
    switch (type) {
        case SET_SELECTED_WEEKDAY: {
            return {
                ...prevState,
                selectedWeekDay:
                    payload?.selectedWeekDay || prevState.selectedWeekDay,
            }
        }
        default: {
            throw new Error(
                `Unhandled action type: ${type} under CalendarProvider`
            )
        }
    }
}

export function CalendarProvider({
    children,
}: CalendarProviderProps): ReactElement {
    const weekDays = getLocalesWeekDays()
    const [state, dispatch] = useReducer(calendarReducer, {
        weekDays: Object.values(weekDays).map((value, index) => ({
            label: value,
            value: index,
        })),
        selectedWeekDay: { label: weekDays[0], value: 0 },
    })

    return (
        <CalendarStateContext.Provider value={state}>
            <CalendarDispatchContext.Provider value={dispatch}>
                {children}
            </CalendarDispatchContext.Provider>
        </CalendarStateContext.Provider>
    )
}

function useCalendarState() {
    const context = useContext(CalendarStateContext)

    if (context === undefined) {
        throw new Error(
            'useCalendarState must be used within a CalendarProvider'
        )
    }

    return context
}

function useCalendarDispatch() {
    const context = useContext(CalendarDispatchContext)

    if (context === undefined) {
        throw new Error(
            'useCalendarDispatch must be used within a CalendarProvider'
        )
    }

    return context
}

export function useCalendar(): { state: State; dispatch: Dispatch } {
    return { state: useCalendarState(), dispatch: useCalendarDispatch() }
}

export function setCurrentDay({
    dispatch,
    weekday,
}: {
    dispatch: Dispatch
    weekday: WeekDay
}): void {
    dispatch({
        type: SET_SELECTED_WEEKDAY,
        payload: { selectedWeekDay: weekday },
    })
}
