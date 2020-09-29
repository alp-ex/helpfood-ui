import { ToolBar } from '@ui-components/atoms'
import { WeekDayPicker } from '@ui-components/molecules'
import { setCurrentDay, useCalendar } from 'api/providers/Calendar'
import React, { ReactElement } from 'react'
import MealPlanEditor from '../MealPlanEditor/MealPlanEditor'

interface MealActionsProps {
    labels?: {
        editPlanButton?: string
    }
}
export default function MealActions({
    labels: {} = {},
}: MealActionsProps): ReactElement {
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
