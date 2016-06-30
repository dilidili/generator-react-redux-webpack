import AppContainer from './containers/AppContainer'
import HomeContainer from './containers/HomeContainer'
import HomeIndexContainer from './containers/HomeIndexContainer'
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {ReduxRouter} from 'redux-router'

const routes = <ReduxRouter>
	<Route path="/" component={AppContainer}>
		<Route path="home" component={HomeContainer}>
			<IndexRoute component={HomeIndexContainer}></IndexRoute>
		</Route>
		<Route path="notification" component={HomeContainer}></Route>
		<Route path="message" component={HomeContainer}></Route>
		<Route path="profile" component={HomeContainer}></Route>
	</Route>
</ReduxRouter>

export default routes
