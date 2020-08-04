import { Route, Switch, Redirect } from 'react-router-dom'

import React from 'react'
import DailyMenu from 'pages/DailyMenu'
import ActionsDashboard from 'pages/ActionsDashboard'
import { DishesProvider } from 'api/dishes/context'
import { DishPlanProvider } from 'api/dishPlan/context'
import { CalendarProvider } from 'api/calendar/context'

export const Routes = Object.freeze({
    ROOT: '/',
    ACTIONS: '/actions',
})

const Router = () => {
    return (
        <>
            <Switch>
                <Route
                    exact
                    path={Routes.ROOT}
                    render={() => (
                        <CalendarProvider>
                            <DishesProvider>
                                <DishPlanProvider>
                                    <DailyMenu />
                                </DishPlanProvider>
                            </DishesProvider>
                        </CalendarProvider>
                    )}
                />
                <Route
                    path={Routes.ACTIONS}
                    render={() => (
                        <CalendarProvider>
                            <DishesProvider>
                                <DishPlanProvider>
                                    <ActionsDashboard />
                                </DishPlanProvider>
                            </DishesProvider>
                        </CalendarProvider>
                    )}
                />
            </Switch>
        </>
    )
}

export default Router
