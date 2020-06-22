import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'Router'

export default function App(): ReactElement {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}
