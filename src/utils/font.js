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
	height: 1.1 * em,
	fontSize: 0.9 * em,
}
export const NORMAL_NORMAL_FONT = {
	fontFace: FONT_NORMAL,
	lineHeight: 0.9 * em,
	height: 1.1 * em,
	fontSize: 0.9 * em,
}
export const NORMAL_LARGE_FONT = {
	fontFace: FONT_NORMAL,
	lineHeight: 1 * em,
	height: 1.2 * em,
	fontSize: 1 * em,
}
export const NORMAL_VERY_LARGE_FONT = {
	fontFace: FONT_NORMAL,
	lineHeight: 1.2 * em,
	height: 1.4 * em,
	fontSize: 1.2 * em,
}