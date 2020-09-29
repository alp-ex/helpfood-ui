import React, { ReactElement, useState, useEffect } from 'react'
import { Button } from '@ui-components/atoms'
import { FullScreenDialog } from '@ui-components/molecules'
import { useCalendar } from 'api/providers/Calendar'
import {
    useMealPlan,
    getMealPlan,
    removeMealsFromPlan,
    addMealToPlan,
} from 'api/providers/MealPlan'
import { searchRecipes as searchRecipesAPI } from 'api/services/DishRequests'
import { MealPlanForm, RemoveMealPlanForm } from '..'

interface Props {
    labels?: {
        addMealToPlanButton?: string
        removeMealsFromPlanButton?: string
    }
}

export default function MealPlanEditor({
    labels: {
        addMealToPlanButton: addMealToPlanButtonLabel = 'Add meal',
        removeMealsFromPlanButton: removeMealsFromPlanButtonLabel = 'Remove meals',
    } = {},
}: Props): ReactElement {
    const [isAddMealDialogDisplayed, setIsAddMealDialogDisplayed] = useState(
        false
    )
    const [
        isRemoveMealDialogDisplayed,
        setIsRemoveMealDialogDisplayed,
    ] = useState(false)
    const {
        state: { selectedDay },
    } = useCalendar()
    const {
        state: { meals },
        dispatch: mealPlanDispatch,
    } = useMealPlan()
    const mealsName = meals.map(({ name: mealName }) => mealName)

    useEffect(() => {
        getMealPlan({ dispatch: mealPlanDispatch, day: selectedDay })
    }, [selectedDay])

    return (
        <>
            <Button
                onClick={() => {
                    setIsAddMealDialogDisplayed(true)
                }}
            >
                {addMealToPlanButtonLabel}
            </Button>

            <Button
                onClick={() => {
                    setIsRemoveMealDialogDisplayed(true)
                }}
            >
                {removeMealsFromPlanButtonLabel}
            </Button>

            {isAddMealDialogDisplayed ? (
                <FullScreenDialog>
                    <MealPlanForm
                        getMealsOptions={({ q }) =>
                            searchRecipesAPI({ q }).then((recipes) =>
                                recipes
                                    .filter(
                                        ({ name }) => !mealsName.includes(name)
                                    )
                                    .map(({ name, category, ingredients }) => ({
                                        name,
                                        category,
                                        ingredients,
                                    }))
                            )
                        }
                        onValidate={({ name, category, ingredients }) => {
                            addMealToPlan({
                                dispatch: mealPlanDispatch,
                                day: selectedDay,
                                meal: {
                                    name,
                                    category,
                                    ingredients,
                                },
                            })
                            setIsAddMealDialogDisplayed(false)
                        }}
                        onAbort={() => {
                            setIsAddMealDialogDisplayed(false)
                        }}
                    />
                </FullScreenDialog>
            ) : null}

            {isRemoveMealDialogDisplayed ? (
                <FullScreenDialog>
                    <RemoveMealPlanForm
                        onValidate={(mealsToDelete) => {
                            removeMealsFromPlan({
                                dispatch: mealPlanDispatch,
                                day: selectedDay,
                                meals: mealsToDelete,
                            })
                            setIsRemoveMealDialogDisplayed(false)
                        }}
                        onAbort={() => {
                            setIsRemoveMealDialogDisplayed(false)
                        }}
                        meals={mealsName}
                    />
                </FullScreenDialog>
            ) : null}
        </>
    )
}
