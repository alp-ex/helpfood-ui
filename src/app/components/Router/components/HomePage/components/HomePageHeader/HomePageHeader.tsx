import { ReactElement, useState } from 'react'
import {
    AngularBackground,
    AppLogo,
    ButtonIcon,
    IconWrapper,
} from 'ui-components/atoms'
import { FaUserAlt as UserIcon } from 'react-icons/fa'
import { EditUserForm, LoginForm } from './components'
import { useAuthentication } from 'providers/Authentication'

export default function HomePageHeader(): ReactElement {
    const [isEditUserFormVisible, setIsEditUserFormVisible] = useState(false)
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false)

    const {
        state: { isUserAuthenticated },
    } = useAuthentication()

    return (
        <AngularBackground bgcolorOption="light">
            <AppLogo appName={'Helpfood'} />

            <ButtonIcon
                onClick={() => {
                    if (isUserAuthenticated) {
                        setIsEditUserFormVisible(true)
                    } else {
                        setIsLoginFormVisible(true)
                    }
                }}
            >
                <IconWrapper colorOption="main">
                    <UserIcon />
                </IconWrapper>
            </ButtonIcon>

            {isEditUserFormVisible ? (
                <EditUserForm
                    onClose={() => {
                        setIsEditUserFormVisible(false)
                    }}
                />
            ) : null}

            {isLoginFormVisible ? (
                <LoginForm
                    onClose={() => {
                        setIsLoginFormVisible(false)
                    }}
                />
            ) : null}
        </AngularBackground>
    )
}
