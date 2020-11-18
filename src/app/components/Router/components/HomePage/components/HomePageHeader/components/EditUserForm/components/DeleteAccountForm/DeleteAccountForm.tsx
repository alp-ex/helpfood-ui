import { ReactElement } from 'react'
import { LabelledValidation } from 'ui-components/molecules'

interface Props {
    onDelete: () => void
}

export default function DeleteAccountForm({ onDelete }: Props): ReactElement {
    return (
        <LabelledValidation
            label={
                'this will delete your user account, you will be able to recreate a new one as soon as the deletion will be confirmed'
            }
            validationButtonLabel={'delete account'}
            onValidation={onDelete}
        />
    )
}
