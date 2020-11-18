import { Button, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Group } from 'ui-components/atoms'

interface Props {
    label: string
    validationButtonLabel: string
    onValidation: () => void
}

export default function LabelledValidation({
    label,
    validationButtonLabel = 'Validate',
    onValidation,
}: Props): ReactElement {
    return (
        <Group direction="column">
            <Typography>{label}</Typography>

            <Button onClick={onValidation}>{validationButtonLabel}</Button>
        </Group>
    )
}
