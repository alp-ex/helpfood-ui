import React, { ReactElement } from 'react'

import NavBar from './ui-components/NavBar'
import ActionsList from './ui-components/ActionsList'

interface Props {}

export default function ActionsDashboard({}: Props): ReactElement {
    return (
        <>
            <NavBar />
            <ActionsList />
        </>
    )
}
