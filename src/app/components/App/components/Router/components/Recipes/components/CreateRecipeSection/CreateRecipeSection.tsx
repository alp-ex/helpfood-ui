import React, { ReactElement, useState } from 'react'
import { RecipeForm } from '../../components'
import { useDish, addRecipe } from 'api/providers/Dishes'
import { Label, Button } from '@ui-components/atoms'
import { FullScreenDialog } from '@ui-components/molecules'

interface Props {
    labels?: { action?: string; actionButton?: string }
}

const RecipeFormContainer = ({ renderRecipeForm }) => {
    const { dispatch: dishDispatch } = useDish()

    return renderRecipeForm({ dishDispatch })
}

export default function CreateRecipeSection({
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
                </FullScreenDialog>
            )}
        </div>
    )
}
