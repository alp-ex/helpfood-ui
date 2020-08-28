import React, { ReactElement, useEffect } from 'react'

import NavBar from './ui-components/RecipeNavBar'
import CreateRecipeSection from './ui-components/CreateRecipeSection'
import RecipesList from './ui-components/RecipesList'
import { useDish, DishesProvider, getRecipes } from 'api/providers/Dish'

interface Props {}

const RecipesListContainer = ({ renderRecipesList }) => {
    const {
        state: { recipes },
        dispatch: dishesDispatch,
    } = useDish()

    useEffect(() => {
        getRecipes({ dispatch: dishesDispatch })
    }, [])

    return renderRecipesList({ recipes })
}

export default function Cook({}: Props): ReactElement {
    return (
        <>
            <NavBar />

            <DishesProvider>
                <CreateRecipeSection />
                <RecipesListContainer
                    renderRecipesList={({ recipes }) => (
                        <RecipesList recipes={recipes} />
                    )}
                />
            </DishesProvider>
        </>
    )
}
