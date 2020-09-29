import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { NavBar, Router } from 'app/components'

export default function App(): ReactElement {
    return (
        <BrowserRouter>
            <NavBar />
            <Router />
        </BrowserRouter>
    )
}
