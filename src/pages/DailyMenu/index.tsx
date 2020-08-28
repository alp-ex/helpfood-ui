import React, { ReactElement } from 'react'

import { CalendarProvider } from 'api/providers/Calendar'
import NavBar from './ui-components/NavBar'
import { MealPlanProvider } from 'api/providers/MealPlan'
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
