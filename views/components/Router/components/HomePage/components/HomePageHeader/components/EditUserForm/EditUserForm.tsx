import {
    useAuthentication,
    updateUserEmail,
    updateUserPassword,
    deleteUserAccount,
    logout,
} from '~/client/providers/Authentication'
import { ReactElement } from 'react'
import { FixedActionBar } from '~/ui-components/atoms'
import { DialogHeader, FullScreenDialog } from '~/ui-components/molecules'
import {
    EmailUpdateForm,
    PasswordUpdateForm,
    DeleteAccountForm,
} from './components'

interface Props {
    onClose: () => void
}

export default function EditUserForm({ onClose }: Props): ReactElement {
    const {
        state: { user },
        dispatch: authenticationDispatch,
    } = useAuthentication()

    return (
        <FullScreenDialog>
            <DialogHeader title={'Account'} onClose={onClose} />

            <EmailUpdateForm
                defaultEmail={user.email}
                onValidation={(email: string) => {
                    updateUserEmail({
                        dispatch: authenticationDispatch,
                        user: {
                            id: user.id,
                            email,
                        },
                    })
                }}
            />

            <PasswordUpdateForm
                onValidation={(password: string) => {
                    updateUserPassword({
                        dispatch: authenticationDispatch,
                        user: {
                            id: user.id,
                            password,
                        },
                    })
                }}
            />

            <DeleteAccountForm
                onDelete={() => {
                    deleteUserAccount({
                        dispatch: authenticationDispatch,
                        id: user.id,
                    })
                }}
            />

            <FixedActionBar
                location="bottom"
                bgcolorOption="light"
                label={'log out'}
                action={() => {
                    logout({ dispatch: authenticationDispatch, id: user.id })
                    onClose()
                }}
            />
        </FullScreenDialog>
    )
}
