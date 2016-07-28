import {Map, List} from 'immutable'
import {QUERY_TOKEN} from '../actions/user'
import config from '../config'

const initialState = Map({
	token: config.token || localStorage.getItem('token'),
})

export default (state = initialState, action) => {
	switch (action.type) {
		case QUERY_TOKEN[1]:
			return state
		default:
			return state
	}
}