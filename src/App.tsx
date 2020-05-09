import { BrowserRouter } from 'react-router-dom'
import Nav from './components/ui/Nav'
import React from 'react'
import Router from './Router'

const App = () => (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
)

export default App
