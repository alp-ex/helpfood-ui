import { Routes } from 'app/components/Router/Router'
import React, { ReactElement, useState } from 'react'
import {
    AngularBackground,
    AppLogo,
    ButtonIcon,
    IconWrapper,
} from 'ui-components/atoms'
import { FaUserAlt as UserIcon } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { EditUserForm } from './components'

export default function HomePageHeader(): ReactElement {
    const [isEditUserFormVisible, setIsEditUserFormVisible] = useState(false)
    const history = useHistory()
    const {
        state: { isUserAuthenticated },
    } = useUser()

    return (
        <AngularBackground bgcolorOption="light">
            <AppLogo appName={'Helpfood'} />

            <ButtonIcon
                onClick={() => {
                    if (isUserAuthenticated) {
                        setIsEditUserFormVisible(true)
                    } else {
                        history.replace(Routes.LOGIN)
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
        </AngularBackground>
    )
}
