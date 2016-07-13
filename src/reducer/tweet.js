import {Map} from 'immutable'
import {LOAD_TWEET} from '../actions/tweet'

const initialState = Map({
    list: [],
})

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TWEET[1]:
        	if (action.response.status === 200) {
	            return state.set('list', action.response.data.statuses)
        	}
        	return state
        default:
            return state
    }
}
