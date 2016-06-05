import AppContainer from './containers/AppContainer'
import HomeContainer from './containers/HomeContainer'
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {ReduxRouter} from 'redux-router'

const routes = <ReduxRouter>
	<Route path="/" component={AppContainer}>
		<IndexRoute component={HomeContainer}></IndexRoute>
	</Route>
</ReduxRouter>

export default routes
