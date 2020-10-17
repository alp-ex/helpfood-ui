import React, { ReactElement } from 'react'

import { CalendarProvider } from 'api/providers/Calendar'
import { MealPlanProvider } from 'api/providers/MealPlan'
import { DishesProvider } from 'api/providers/Dishes'
import { MealPlanHeader, MealPlanMain } from './components'
import { ContentBackground } from '@ui-components/atoms'

export default function MealPlan(): ReactElement {
    return (
        <ContentBackground>
            <CalendarProvider>
                <MealPlanProvider>
                    <MealPlanHeader />

                    <DishesProvider>
                        <MealPlanMain />
                    </DishesProvider>
                </MealPlanProvider>
            </CalendarProvider>
        </ContentBackground>
    )
}
