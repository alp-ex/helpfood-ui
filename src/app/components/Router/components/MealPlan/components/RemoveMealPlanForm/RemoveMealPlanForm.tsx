import React, { ReactElement, useState } from 'react'
import { Chips, Button, ToolBar } from '@ui-components/atoms'

interface Props {
    labels?: { abortButton?: string; validationButton?: string }
    onValidate: (meals: ReadonlyArray<string>) => void
    onAbort: () => void
    meals: ReadonlyArray<string>
}

export default function RemoveMealPlanForm({
    meals,
    onValidate,
    onAbort,
    labels: {
        abortButton: abortButtonLabel = 'Abort',
        validationButton: validationButtonLabel = 'Confirm',
    } = {},
}: Props): ReactElement {
    const [mealsToDelete, setMealsToDelete] = useState(new Map())

    return (
        <>
            <ul>
                {meals.map((meal) => (
                    <Chips
                        style={{
                            root: {
                                borderColor: mealsToDelete[meal]
                                    ? 'red'
                                    : 'inherit',
                                color: mealsToDelete[meal] ? 'red' : 'inherit',
                            },
                        }}
                        key={meal}
                        onClick={() => {
                            setMealsToDelete((prevState) => ({
                                ...prevState,
                                [meal]: !prevState[meal],
                            }))
                        }}
                    >
                        {meal}
                    </Chips>
                ))}
            </ul>

            <ToolBar>
                <Button onClick={onAbort}>{abortButtonLabel}</Button>
                <Button
                    onClick={() => {
                        onValidate(
                            Object.keys(mealsToDelete).filter(
                                (meal) => mealsToDelete[meal]
                            )
                        )
                    }}
                >
                    {validationButtonLabel}
                </Button>
            </ToolBar>
        </>
    )
}
