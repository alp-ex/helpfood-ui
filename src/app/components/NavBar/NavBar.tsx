import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Routes } from 'app/components/Router/Router'
import { Label, Button } from '@ui-components/atoms'

interface Props {
    labels?: {
        appName?: string
        mealPlanButton?: string
        cookButton?: string
    }
}

export default function NavBar({
    labels: {
        mealPlanButton: mealPlanButtonLabel = 'Menu',
        cookButton: cookButtonLabel = 'Recipes',
        appName: appNameLabel = 'HelpFood',
    } = {},
}: Props): ReactElement {
    const { pathname } = useLocation()

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Label>{appNameLabel}</Label>

            {pathname !== Routes.RECIPES ? (
                <Link to={Routes.RECIPES}>
                    <Button noBorders>{cookButtonLabel}</Button>
                </Link>
            ) : null}

            {pathname !== Routes.MEAL_PLAN ? (
                <Link to={Routes.MEAL_PLAN}>
                    <Button noBorders>{mealPlanButtonLabel}</Button>
                </Link>
            ) : null}
        </div>
    )
}
