import { ReactElement, useEffect } from 'react'
import { useCalendar } from 'providers/WeekDays'
import { useMealPlan, getMealPlan } from 'providers/FoodPlanning'
import { useDish, getCategories } from 'providers/Food'
import { LabelledInlineList } from 'ui-components/molecules'
import { Group, GutteredSection, StrokedTitle } from 'ui-components/atoms'

export default function MealPlanMain(): ReactElement {
    const {
        state: { selectedWeekDay },
    } = useCalendar()
    const {
        state: { meals },
        dispatch: mealPlanDispatch,
    } = useMealPlan()
    const {
        state: { categories },
        dispatch: dishDispatch,
    } = useDish()

    useEffect(() => {
        getCategories({ dispatch: dishDispatch })
        getMealPlan({
            dispatch: mealPlanDispatch,
            weekday: selectedWeekDay.value,
        })
    }, [selectedWeekDay])

    return (
        <GutteredSection bottomGutter={6}>
            {Math.min(meals.length, categories.length) === 0
                ? null
                : categories.map((categoryName) => (
                      <Group direction="column" key={`${categoryName}`}>
                          <StrokedTitle title={categoryName} />

                          {meals
                              .filter(
                                  ({ recipe }) =>
                                      recipe && categoryName === recipe.category
                              )
                              .map(({ recipe: { id, ingredients, name } }) => (
                                  <LabelledInlineList
                                      key={id}
                                      label={name}
                                      items={ingredients}
                                  />
                              ))}
                      </Group>
                  ))}
        </GutteredSection>
    )
}
