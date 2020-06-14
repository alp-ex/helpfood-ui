import { Route, Switch, Redirect } from 'react-router-dom'

import React from 'react'
import Recipes from './pages/Recipes'
import ShopList from './pages/ShopList'

const Router = () => {
    return (
        <>
            <Redirect exact from="/" to="/" />

            <Switch>
                {/* <Route
                    exact
                    path="/schedule"
                    render={() => (
                        <MealPlanProvider>
                            <MealPlan />
                        </MealPlanProvider>
                    )}
                /> */}
                <Route path="/recipes" component={Recipes} />
                <Route path="/shoplist" component={ShopList} />
            </Switch>
        </>
    )
}

export default Router
