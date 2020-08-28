import React, { ReactElement, useState } from 'react'
import Button from '@ui-components/atoms/Button'
import FullScreenDialog from '@ui-components/molecules/FullScreenDialog'
import Label from '@ui-components/atoms/Label'

interface Props {
    labels?: {
        action?: string
        actionButton?: string
    }
}

export default function EditRecipe({
    labels: {
        action: actionLabel = 'Choose a recipe to edit',
        actionButton: actionButtonLabel = 'Edit recipe',
    } = {},
}: Props): ReactElement {
    const [isDialogDisplayed, setIsDialogDisplayed] = useState(false)

    return (
        <>
            <Label>{actionLabel}</Label>

            <Button
                onClick={() => {
                    setIsDialogDisplayed(true)
                }}
            >
                {actionButtonLabel}
            </Button>

            {isDialogDisplayed ? (
                <FullScreenDialog>
                    <EditableRecipes />
                </FullScreenDialog>
            ) : null}
        </>
    )
}
