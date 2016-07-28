import {Map, List} from 'immutable'
import {QUERY_TOKEN} from '../actions/user'

const initialState = Map({
	token: localStorage.getItem('token'),
})

export default (state = initialState, action) => {
	switch (action.type) {
		case QUERY_TOKEN[1]:
			return state
		default:
			return state
	}
}