import { ReactElement, useEffect, useState } from 'react'
import { updateMealPlan, useMealPlan } from '~/services/FoodPlanning'
import { useCalendar } from '~/services/WeekDays'
import { MultiplesSelectionForm } from '~/ui-components/organismes'
import { searchRecipes, getCategories, useDish } from '~/services/Food'

interface Props {
    onClose: () => void
}

export default function UpdateMealForm({ onClose }: Props): ReactElement {
    const { dispatch: mealPlanDispatch } = useMealPlan()
    const {
        state: { selectedWeekDay },
    } = useCalendar()
    const {
        dispatch: dishDispatch,
        state: { categories, recipes },
    } = useDish()
    const {
        state: { meals },
    } = useMealPlan()
    const [selectedOptions, setSelectedOptions] = useState<
        ReadonlyArray<{
            label: string
            value: string
        }>
    >(
        meals.map(({ id, recipe: { name } }) => ({
            label: name,
            value: id,
        }))
    )

    useEffect(() => {
        getCategories({ dispatch: dishDispatch })
    }, [])

    return (
        <MultiplesSelectionForm
            title={selectedWeekDay.label}
            options={{
                labels: ['name', 'category', 'ingredients'],
                values: recipes
                    .filter(
                        ({ name }) =>
                            selectedOptions.findIndex(
                                ({ label: selectedName }) =>
                                    name === selectedName
                            ) === -1
                    )
                    .map(({ name, category, ingredients, id }) => ({
                        labels: {
                            name,
                            category,
                            ingredients: ingredients.join(', '),
                        },
                        values: {
                            id,
                            name,
                        },
                    })),
            }}
            selectedOptions={selectedOptions}
            onGetOptions={({ q, filter }) => {
                searchRecipes({
                    params: { q, category: filter },
                    dispatch: dishDispatch,
                })
            }}
            onUnSelectOption={({ value }) => {
                setSelectedOptions((prevState) =>
                    prevState.filter(
                        ({ value: prevOptionId }) => prevOptionId !== value
                    )
                )
            }}
            onSelectOption={({ id, name }) => {
                setSelectedOptions((prevState) => [
                    ...prevState,
                    { label: name, value: id },
                ])
            }}
            onSubmit={() => {
                updateMealPlan({
                    dispatch: mealPlanDispatch,
                    mealsToAdd: selectedOptions
                        .filter(
                            ({ value }) =>
                                meals.findIndex(
                                    ({ id: prevMealValue }) =>
                                        prevMealValue === value
                                ) === -1
                        )
                        .map(({ value }) => ({
                            recipeId: value,
                        })),
                    weekday: selectedWeekDay.value,
                    mealsToDelete: meals.filter(
                        ({ id }) =>
                            selectedOptions.findIndex(
                                ({ value: selectedOptionId }) =>
                                    selectedOptionId === id
                            ) === -1
                    ),
                })
            }}
            onClose={onClose}
            filters={categories}
            defaultFilter={categories[0]}
        />
    )
}
