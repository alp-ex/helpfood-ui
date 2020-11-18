import { Button, InputAdornment, TextField } from '@material-ui/core'
import { ReactElement, ReactNode } from 'react'
import { Group } from 'ui-components/atoms'

type Direction = 'column' | 'row'

interface Props {
    inputs: ReadonlyArray<{
        renderIcon?: () => ReactNode
        errorMessage?: string
        value: string
        onChange: (value: string) => void
    }>
    onValidation: () => void
    direction?: Direction
    buttonValidationLabel?: string
}

export default function InputsListValidation({
    inputs,
    onValidation,
    direction = 'column',
    buttonValidationLabel = 'validate',
}: Props): ReactElement {
    return (
        <Group direction={direction}>
            {inputs.map(({ value, onChange, renderIcon, errorMessage }) => (
                <TextField
                    error={errorMessage !== ''}
                    helperText={errorMessage}
                    InputProps={{
                        startAdornment: renderIcon ? (
                            <InputAdornment position="start">
                                {renderIcon()}
                                <span>|</span>
                            </InputAdornment>
                        ) : null,
                    }}
                    key={value}
                    value={value}
                    onChange={(event) => onChange(event.currentTarget.value)}
                />
            ))}

            <Button onClick={onValidation}>{buttonValidationLabel}</Button>
        </Group>
    )
}
