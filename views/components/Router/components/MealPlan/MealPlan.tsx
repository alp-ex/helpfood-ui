import { ReactElement } from 'react'

import { CalendarProvider } from '~/client/providers/WeekDays'
import { MealPlanProvider } from '~/client/providers/FoodPlanning'
import { DishesProvider } from '~/client/providers/Food'
import { MealPlanHeader, MealPlanMain } from './components'
import { ContentBackground } from '~/ui-components/atoms'

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
