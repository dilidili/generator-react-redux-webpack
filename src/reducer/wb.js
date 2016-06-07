import {fromJS} from 'immutable'
import {LOAD_WB} from '../actions/wb'

const initialState = fromJS({
    list: [],
})

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WB[1]:
        	if (action.response.status === 200) {
	            return state.set('list', fromJS(action.response.data.statuses))
        	}
        default:
            return state
    }
}
