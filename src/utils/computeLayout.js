import computeLayout from 'css-layout'
import _ from 'underscore'

function styleGetter(style) {
	return (nameArray) => {
		let currentStyle = style
		let out = false

		_.each(nameArray, (name) => {
			if (out) {
				return
			}

			const targetIndex = currentStyle.children && _.findIndex(currentStyle.children, child => child.name === name)
			if (targetIndex >= 0) {
				currentStyle = currentStyle.children[targetIndex]
				return
			} else {
				out = true
			}
		})

		return _.extend({}, currentStyle.layout, currentStyle.attachStyle)
	}
}

export default function (style){
	computeLayout(style)
	style.getStyle = styleGetter(style)

	return style
}