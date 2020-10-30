import { ReactElement, useEffect } from 'react';

import { CreateRecipeSection, RecipesList } from './components'
import { useDish, DishesProvider, getRecipes } from 'api/providers/Dishes'

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

export default function Recipes({}: Props): ReactElement {
    return (
        <>
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
