import React, { ReactElement } from 'react'
import ToolBar from '@ui-components/atoms/ToolBar'
import Button from '@ui-components/atoms/Button'
import WeekDayPicker from '@ui-components/molecules/WeekDayPicker'
import {
    useCalendarState,
    useCalendarDispatch,
    setCurrentDay,
    CalendarProvider,
} from 'api/providers/calendar/context'
import { Link } from 'react-router-dom'
import { Routes } from 'Router'
import { useDishPlanState } from 'api/providers/mealPlan/context'
import Label from '@ui-components/atoms/Label'
import LabelledList from '@ui-components/molecules/LabelledList'
import MealPlan from './ui-components/MealPlan'
import NavBar from './ui-components/NavBar'

const msg = new Map([['actions', 'Actions']])

export default function DailyMenu(): ReactElement {
    return (
        <>
            <CalendarProvider>
                <NavBar />

                <MealPlan />
            </CalendarProvider>
        </>
    )
}
