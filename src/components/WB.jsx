import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ReactCanvas from 'react-canvas'
import _ from 'underscore'
import {FONT0, FONT1} from 'styles'
import {getLeftAndWidth, getTopAndHeight, measureTextFrame} from 'frameUtils'
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
const SOURCE_REGEX = /<.*>(.*)<\/.*>/
const TITLE_REGEX = /[\u4e00-\u9fa5_@a-zA-Z0-9]+/g

const WB = React.createClass({
	propTypes: {
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		wb: React.PropTypes.object.isRequired,
		scrollTop: React.PropTypes.number.isRequired
	},
	componentWillMount: function() {
		const maxWidth = this.props.width - 2 * CONTENT_INSET

		// Pre-compute style
		this.containerStyle = {
			top: 0,
			left: 0,
			width: this.props.width,
			height: this.props.height,
		}
		this.imageStyle = {
			top: 0,
			left: 0,
			width: this.props.width,
			height: this.props.height * 0.46,
			backgroundColor: '#eee',
			zIndex: IMAGE_LAYER_INDEX,
		}
		this.textGroupStyle = {
			top: this.imageStyle.height,
			left: 0,
			width: this.props.width,
			height: this.props.height - this.imageStyle.height,
			zIndex: TEXT_LAYER_INDEX,
		}
		this.sourceStyle = _.extend({
			top: this.textGroupStyle.top + CONTENT_INSET,
			left: CONTENT_INSET,
			width: this.props.width - 2 * CONTENT_INSET,
		}, FONT0)
		this.profileGroupStyle = {
			top: this.sourceStyle.top + this.sourceStyle.height + 7,
			left: CONTENT_INSET,
			width: this.props.width - 2 * CONTENT_INSET,
			height: this.props.height * 0.067,
		}
		this.profileAvatarStyle = {
			top: this.profileGroupStyle.top,
			left: CONTENT_INSET,
			width: this.profileGroupStyle.height,
			height: this.profileGroupStyle.height,
			borderRadius: this.profileGroupStyle.height / 2,
			backgroundColor: '#eee',
		}
		this.profileNameStyle = _.extend({
			top: this.profileGroupStyle.top + this.profileGroupStyle.height * 0.15,
			left: getLeftAndWidth(this.profileAvatarStyle) + 6,
			width: this.props.width / 2,
			height: this.profileGroupStyle.height * 0.4,
		}, FONT1)
		this.profileBioStyle = _.extend({
			top: getTopAndHeight(this.profileNameStyle) + this.profileGroupStyle.height * 0.1,
			left: this.profileNameStyle.left,
			width: this.profileGroupStyle.width - this.profileAvatarStyle.width - 6,
			height: this.profileNameStyle.height,
		}, FONT0)
		this.titleStyle = measureTextFrame(this.getTitle(), {
			top: getTopAndHeight(this.profileGroupStyle) + CONTENT_INSET,
			left: CONTENT_INSET,
			width: this.props.width - 2 * CONTENT_INSET,
			fontSize: 22,
			lineHeight: 30,
			fontFace: FontFace('Avenir Next Condensed, Helvetica, sans-serif', null, {
				weight: 500
			})
		})
		this.excerptStyle = measureTextFrame(this.getExcerpt(), {
			left: CONTENT_INSET,
			width: this.props.width - 2 * CONTENT_INSET,
			top: getTopAndHeight(this.titleStyle)+8,
			fontFace: FontFace('Georgia, serif'),
			fontSize: 13,
			lineHeight: 20,
		})
	},

	// render
	render: function() {
		return (
			<Group style={this.containerStyle}>
				<Image style={this.imageStyle} src={this.props.wb.bmiddle_pic || ""} fadeIn={true} useBackingStore={true}/>
				<Group style={this.getTextGroupStyle()} useBackingStore={true}>
					<Text style={this.sourceStyle}>{`来自 ${this.getSource()}`}</Text>
					{this.renderProfile()}
					<Text style={this.titleStyle}>{this.getTitle()}</Text>
					<Text style={this.excerptStyle}>{this.getExcerpt()}</Text>
				</Group>
			</Group>
		)
	},
	renderProfile: function(){
		return (
			<Group style={this.profileGroupStyle}>
				<Image style={this.profileAvatarStyle} src={this.props.wb.user.profile_image_url || ""} fadeIn={true}/>
				<Text style={this.profileNameStyle}>{this.props.wb.user.name}</Text>
				<Text style={this.profileBioStyle}>{this.props.wb.user.description}</Text>
			</Group>
		)
	},
	getTitle(){
		const title = this.props.wb.text.match(TITLE_REGEX)
		return title ? title[0] : null
	},
	getSource(){
		const source = SOURCE_REGEX.exec(this.props.wb.source)
		return source? source[1]:""
	},
	getExcerpt: function() {
		return this.props.wb.text || ""
	},
	getTextGroupStyle: function() {
		// change alpha and translateY with alteration of scrollTop
		const alphaMultiplier = (this.props.scrollTop <= 0) ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER : TEXT_ALPHA_SPEED_IN_MULTIPLIER
		let alpha = 1 - (this.props.scrollTop / this.props.height) * alphaMultiplier
		alpha = Math.min(Math.max(alpha, 0), 1)
		const translateY = -this.props.scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER

		return _.extend({
			alpha: alpha,
			translateY: translateY,
		}, this.textGroupStyle)
	}

})

export default WB