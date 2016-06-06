import {fromJS} from 'immutable'
import {FETCH_WB_RECEIVED} from '../actions/wb'

const initialState = fromJS({
    list: [],
})

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WB_RECEIVED:
            return state.set('list', fromJS(action.payload))
        default:
            return state
    }
}
