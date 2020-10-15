import { Route, Switch, Redirect } from 'react-router-dom'

import React, { lazy, Suspense } from 'react'

const MealPlan = lazy(() => import('./components/MealPlan/MealPlan'))
const Recipes = lazy(() => import('./components/Recipes/Recipes'))

export const Routes = Object.freeze({
    HOMEPAGE: '/',
    SHOPLIST: '/shoplist',
    MEAL_PLAN: '/meal-plan',
    RECIPES: '/recipes',
})

const Router = () => {
    return (
        <Suspense fallback={<div></div>}>
            <Switch>
                <Route path={Routes.MEAL_PLAN} render={() => <MealPlan />} />
                <Route path={Routes.RECIPES} render={() => <Recipes />} />
            </Switch>
        </Suspense>
    )
}

export default Router
