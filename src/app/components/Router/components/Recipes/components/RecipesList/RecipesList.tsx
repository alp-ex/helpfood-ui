import React, { ReactElement, Fragment } from 'react'
import { Label } from '@ui-components/atoms'

interface Props {
    recipes: ReadonlyArray<{ name: string }>
}

export default function RecipesList({ recipes }: Props): ReactElement {
    return (
        <ul>
            {recipes.map(({ name }) => (
                <Fragment key={name}>
                    <Label>{name}</Label>
                </Fragment>
            ))}
        </ul>
    )
}
