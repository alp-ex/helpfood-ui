import { ReactElement, useState } from 'react'
import { InputsListValidation } from 'ui-components/molecules'

interface Props {
    defaultEmail: string
    onValidation: (email: string) => void
}

export default function EmailUpdateForm({
    defaultEmail,
    onValidation,
}: Props): ReactElement {
    const [userEmail, setUserEmail] = useState(defaultEmail)

    return (
        <InputsListValidation
            inputs={[
                {
                    value: userEmail,
                    onChange: (email) => {
                        setUserEmail(email)
                    },
                },
            ]}
            onValidation={() => onValidation(userEmail)}
        />
    )
}
