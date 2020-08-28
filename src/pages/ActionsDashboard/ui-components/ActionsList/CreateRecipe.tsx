import React, { ReactElement, useState } from 'react'
import Label from '@ui-components/atoms/Label'
import Button from '@ui-components/atoms/Button'
import FullScreenDialog from '@ui-components/molecules/FullScreenDialog'
import RecipeForm from '../RecipeForm'
import { useDish, addRecipe, DishesProvider } from 'api/providers/Dish'

interface Props {
    labels?: { action?: string; actionButton?: string }
}

const RecipeFormContainer = ({ renderRecipeForm }) => {
    const { dispatch: dishDispatch } = useDish()

    return renderRecipeForm({ dishDispatch })
}

export default function CreateRecipe({
    labels: {
        action: actionLabel = 'Please add some recipes',
        actionButton: actionButtonLabel = 'Create recipe',
    } = {},
}: Props): ReactElement {
    const [isDialogDisplayed, setIsDialogDisplayed] = useState(false)

    return (
        <div>
            <Label>{actionLabel}</Label>

            <Button
                onClick={() => {
                    setIsDialogDisplayed(true)
                }}
            >
                {actionButtonLabel}
            </Button>

            {!isDialogDisplayed ? null : (
                <FullScreenDialog>
                    <DishesProvider>
                        <RecipeFormContainer
                            renderRecipeForm={({ dishDispatch }) => (
                                <RecipeForm
                                    onAbort={() => {
                                        setIsDialogDisplayed(false)
                                    }}
                                    onValidate={({
                                        name,
                                        category,
                                        ingredients,
                                    }) => {
                                        addRecipe({
                                            dispatch: dishDispatch,
                                            recipe: {
                                                name,
                                                category,
                                                ingredients,
                                            },
                                        })
                                        setIsDialogDisplayed(false)
                                    }}
                                />
                            )}
                        />
                    </DishesProvider>
                </FullScreenDialog>
            )}
        </div>
    )
}
