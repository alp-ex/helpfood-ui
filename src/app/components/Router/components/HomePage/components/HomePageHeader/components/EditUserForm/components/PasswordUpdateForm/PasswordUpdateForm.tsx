import { ReactElement, useState } from 'react'
import { InputsListValidation } from 'ui-components/molecules'

interface Props {
    onValidation: (password: string) => void
}

export default function PasswordUpdateForm({
    onValidation,
}: Props): ReactElement {
    const [temporaryNewPassword, setTemporaryNewPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState(false)

    return (
        <InputsListValidation
            direction="column"
            inputs={[
                {
                    value: temporaryNewPassword,
                    onChange: (password) => {
                        setTemporaryNewPassword(password)
                    },
                },
                {
                    value: newPassword,
                    errorMessage: error ? 'passwords mismatch' : '',
                    onChange: (password) => {
                        setNewPassword(password)
                    },
                },
            ]}
            onValidation={() => {
                if (temporaryNewPassword === newPassword) {
                    onValidation(newPassword)
                } else {
                    setError(true)
                }
            }}
        />
    )
}
