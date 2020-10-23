import React, { useEffect, useState } from 'react'
import { addMealsToPlan, useMealPlan } from 'api/providers/MealPlan'
import { useCalendar } from 'api/providers/Calendar'
import { MultiplesSelectionForm } from '@ui-components/organismes'
import {
    searchRecipes,
    getCategories,
    useDish,
    getRecipes,
} from 'api/providers/Dishes'

interface Props {
    onClose: () => void
}

export default function AddMealForm({ onClose }: Props) {
    const { dispatch: mealPlanDispatch } = useMealPlan()
    const {
        state: { selectedDay },
    } = useCalendar()
    const {
        dispatch: dishDispatch,
        state: { categories, recipes },
    } = useDish()
    const [selectedOptions, setSelectedOptions] = useState<
        ReadonlyArray<{
            name: string
            category: string
            ingredients: string
        }>
    >([])
    const [selectedFilter, setSelectedFilter] = useState('')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getCategories({ dispatch: dishDispatch })
        getRecipes({ dispatch: dishDispatch })
    }, [])

    return (
        <MultiplesSelectionForm
            title={selectedDay}
            options={{
                labels: ['name', 'category', 'ingredients'],
                values: recipes.map(({ name, category, ingredients }) => ({
                    name,
                    category,
                    ingredients: ingredients.join(', '),
                })),
            }}
            selectedOptions={selectedOptions.map((option) => ({
                label: option.name,
                value: option,
            }))}
            onGetOptions={({ q, filter }) => {
                searchRecipes({
                    params: { q, category: filter },
                    dispatch: dishDispatch,
                })
            }}
            onUnSelectOption={(option) => {
                setSelectedOptions((prevState) =>
                    prevState.filter(
                        (prevOption) =>
                            JSON.stringify(prevOption) !==
                            JSON.stringify(option)
                    )
                )
            }}
            onSelectOption={({ name, category, ingredients }) => {
                setSelectedOptions((prevState) => [
                    ...prevState,
                    { name, category, ingredients },
                ])
            }}
            onSubmit={() => {
                addMealsToPlan({
                    dispatch: mealPlanDispatch,
                    day: selectedDay,
                    meals: selectedOptions.map(
                        ({ name, category, ingredients }) => ({
                            day: selectedDay,
                            name,
                            category,
                            ingredients: ingredients.split(', '),
                        })
                    ),
                })
            }}
            onClose={onClose}
            filters={categories}
            defaultFilter={categories[0]}
        />
    )
}
