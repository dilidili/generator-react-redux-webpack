import {Map, List, fromJS} from 'immutable'
import {QUERY_TOKEN, UPDATE_USER_INFO, UPDATE_TOKEN_INFO} from '../actions/user'
import config from '../config'

const initialState = fromJS({
	token: config.token || localStorage.getItem('token'),
	tokenInfo: {},	
	userInfo: {},	
})

export default (state = initialState, action) => {
	switch (action.type) {
		case QUERY_TOKEN[1]:
			return state
		case UPDATE_TOKEN_INFO:
			return state.set('tokenInfo', fromJS(action.payload))			
		case UPDATE_USER_INFO:
			return state.set('userInfo', fromJS(action.payload))			
		default:
			return state
	}
}