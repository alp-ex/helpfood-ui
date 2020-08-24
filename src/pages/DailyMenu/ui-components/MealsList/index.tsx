import React, { ReactElement, useEffect } from 'react'
import { useCalendar } from 'api/providers/calendar/context'
import { useMealPlan, fetchMealPlan } from 'api/providers/mealPlan/context'
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
                          key={name}
                          renderLabel={() => <Label>{category}</Label>}
                          items={mealsPlan[selectedDay][category].map(
                              ({ ingredients, name }) => ({
                                  id: name,
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
