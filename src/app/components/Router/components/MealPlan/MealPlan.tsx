import React, { ReactElement } from 'react'

import { CalendarProvider } from 'api/providers/Calendar'
import { MealPlanProvider } from 'api/providers/MealPlan'
import { DishesProvider } from 'api/providers/Dishes'
import { MealsList } from './components'
import MealPlanHeader from './components/MealPlanHeader/MealPlanHeader'

export default function MealPlan(): ReactElement {
    return (
        <>
            <CalendarProvider>
                <MealPlanProvider>
                    <MealPlanHeader />

                    <DishesProvider>
                        <MealsList />
                    </DishesProvider>
                </MealPlanProvider>
            </CalendarProvider>
        </>
    )
}
