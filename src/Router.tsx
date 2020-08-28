import { Route, Switch } from 'react-router-dom'

import React from 'react'
import DailyMenu from 'pages/DailyMenu'
import Cook from 'pages/Cook'

export const Routes = Object.freeze({
    ROOT: '/',
    COOK: '/cook',
})

const Router = () => {
    return (
        <>
            <Switch>
                <Route exact path={Routes.ROOT} render={() => <DailyMenu />} />

                <Route path={Routes.COOK} render={() => <Cook />} />
            </Switch>
        </>
    )
}

export default Router
