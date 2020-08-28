import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'Router'
import NavBar from 'ui-components/NavBar'

export default function App(): ReactElement {
    return (
        <BrowserRouter>
            <NavBar />
            <Router />
        </BrowserRouter>
    )
}
