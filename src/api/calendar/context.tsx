import React, { useContext, createContext, ReactNode, useReducer } from 'react'
import { getWeekDaysFromNow } from '@utils/Dates'

type Action = { type: string; payload?: {} }
type Dispatch = (action: Action) => void
type State = {
    currentDay: string
    weekDays: ReadonlyArray<string>
}
type CalendarProviderProps = { children: ReactNode }

const CalendarStateContext = createContext<State | undefined>(undefined)
const CalendarDispatchContext = createContext<Dispatch | undefined>(undefined)

const { SET_CURRENT_DAY } = Object.freeze({
    SET_CURRENT_DAY: 'set the current day to show',
})

const calendarReducer = (prevState, { type, payload }) => {
    switch (type) {
        case SET_CURRENT_DAY: {
            return {
                ...prevState,
                currentDay: payload,
            }
        }
    }
}

export function CalendarProvider({ children }: CalendarProviderProps) {
    const weekDays = getWeekDaysFromNow()

    const [state, dispatch] = useReducer(calendarReducer, {
        currentDay: weekDays[0],
        weekDays,
    })

    return (
        <CalendarStateContext.Provider value={state}>
            <CalendarDispatchContext.Provider value={dispatch}>
                {children}
            </CalendarDispatchContext.Provider>
        </CalendarStateContext.Provider>
    )
}

export function useCalendarState() {
    const context = useContext(CalendarStateContext)

    if (context === undefined) {
        throw new Error(
            'useCalendarState must be used within a CalendarProvider'
        )
    }

    return context
}

export function useCalendarDispatch() {
    const context = useContext(CalendarDispatchContext)

    if (context === undefined) {
        throw new Error(
            'useCalendarDispatch must be used within a CalendarProvider'
        )
    }

    return context
}

export function setCurrentDay({ dispatch, day }) {
    dispatch({ type: SET_CURRENT_DAY, payload: day })
}
