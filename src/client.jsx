// initialize some necessary constants for react-canvas layout
window.fontSize = window.innerHeight > 570 ? (window.innerHeight < 670 ? 16 : 18) : 13
document.getElementById('react-root').setAttribute("style", `font-size: ${window.fontSize}px`);

import 'babel-polyfill'
import 'common.scss' 
import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes' 
import {createMyStore} from './store'
import {reducer} from './reducer'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import i18n from 'i18n'
i18n()

const store = createMyStore(reducer)

ReactDOM.render(
	<Provider store={store}>
		{routes}	
	</Provider>,
	document.getElementById('react-root')
)