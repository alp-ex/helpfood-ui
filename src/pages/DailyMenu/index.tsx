import React, { ReactElement } from 'react'

import { CalendarProvider } from 'api/providers/calendar/context'
import NavBar from './ui-components/NavBar'
import { MealPlanProvider } from 'api/providers/mealPlan/context'
import MealsList from './ui-components/MealsList'

export default function DailyMenu(): ReactElement {
    return (
        <>
            <CalendarProvider>
                <NavBar />

                <MealPlanProvider>
                    <MealsList />
                </MealPlanProvider>
            </CalendarProvider>
        </>
    )
}
