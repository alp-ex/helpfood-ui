import React, { ReactElement } from 'react'
import ToolBar from '@ui-components/atoms/ToolBar'
import WeekDayPicker from '@ui-components/molecules/WeekDayPicker'
import { Link } from 'react-router-dom'
import Button from '@ui-components/atoms/Button'
import { Routes } from 'Router'
import { useCalendar, setCurrentDay } from 'api/providers/Calendar'

interface Props {
    labels?: { cookButton?: string }
}

export default function NavBar({
    labels: { cookButton: cookButtonLabel = 'Cook' } = {},
}: Props): ReactElement {
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

            <Link to={Routes.COOK}>
                <Button noBorders>{cookButtonLabel}</Button>
            </Link>
        </ToolBar>
    )
}
