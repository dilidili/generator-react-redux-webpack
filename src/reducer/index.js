import {combineReducers} from 'redux-immutablejs'
import {routerStateReducer} from 'redux-router'
import wb from './wb'

export const reducer = combineReducers({
	route: routerStateReducer,
	wb,
})
