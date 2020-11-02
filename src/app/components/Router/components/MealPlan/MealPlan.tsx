import { ReactElement } from 'react'

import { CalendarProvider } from 'providers/Calendar'
import { MealPlanProvider } from 'providers/MealPlan'
import { DishesProvider } from 'providers/Dishes'
import { MealPlanHeader, MealPlanMain } from './components'
import { ContentBackground } from 'ui-components/atoms'

export default function MealPlan(): ReactElement {
    return (
        <ContentBackground>
            <CalendarProvider>
                <DishesProvider>
                    <MealPlanProvider>
                        <MealPlanHeader />

                        <MealPlanMain />
                    </MealPlanProvider>
                </DishesProvider>
            </CalendarProvider>
        </ContentBackground>
    )
}
