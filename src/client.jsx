require('auth').initialAuth()

import 'common.scss' 
import React from 'react'
import ReactDOM from 'react-dom'
import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import LoadingPage from './components/LoadingPage' 

const rootContainerId = 'react-root'
// Loading Page
ReactDOM.render(<LoadingPage></LoadingPage>, document.getElementById(rootContainerId))

// Loading all other lib resouces
require.ensure([], ()=>{
	require('babel-polyfill')
	const reducer = require('./reducer').reducer	
	const createMyStore = require('./store').createMyStore	
	const routes = require('./routes').default
	const Provider = require('react-redux').Provider
	require('i18n').default()
	require('touch-emulator')()

	// Replace the LoadingPage with the whole web app
	ReactDOM.render(<LoadingPage isLoaded={true} loadedCallback={()=>{
		const store = createMyStore(reducer)

		ReactDOM.render(
			<Provider store={store}>
				{routes}
			</Provider>,
			document.getElementById(rootContainerId)
		)	
	}}></LoadingPage>, document.getElementById(rootContainerId))
})