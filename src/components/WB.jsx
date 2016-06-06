import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ReactCanvas from 'react-canvas'
const Group = ReactCanvas.Group
const Image = ReactCanvas.Image
const Text = ReactCanvas.Text
const FontFace = ReactCanvas.FontFace
const measureText = ReactCanvas.measureText

const CONTENT_INSET = 14
const TEXT_SCROLL_SPEED_MULTIPLIER = 0.6
const TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.25
const TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6
const IMAGE_LAYER_INDEX = 2
const TEXT_LAYER_INDEX = 1

const WB = React.createClass({
	propTypes: {
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		wb: React.PropTypes.object.isRequired,
		scrollTop: React.PropTypes.number.isRequired
	},
	componentWillMount: function() {
		// Pre-compute headline/excerpt text dimensions.
		const wb = this.props.wb
		const maxWidth = this.props.width - 2 * CONTENT_INSET
		const titleStyle = this.getTitleStyle()
		const excerptStyle = this.getExcerptStyle()
		this.titleMetrics = measureText(this.getTitle(), maxWidth, titleStyle.fontFace, titleStyle.fontSize, titleStyle.lineHeight)
		this.excerptMetrics = measureText(wb.text, maxWidth, excerptStyle.fontFace, excerptStyle.fontSize, excerptStyle.lineHeight)
	},

	// render
	render: function() {
		const groupStyle = this.getGroupStyle()
		const imageStyle = this.getImageStyle()
		let titleStyle = this.getTitleStyle()
		let excerptStyle = this.getExcerptStyle()

		// Layout title and excerpt below image.
		titleStyle.height = this.titleMetrics.height
		excerptStyle.top = titleStyle.top + titleStyle.height + CONTENT_INSET
		excerptStyle.height = this.props.height - excerptStyle.top - CONTENT_INSET

		return (
			<Group style={groupStyle}>
				<Image style={imageStyle} src={this.props.wb.bmiddle_pic || ""} fadeIn={true} useBackingStore={true} />
				<Group style={this.getTextGroupStyle()} useBackingStore={true}>
					<Text style={titleStyle}>{this.getTitle()}</Text>
					<Text style={excerptStyle}>{this.props.wb.text}</Text>
				</Group>
			</Group>
		)
	},

	// getter
	getTitle(){
		const title = this.props.wb.text.match(/[\u4e00-\u9fa5_@a-zA-Z0-9]+/g)
		return title ? title[0] : null
	},
	getGroupStyle: function() {
		return {
			top: 0,
			left: 0,
			width: this.props.width,
			height: this.props.height,
		}
	},
	getImageHeight: function() {
		return Math.round(this.props.height * 0.5)
	},
	getImageStyle: function() {
		return {
			top: 0,
			left: 0,
			width: this.props.width,
			height: this.getImageHeight(),
			backgroundColor: '#eee',
			zIndex: IMAGE_LAYER_INDEX
		}
	},
	getTitleStyle: function() {
		return {
			top: this.getImageHeight() + CONTENT_INSET,
			left: CONTENT_INSET,
			width: this.props.width - 2 * CONTENT_INSET,
			fontSize: 22,
			lineHeight: 30,
			fontFace: FontFace('Avenir Next Condensed, Helvetica, sans-serif', null, {
				weight: 500
			})
		}
	},
	getExcerptStyle: function() {
		return {
			left: CONTENT_INSET,
			width: this.props.width - 2 * CONTENT_INSET,
			fontFace: FontFace('Georgia, serif'),
			fontSize: 15,
			lineHeight: 23
		}
	},
	getTextGroupStyle: function() {
		const imageHeight = this.getImageHeight()
		const alphaMultiplier = (this.props.scrollTop <= 0) ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER : TEXT_ALPHA_SPEED_IN_MULTIPLIER
		let alpha = 1 - (this.props.scrollTop / this.props.height) * alphaMultiplier
		alpha = Math.min(Math.max(alpha, 0), 1)
		const translateY = -this.props.scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER

		return {
			width: this.props.width,
			height: this.props.height - imageHeight,
			top: imageHeight,
			left: 0,
			alpha: alpha,
			translateY: translateY,
			zIndex: TEXT_LAYER_INDEX,
		}
	}

})

export default WB