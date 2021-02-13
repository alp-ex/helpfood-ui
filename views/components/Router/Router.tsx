import { Route, Switch } from 'react-router-dom'

import { lazy, ReactElement, Suspense } from 'react'

const HomePage = lazy(() => import('./components/HomePage/HomePage'))
const MealPlan = lazy(() => import('./components/MealPlan/MealPlan'))
// const Recipes = lazy(() => import('./components/Recipes/Recipes'))

export const Routes = Object.freeze({
    HOMEPAGE: '/',
    SHOPLIST: '/shoplist',
    MEAL_PLAN: '/meal-plan',
    RECIPES: '/recipes',
    LOGIN: '/login',
})

const Router = (): ReactElement => {
    return (
        <Suspense fallback={<div></div>}>
            <Switch>
                <Route
                    exact
                    path={Routes.HOMEPAGE}
                    render={() => <HomePage />}
                />
                <Route path={Routes.MEAL_PLAN} render={() => <MealPlan />} />
                <Route path={Routes.LOGIN} render={() => <span>login</span>} />
                <Route
                    path={Routes.RECIPES}
                    render={() => <span>recipes</span>}
                />
            </Switch>
        </Suspense>
    )
}

export default Router
