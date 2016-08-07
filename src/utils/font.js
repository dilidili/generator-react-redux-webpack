import FontFace from 'react-canvas/FontFace'
import measureText from 'react-canvas/measureText'

const em = window.fontSize
const FONT_BOLD = FontFace('Helvetica, sans-serif', null, {weight: 500})
const FONT_NORMAL = FontFace('Helvetica, sans-serif', null, {weight: 300})

const measure = function(label, width, font) {
	return measureText(label, width, font.fontFace, font.fontSize, font.lineHeight)
}
export {measure as measureText}

export const NORMAL_BOLD_FONT = {
	fontFace: FONT_BOLD,
	lineHeight: 0.9 * em,
	height: 0.9 * em,
	fontSize: 0.9 * em,
}
export const NORMAL_NORMAL_FONT = {
	fontFace: FONT_NORMAL,
	lineHeight: 0.9 * em,
	height: 0.9 * em,
	fontSize: 0.9 * em,
}