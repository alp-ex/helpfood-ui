import React, { ReactElement, useEffect } from 'react'
import { useCalendar } from 'api/providers/Calendar'
import { useMealPlan, getMealPlan } from 'api/providers/MealPlan'
import { useDish, getCategories } from 'api/providers/Dishes'
import { LabelledInlineList } from '@ui-components/molecules'
import { Group, StrokedTitle } from '@ui-components/atoms'

interface Props {}

export default function MealPlanMain({}: Props): ReactElement {
    const {
        state: { selectedDay },
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
        getMealPlan({ dispatch: mealPlanDispatch, day: selectedDay })
    }, [selectedDay])

    return (
        <>
            {Math.min(meals.length, categories.length) === 0
                ? null
                : categories.map((categoryName) => (
                      <Group direction="column" key={`${categoryName}`}>
                          <StrokedTitle title={categoryName} />

                          {meals
                              .filter(
                                  ({ category: mealCategory }) =>
                                      categoryName === mealCategory
                              )
                              .map(({ ingredients, name }) => (
                                  <LabelledInlineList
                                      key={`${name}${categoryName}`}
                                      label={name}
                                      items={ingredients}
                                  />
                              ))}
                      </Group>
                  ))}
        </>
    )
}
