import {combineReducers} from 'redux-immutablejs'
import {routerStateReducer} from 'redux-router'
import tweet from './tweet'
import user from './user'

export const reducer = combineReducers({
	route: routerStateReducer,
	tweet,
	user,
})
