import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from 'Router'
import Button from '@ui-components/atoms/Button'

interface Props {
    labels?: {
        mealPlanButton?: string
        cookButton?: string
    }
}

export default function RecipeNavBar({
    labels: {
        mealPlanButton: mealPlanButtonLabel = 'Menu',
        cookButton: cookButtonLabel = 'Cook',
    } = {},
}: Props): ReactElement {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to={Routes.COOK}>
                <Button noBorders>{cookButtonLabel}</Button>
            </Link>

            <Link to={Routes.ROOT}>
                <Button noBorders>{mealPlanButtonLabel}</Button>
            </Link>
        </div>
    )
}
