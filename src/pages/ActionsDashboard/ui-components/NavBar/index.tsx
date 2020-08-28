import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from 'Router'
import Button from '@ui-components/atoms/Button'

interface Props {
    labels?: {
        mealPlanButton?: string
        actionsButton?: string
    }
}

export default function NavBar({
    labels: {
        mealPlanButton: mealPlanButtonLabel = 'Menu',
        actionsButton: actionsButtonLabel = 'Cook & Plan',
    } = {},
}: Props): ReactElement {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to={Routes.ACTIONS}>
                <Button noBorders>{actionsButtonLabel}</Button>
            </Link>

            <Link to={Routes.ROOT}>
                <Button noBorders>{mealPlanButtonLabel}</Button>
            </Link>
        </div>
    )
}
