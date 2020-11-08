import { FoodNewsProvider } from 'providers/FoodNews'
import React, { ReactElement } from 'react'
import {
    AngularBackground,
    AppLogo,
    ContentBackground,
} from 'ui-components/atoms'
import FoodNewsList from './components/FoodNewsList/FoodNewsList'

export default function HomePage(): ReactElement {
    return (
        <>
            <AngularBackground bgcolorOption="light">
                <AppLogo appName={'Helpfood'} />

                {/* <ButtonAvatar avatar={user.avatar} /> */}
            </AngularBackground>

            <ContentBackground>
                <FoodNewsProvider>
                    <FoodNewsList />
                </FoodNewsProvider>
            </ContentBackground>
        </>
    )
}
