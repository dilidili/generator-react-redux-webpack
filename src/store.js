import thunkMiddleware from 'redux-thunk'
import {callAPIMiddleware} from './utils/middlewares'
import createLogger from 'redux-logger'
import {createHistory} from 'history'
import {createStore, applyMiddleware, compose,} from 'redux'
import {reduxReactRouter} from 'redux-router';
import config from './config'
import routes from './routes'

if (config.debug) {
	require('./utils/touch-emulator')
}

export const createMyStore = function(rootReducer) {
	// syn the react router with redux store 
	const reduxRouterEnhancer = reduxReactRouter({
		routes,
		createHistory,
		routerStateSelector: state => state.get('route'),
	})

	let middlewares = []
	middlewares.push(thunkMiddleware)
	middlewares.push(callAPIMiddleware)
	// middlewares for debug
	if (config.debug) {
		// middleware that logs the global state for debug
		const loggerMiddleware = createLogger({
			stateTransformer: (state) => {
				return state.toJS()
			},
		})
		middlewares.push(loggerMiddleware)
	}

	const createStoreWithMiddleware = compose(applyMiddleware(...middlewares), reduxRouterEnhancer)(createStore)
	const store = createStoreWithMiddleware(rootReducer)

	return store
}