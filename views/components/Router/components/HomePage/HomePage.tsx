import { AuthenticationProvider } from '~/client/providers/Authentication'
import { ReactElement } from 'react'
import { HomePageMain, HomePageHeader } from './components'

export default function HomePage(): ReactElement {
    return (
        <>
            <AuthenticationProvider>
                <HomePageHeader />
            </AuthenticationProvider>

            <HomePageMain />
        </>
    )
}
