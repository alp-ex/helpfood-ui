import { Route, Switch, Redirect } from 'react-router-dom'

import React from 'react'
import DishPlan from 'pages/DishPlan'
import { DishesProvider } from 'api/dishes/context'
import { DishPlanProvider } from 'api/dishPlan/context'

const Router = () => {
    return (
        <>
            <Redirect exact from="/" to="/" />

            <Switch>
                <Route
                    path="/"
                    render={() => (
                        <DishesProvider>
                            <DishPlanProvider>
                                <DishPlan />
                            </DishPlanProvider>
                        </DishesProvider>
                    )}
                />
            </Switch>
        </>
    )
}

export default Router
