import React, { ReactElement, useEffect } from 'react'
import { useCalendar } from 'api/providers/Calendar'
import { useMealPlan, fetchMealPlan } from 'api/providers/MealPlan'
import LabelledList from '@ui-components/molecules/LabelledList'
import Label from '@ui-components/atoms/Label'

interface Props {}

export default function MealsList({}: Props): ReactElement {
    const {
        state: { selectedDay },
    } = useCalendar()
    const {
        state: { mealsPlan },
        dispatch: mealPlanDispatch,
    } = useMealPlan()

    useEffect(() => {
        fetchMealPlan({ dispatch: mealPlanDispatch })
    }, [])

    return (
        <>
            {mealsPlan === null
                ? null
                : Object.keys(mealsPlan[selectedDay]).map((category) => (
                      <LabelledList
                          key={`${name}${category}`}
                          renderLabel={() => <Label>{category}</Label>}
                          items={mealsPlan[selectedDay][category].map(
                              ({ ingredients, name }) => ({
                                  id: `${name}${category}`,
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
                              })
                          )}
                      />
                  ))}
        </>
    )
}
