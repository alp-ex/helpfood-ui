import React, { useState } from 'react'
import useForm from '@utils/useForm'
import { Form, Select, ToolBar, Button, Label } from '@ui-components/atoms'

interface Props {
    labels?: {
        validationButton?: string
        abortButton?: string
        selectMeal?: string
    }
    onValidate: ({
        name,
        category,
        ingredients,
    }: {
        name: string
        category: string
        ingredients: ReadonlyArray<string>
    }) => void
    onAbort: () => void
    getMealsOptions: ({
        q: string,
    }) => Promise<
        ReadonlyArray<{
            name: string
            category: string
            ingredients: ReadonlyArray<string>
        }>
    >
}

export default function MealPlanForm({
    labels: {
        validationButton: validationButtonLabel = 'Confirm',
        abortButton: abortButtonLabel = 'Abort',
        selectMeal: selectMealLabel = 'Choose a meal to add to plan',
    } = {},
    onValidate,
    onAbort,
    getMealsOptions,
}: Props) {
    const [mealOptions, setMealsOptions] = useState([])
    const {
        value: {
            name: mealNameValue,
            category: mealCategoryValue,
            ingredients: mealIngredientsValue,
        },
        setValue: onMealChange,
    } = useForm({
        defaultValue: {
            name: '',
            category: '',
            ingredients: [],
        },
    })

    return (
        <Form>
            <Label>{selectMealLabel}</Label>

            <Select
                onChange={(event) => {
                    getMealsOptions({ q: event.target.value }).then(
                        (mealsOptions) => {
                            setMealsOptions(
                                mealsOptions.map(
                                    ({ name, category, ingredients }) => ({
                                        label: name,
                                        value: { name, category, ingredients },
                                    })
                                )
                            )
                        }
                    )
                }}
                onOptionClick={({ name, category, ingredients }) => {
                    onMealChange({ name, category, ingredients })
                }}
                options={mealOptions}
                value={mealNameValue}
            />

            <ToolBar
                style={{
                    root: {
                        position: 'fixed',
                        bottom: '1em',
                        justifyContent: 'space-around',
                        width: '100%',
                    },
                }}
            >
                <Button onClick={onAbort}>{abortButtonLabel}</Button>

                <Button
                    onClick={() => {
                        if (mealNameValue === '') {
                            return
                        }

                        onValidate({
                            name: mealNameValue,
                            category: mealCategoryValue,
                            ingredients: mealIngredientsValue,
                        })
                    }}
                >
                    {validationButtonLabel}
                </Button>
            </ToolBar>
        </Form>
    )
}
