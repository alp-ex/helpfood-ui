import React, { ReactElement } from 'react'
import CreateRecipe from './CreateRecipe'
import EditRecipe from './EditRecipe'
import EditMealPlan from './EditMealPlan'

interface Props {}

export default function ActionsList({}: Props): ReactElement {
    return (
        <>
            <CreateRecipe />
            {/* <EditRecipe /> */}
            {/* <EditMealPlan /> */}
        </>
    )
}
