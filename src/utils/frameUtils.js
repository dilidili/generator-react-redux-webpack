import ReactCanvas from 'react-canvas'
import _ from 'underscore'
const measureText = ReactCanvas.measureText

export function getLeftAndWidth(frame) {
	return frame.left + frame.width
}
export function getTopAndHeight(frame) {
	return frame.top + frame.height
}
export function measureTextFrame(text, frame) {
	return _.extend(frame, {height:measureText(text, frame.width, frame.fontFace, frame.fontSize, frame.lineHeight).height})
}