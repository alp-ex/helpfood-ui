import { ReactElement } from 'react'

import { CalendarProvider } from '~/services/providers/WeekDays'
import { MealPlanProvider } from '~/services/providers/FoodPlanning'
import { DishesProvider } from '~/services/providers/Food'
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
