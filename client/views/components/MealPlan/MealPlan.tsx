import { ReactElement } from 'react'

import { CalendarProvider } from '~/services/WeekDays'
import { MealPlanProvider } from '~/services/FoodPlanning'
import { DishesProvider } from '~/services/Food'
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
