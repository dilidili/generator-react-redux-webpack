export const VIEW_IMAGE = 'VIEW_IMAGE'

export function viewImage(data) {
	return (dispatch) => {
		dispatch({
			type: VIEW_IMAGE,
			payload: data,
		})
	}
}