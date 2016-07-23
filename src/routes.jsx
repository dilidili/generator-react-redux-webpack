import AppContainer from './containers/AppContainer'
import HomeContainer from './containers/HomeContainer'
import HomeIndexContainer from './containers/HomeIndexContainer'
import TestContainer from './containers/TestContainer'
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {ReduxRouter} from 'redux-router'

const routes = <ReduxRouter>
	<Route path="/" component={AppContainer}>
		<Route component={HomeContainer}>
			<Route path="home">
				<IndexRoute component={HomeIndexContainer}></IndexRoute>
				<Route path="tweet/:tid" component={HomeIndexContainer}></Route>
			</Route>
			<Route path="notification"></Route>
			<Route path="message"></Route>
			<Route path="profile"></Route>
			<Route path="test"></Route>
		</Route>

	</Route>
</ReduxRouter>

export default routes
