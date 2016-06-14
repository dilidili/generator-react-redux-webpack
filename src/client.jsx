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

// create the app store
const store = createMyStore(reducer)

ReactDOM.render(
	<Provider store={store}>
		{routes}	
	</Provider>,
	document.getElementById('react-root')
)