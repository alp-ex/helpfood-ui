import React, { ReactElement } from 'react'

import { CalendarProvider } from 'api/providers/Calendar'
import { MealPlanProvider } from 'api/providers/MealPlan'
import { DishesProvider } from 'api/providers/Dishes'
import { MealsList } from './components'
import MealActions from './components/MealActions/MealActions'

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
