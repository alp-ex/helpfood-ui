import React, { ReactElement } from 'react'

import {
    CalendarProvider,
    useCalendar,
    setCurrentDay,
} from 'api/providers/Calendar'
import { MealPlanProvider } from 'api/providers/MealPlan'
import MealsList from './ui-components/MealsList'
import ToolBar from '@ui-components/atoms/ToolBar'
import WeekDayPicker from '@ui-components/molecules/WeekDayPicker'
import Button from '@ui-components/atoms/Button'

interface ActionBarProps {
    labels?: {
        editPlanButton?: string
    }
}
const ActionBar = ({
    labels: { editPlanButton: editPlanButtonLabel = 'Edit Plan' } = {},
}: ActionBarProps): ReactElement => {
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

            <Button>{editPlanButtonLabel}</Button>
        </ToolBar>
    )
}

export default function MealPlan(): ReactElement {
    return (
        <>
            <CalendarProvider>
                <ActionBar />

                <MealPlanProvider>
                    <MealsList />
                </MealPlanProvider>
            </CalendarProvider>
        </>
    )
}
