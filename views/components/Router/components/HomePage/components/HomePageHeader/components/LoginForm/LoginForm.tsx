import { login, useAuthentication } from '~/client/providers/Authentication'
import { ReactElement, useState } from 'react'
import {
    DialogHeader,
    FullScreenDialog,
    InputsListValidation,
} from '~/ui-components/molecules'
import { MdEmail as MailIcon, MdLock as PasswordIcon } from 'react-icons/md'

interface Props {
    onClose: () => void
}

export default function LoginForm({ onClose }: Props): ReactElement {
    const { dispatch: authenticationDispatch } = useAuthentication()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <FullScreenDialog>
            <DialogHeader onClose={onClose} />

            <InputsListValidation
                inputs={[
                    {
                        renderIcon: function renderMailIcon() {
                            return <MailIcon />
                        },
                        value: email,
                        onChange: (email) => setEmail(email),
                    },
                    {
                        renderIcon: function renderPasswordIcon() {
                            return <PasswordIcon />
                        },
                        value: password,
                        onChange: (password) => setPassword(password),
                    },
                ]}
                buttonValidationLabel={'Login'}
                onValidation={() =>
                    login({ dispatch: authenticationDispatch, email, password })
                }
            />
        </FullScreenDialog>
    )
}
