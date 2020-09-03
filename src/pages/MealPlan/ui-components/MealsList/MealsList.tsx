import React, { ReactElement, useEffect } from 'react'
import { useCalendar } from 'api/providers/Calendar'
import { useMealPlan, getMealPlan } from 'api/providers/MealPlan'
import { useDish, getCategories } from 'api/providers/Dishes'
import { LabelledList } from '@ui-components/molecules'
import { Label } from '@ui-components/atoms'

interface Props {}

export default function MealsList({}: Props): ReactElement {
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
    }, [])

    return (
        <>
            {Math.min(meals.length, categories.length) === 0
                ? null
                : categories.map((categoryName) => (
                      <LabelledList
                          key={`${categoryName}`}
                          renderLabel={() => <Label>{categoryName}</Label>}
                          items={meals
                              .filter(
                                  ({ category: mealCategory }) =>
                                      categoryName === mealCategory
                              )
                              .map(({ ingredients, name }) => ({
                                  id: `${name}${categoryName}`,
                                  render: () => (
                                      <LabelledList
                                          renderLabel={() => (
                                              <Label>{name}</Label>
                                          )}
                                          items={ingredients.map(
                                              (ingredientName) => ({
                                                  id: ingredientName,
                                                  render: () => (
                                                      <Label>
                                                          {ingredientName}
                                                      </Label>
                                                  ),
                                              })
                                          )}
                                      />
                                  ),
                              }))}
                      />
                  ))}
        </>
    )
}
