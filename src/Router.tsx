import { Route, Switch, Redirect } from 'react-router-dom'

import React from 'react'
import MealPlan from 'pages/MealPlan'
import Recipes from 'pages/Recipes'

export const Routes = Object.freeze({
    ROOT: '/',
    MEAL_PLAN: '/meal-plan',
    RECIPES: '/recipes',
})

const Router = () => {
    return (
        <>
            <Switch>
                <Redirect exact from={Routes.ROOT} to={Routes.RECIPES} />

                <Route path={Routes.MEAL_PLAN} render={() => <MealPlan />} />
                <Route path={Routes.RECIPES} render={() => <Recipes />} />
            </Switch>
        </>
    )
}

export default Router
