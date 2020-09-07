import { Route, Switch, Redirect } from 'react-router-dom'

import React, { lazy, Suspense } from 'react'

const MealPlan = lazy(() => import('../../pages/MealPlan/MealPlan'))
const Recipes = lazy(() => import('../../pages/Recipes/Recipes'))

export const Routes = Object.freeze({
    ROOT: '/',
    MEAL_PLAN: '/meal-plan',
    RECIPES: '/recipes',
})

const Router = () => {
    return (
        <Suspense fallback={<div></div>}>
            <Switch>
                <Redirect exact from={Routes.ROOT} to={Routes.RECIPES} />

                <Route path={Routes.MEAL_PLAN} render={() => <MealPlan />} />
                <Route path={Routes.RECIPES} render={() => <Recipes />} />
            </Switch>
        </Suspense>
    )
}

export default Router
