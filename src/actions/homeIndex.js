export const VIEW_IMAGE = 'VIEW_IMAGE'
export const CLOSE_IMAGE = 'CLOSE_IMAGE'

export function viewImage(data) {
	return (dispatch) => {
		dispatch({
			type: VIEW_IMAGE,
			payload: data,
		})
	}
}

export function closeImage(data) {
	return (dispatch) => {
		dispatch({
			type: CLOSE_IMAGE,
		})
	}
}