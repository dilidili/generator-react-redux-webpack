import {Map, List} from 'immutable'
import {VIEW_IMAGE, CLOSE_IMAGE} from '../actions/homeindex'

const initialState = Map({
	imageViewerData: Map({
		frame: Map({}), // The frame from there the image viewer appears
		srcList: List([]), // Images ready for viewing
		defaultIndex: -1, // The entry of srcList
	}),
})

export default (state = initialState, action) => {
	switch (action.type) {
		case VIEW_IMAGE:
			return state.update('imageViewerData', v=>v.merge(action.payload))
		case CLOSE_IMAGE:
			return state.update('imageViewerData', v=>initialState.get('imageViewerData'))
		default:
			return state
	}
}