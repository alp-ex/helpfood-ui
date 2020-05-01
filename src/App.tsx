import { BrowserRouter } from 'react-router-dom'
import Nav from './components/Nav'
import React from 'react'
import Router from './Router'
import { getUserHue } from 'services/getUserInformations'

const App = () => (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
)

export default App
