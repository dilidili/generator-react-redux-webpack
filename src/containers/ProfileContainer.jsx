import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './ProfileContainer.scss'
import Surface from 'react-canvas/Surface' 
import Gradient from 'react-canvas/Gradient'
import Group from 'react-canvas/Group'
import Text from 'react-canvas/Text'
import Image from 'react-canvas/Image'
import FontFace from 'react-canvas/FontFace'
import Scroller from 'Scroller'

const em = window.fontSize
const FULL_HEIGHT = window.innerHeight * 1.3
const GRADIENT_OFFSET = 3.4 * em
const PADDING = em
const AVATAR_SCALE = 1.2 * em
const FONT_BOLD = FontFace('Helvetica, sans-serif', null, {weight: 500})
const FONT_NORMAL = FontFace('Helvetica, sans-serif', null, {weight: 300})
const FONT_ICON = FontFace('rosettaicons', null, {weight: 300})

const ProfileComponent = React.createClass({
	componentWillMount(){
		this._canvasFrame = {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		}
		this.nameStyle = {
			top: 3.3 * em,
			left: PADDING,
			height: 1.2 * em,
			width: this._canvasFrame.width,
			fontFace: FONT_BOLD,
			lineHeight: 1.2 * em,
			fontSize: 1.1 * em,
		}
		this.descriptionStyle = {
			top: this.nameStyle.top + this.nameStyle.height + 0.3 * em,
			left: PADDING,
			height: 0.8 * em,
			width: this._canvasFrame.width,
			fontFace: FONT_NORMAL,	
			lineHeight: 0.8 * em,
			fontSize: 0.8 * em,
			color: "#95a3b1",
		}
		this.locationStyle = {
			top: this.descriptionStyle.top + this.descriptionStyle.height + em,
			left: PADDING,
			height: 0.9 * em,
			width: this._canvasFrame.width,
			fontFace: FONT_ICON,	
			lineHeight: 0.9 * em,
			fontSize: 0.9 * em,
			color: "#95a3b1",
		}

		this.createScroller()	
	},
	getInitialState() {
		return {
			scrollTop: 0,
		}
	},

	// Handler
	handleScroll(left, top){
		this.setState({
			scrollTop: top,
		})
	},
	handleTouchStart: function(e) {
		if (this.scroller) {
			this.scroller.doTouchStart(e.touches, e.timeStamp)
		}
	},
	handleTouchMove: function(e) {
		if (this.scroller) {
			this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale)
		}
	},
	handleTouchEnd: function(e) {
		if (this.scroller) {
			this.scroller.doTouchEnd(e.timeStamp)
		}
	},

	// Render
	renderHeader(){
		/* Gradient area on the top */
		return (
			<Gradient style={this.getGradientStyle()}
				colorStops={[
					{color: "#2a6488", position: 0},	
					{color: "#3881b2", position: 1},	
				]}
			>
			</Gradient>
		)
	},
	renderMainContent(){
		const {
			user,
		} = this.props
		// void useless render frame
		if (!user.get('id')) {
			return null
		}

		return (
			<Group style={this.getMainContentStyle()}>
				{/* Avatar row */}	
				<Image style={this.getAvatarStyle()} src={user.get('avatar_large')} fadeIn={true}></Image>

				<Group useBackingStore={true}>
					<Text style={this.nameStyle}>{user.get('name')}</Text>	
					<Text style={this.descriptionStyle}>{"@"+user.get('description')}</Text>
					<Text style={this.locationStyle}>{"\uF031 " + user.get('location')}</Text>
				</Group>
			</Group>
		)
	},
	render: function() {
		return <div className={styles.container}>
			<Surface {...this._canvasFrame}>
				<Group style={this._canvasFrame} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} onTouchCancel={this.handleTouchCancel}>
					{this.renderHeader()}					
					{this.renderMainContent()}
				</Group>
			</Surface>
		</div>
	},

	createScroller() {
		var options = {
			scrollingX: false,
			scrollingY: true,
			bouncing: true,
			decelerationRate: 0.95,
			penetrationAcceleration: 0.08,
		}
		this.scroller = new Scroller(this.handleScroll, options)
		this.scroller.setDimensions(window.innerWidth, window.innerHeight, window.innerWidth, FULL_HEIGHT)
	},

	// Style getter
	getGradientStyle(){
		const scrollTop = this.state.scrollTop

		return {
			top: 0,
			left: 0,
			width: this._canvasFrame.width,
			height: this._canvasFrame.height * 0.18 - Math.min(scrollTop, GRADIENT_OFFSET) 
		}
	},
	getMainContentStyle(){
		const gradientStyle = this.getGradientStyle()	
		return {
			top: 0,
			left: 0,
			translateY: gradientStyle.top + gradientStyle.height,
			height: this._canvasFrame.height - gradientStyle.top - gradientStyle.height,
			width: this._canvasFrame.width,
		}
	},
	getAvatarStyle() {
		const scrollTop = Math.max(this.state.scrollTop, 0)

		return {
			top: Math.min(-1.7 * em + scrollTop * 1.7 * em / GRADIENT_OFFSET, 0),
			left: Math.min(PADDING + AVATAR_SCALE / 2, PADDING + AVATAR_SCALE * scrollTop / GRADIENT_OFFSET / 2),
			width: Math.max(4.3 * em - AVATAR_SCALE, 4.3 * em - AVATAR_SCALE * scrollTop / GRADIENT_OFFSET),
			height: Math.max(4.3 * em - AVATAR_SCALE, 4.3 * em - AVATAR_SCALE * scrollTop / GRADIENT_OFFSET),
			borderRadius: 5,
		}
	},
})

function mapStateToProps(state) {
	return {
		user: state.getIn(['user', 'userInfo']),
	}
}
function mapDispatchToProps(dispatch) {
	return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)