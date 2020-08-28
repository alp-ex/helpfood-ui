import React, { useState } from 'react'
import Form from '@ui-components/atoms/Form'
import Chips from '@ui-components/atoms/Chips'
import ToolBar from '@ui-components/atoms/ToolBar'
import Button from '@ui-components/atoms/Button'
import Select from '../Select'
import useForm from '@utils/useForm'
import { searchRecipes as searchRecipesAPI } from 'api/services/DishRequests'
import { useCalendar } from 'api/providers/Calendar'

interface Props {
    labels?: {
        validationButton?: string
        abortButton?: string
    }
    defaultValues?: {
        recipesName?: ReadonlyArray<string>
    }
    onValidate: ({
        recipes,
        day,
    }: {
        recipes: ReadonlyArray<string>
        day: string
    }) => void
    onAbort: () => void
}

export default function MealPlanForm({
    labels: {
        validationButton: validationButtonLabel = 'Confirm',
        abortButton: abortButtonLabel = 'Abort',
    } = {},
    defaultValues: { recipesName: defaultRecipesName = [] } = {},
    onValidate,
    onAbort,
}: Props) {
    const [recipesOptions, setRecipesOptions] = useState([])

    const { value: recipesNameValues, setValue: onRecipeNameChange } = useForm({
        defaultValue: defaultRecipesName,
    })
    const {
        state: { selectedDay },
    } = useCalendar()

    return (
        <Form>
            <Select
                onChange={(event) => {
                    searchRecipesAPI({ q: event.target.value }).then(
                        (recipes) => {
                            setRecipesOptions(recipes.map(({ name }) => ({
                                label: name,
                                value: name,
                            }))
                        }
                    )
                    onRecipeNameChange((prevState) => [
                        ...prevState,
                        event.target.value,
                    ])
                }}
                onOptionClick={(name) => {
                    onRecipeNameChange((prevState) => [...prevState, name])
                }}
                options={recipesOptions}
            />

            {recipesNameValues.map((recipeName) => (
                <Chips
                    key={recipeName}
                    onClose={() =>
                        onRecipeNameChange((prevState) =>
                            prevState.filter((recipe) => recipe !== recipeName)
                        )
                    }
                >
                    {recipeName}
                </Chips>
            ))}

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
                    style={{
                        root: { position: 'fixed', bottom: '1em' },
                    }}
                    onClick={() =>
                        onValidate({
                            recipes: recipesNameValues,
                            day: selectedDay,
                        })
                    }
                >
                    {validationButtonLabel}
                </Button>
            </ToolBar>
        </Form>
    )
}
