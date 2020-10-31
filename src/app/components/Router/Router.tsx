import { Route, Switch } from 'react-router-dom'

import { lazy, ReactElement, Suspense } from 'react'

const MealPlan = lazy(() => import('./components/MealPlan/MealPlan'))
// const Recipes = lazy(() => import('./components/Recipes/Recipes'))

export const Routes = Object.freeze({
    HOMEPAGE: '/',
    SHOPLIST: '/shoplist',
    MEAL_PLAN: '/meal-plan',
    RECIPES: '/recipes',
})

const Router = (): ReactElement => {
    return (
        <Suspense fallback={<div></div>}>
            <Switch>
                <Route path={Routes.MEAL_PLAN} render={() => <MealPlan />} />
                <Route
                    path={Routes.RECIPES}
                    render={() => <span>recipes</span>}
                />
                {/* <Route path={Routes.RECIPES} render={() => <Recipes />} /> */}
            </Switch>
        </Suspense>
    )
}

export default Router
