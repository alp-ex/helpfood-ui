import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'Router'

interface Props {}

export default function App({}: Props): ReactElement {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}
