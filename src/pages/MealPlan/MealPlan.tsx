import React, { ReactElement } from 'react'

import {
    CalendarProvider,
    useCalendar,
    setCurrentDay,
} from 'api/providers/Calendar'
import { MealPlanProvider } from 'api/providers/MealPlan'
import { DishesProvider } from 'api/providers/Dishes'
import { ToolBar } from '@ui-components/atoms'
import { WeekDayPicker } from '@ui-components/molecules'
import { MealsList, MealPlanEditor } from './ui-components'

interface MealActionsProps {
    labels?: {
        editPlanButton?: string
    }
}
const MealActions = ({ labels: {} = {} }: MealActionsProps): ReactElement => {
    const {
        state: { weekDays, selectedDay },
        dispatch: calendarDispatch,
    } = useCalendar()

    return (
        <ToolBar
            style={{
                root: {
                    top: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                },
            }}
        >
            <WeekDayPicker
                weekDays={weekDays}
                pickDay={(day) =>
                    setCurrentDay({
                        dispatch: calendarDispatch,
                        day,
                    })
                }
                pickedDay={selectedDay}
            />

            <MealPlanEditor />
        </ToolBar>
    )
}

export default function MealPlan(): ReactElement {
    return (
        <>
            <CalendarProvider>
                <MealPlanProvider>
                    <MealActions />

                    <DishesProvider>
                        <MealsList />
                    </DishesProvider>
                </MealPlanProvider>
            </CalendarProvider>
        </>
    )
}
