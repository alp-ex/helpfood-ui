import App from './App'
import { render } from 'react-dom'
import React from 'react'
import './style/global.css'
import './style/reset.css'

const container = document.querySelector('#helpfood')
// container.setAttribute('type', "module")

render(<App />, container)
