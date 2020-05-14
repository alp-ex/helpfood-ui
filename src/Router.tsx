import { Route, Switch, Redirect } from 'react-router-dom'

// FIXME : add paths in tsconfig
import MealPlan from './pages/MealPlan'
import React from 'react'
import Recipes from './pages/Recipes'
import ShopList from './pages/ShopList'

const Router = () => {
    return (
        <>
            <Redirect exact from="/" to="/schedule" />

            <Switch>
                <Route exact path="/schedule" component={MealPlan} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/shoplist" component={ShopList} />
            </Switch>
        </>
    )
}

export default Router
