import { FoodNewsProvider } from '~/services/FoodNews'
import React, { ReactElement } from 'react'
import { ContentBackground } from '~/ui-components/atoms'
import FoodNewsList from './components/FoodNewsList/FoodNewsList'

export default function HomePageMain(): ReactElement {
    return (
        <ContentBackground>
            <FoodNewsProvider>
                <FoodNewsList />
            </FoodNewsProvider>
        </ContentBackground>
    )
}
