import { Route, Switch } from 'react-router-dom'

import React from 'react'
import DailyMenu from 'pages/DailyMenu'
import ActionsDashboard from 'pages/ActionsDashboard'

export const Routes = Object.freeze({
    ROOT: '/',
    ACTIONS: '/actions',
})

const Router = () => {
    return (
        <>
            <Switch>
                <Route exact path={Routes.ROOT} render={() => <DailyMenu />} />

                <Route
                    path={Routes.ACTIONS}
                    render={() => <ActionsDashboard />}
                />
            </Switch>
        </>
    )
}

export default Router
