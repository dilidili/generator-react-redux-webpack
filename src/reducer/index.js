import {combineReducers} from 'redux-immutablejs'
import {routerStateReducer} from 'redux-router'
import tweet from './tweet'

export const reducer = combineReducers({
	route: routerStateReducer,
	tweet,
})
