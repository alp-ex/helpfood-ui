import React, { useContext, createContext, ReactNode, useReducer } from 'react'
import { getWeekDaysFromNow } from '@utils/Dates'

type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = {
    weekDays: ReadonlyArray<string>
    selectedDay: string
}
type CalendarProviderProps = { children: ReactNode }

const CalendarStateContext = createContext<State | undefined>(undefined)
const CalendarDispatchContext = createContext<Dispatch | undefined>(undefined)

const { SET_SELECTED_DAY } = Object.freeze({
    SET_SELECTED_DAY: 'set the value of the day who was selected',
})

const calendarReducer = (prevState, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_DAY: {
            return {
                ...prevState,
                selectedDay: payload,
            }
        }
    }
}

export function CalendarProvider({ children }: CalendarProviderProps) {
    const weekDays = getWeekDaysFromNow()

    const [state, dispatch] = useReducer(calendarReducer, {
        weekDays,
        selectedDay: weekDays[0],
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

export function useCalendar() {
    return { state: useCalendarState(), dispatch: useCalendarDispatch() }
}

export function setCurrentDay({ dispatch, day }) {
    dispatch({ type: SET_SELECTED_DAY, payload: day })
}
