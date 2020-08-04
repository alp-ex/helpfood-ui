import React, { ReactElement, useState, useRef } from 'react'
import ToolBar from '@ui-components/atoms/ToolBar'
import Button from '@ui-components/atoms/Button'
import WeekDayPicker from '@ui-components/molecules/WeekDayPicker'
import {
    useCalendarState,
    useCalendarDispatch,
    setCurrentDay,
} from 'api/calendar/context'
import { Link } from 'react-router-dom'
import { Routes } from 'Router'

const msg = new Map([['actions', 'Actions']])

export default function DailyMenu(): ReactElement {
    const { currentDay, weekDays } = useCalendarState()
    const calendarDispatch = useCalendarDispatch()

    return (
        <>
            <ToolBar
                style={{
                    root: {
                        top: 0,
                        position: 'fixed',
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
                    pickedDay={currentDay}
                />

                <Link to={Routes.ACTIONS}>
                    <Button noBorders>{msg.get('actions')}</Button>
                </Link>
            </ToolBar>
        </>
    )
}
