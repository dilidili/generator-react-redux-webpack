import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './ProfileContainer.scss'
import Surface from 'react-canvas/Surface' 
import Gradient from 'react-canvas/Gradient'
import {measureText} from 'font'
import Group from 'react-canvas/Group'
import Text from 'react-canvas/Text'
import Image from 'react-canvas/Image'
import FontFace from 'react-canvas/FontFace'
import Scroller from 'Scroller'
import {NORMAL_BOLD_FONT, NORMAL_NORMAL_FONT, NORMAL_LARGE_FONT, NORMAL_VERY_LARGE_FONT} from 'font'
import _ from 'underscore'
import {VelocityComponent} from 'velocity-react'

const em = window.fontSize
const FULL_HEIGHT = window.innerHeight + 14 * em 
const GRADIENT_HEIGHT = window.innerHeight * 0.18
const GRADIENT_OFFSET = 3.4 * em
const PADDING = em
const AVATAR_SCALE = 1.2 * em
const FONT_BOLD = FontFace('Helvetica, sans-serif', null, {weight: 500})
const FONT_NORMAL = FontFace('Helvetica, sans-serif', null, {weight: 300})
const FONT_ICON = FontFace('rosettaicons', null, {weight: 300})
const TABS = ['TWEETS', 'MEDIA', 'LIKES']

const presentAnimation = {
	translateY: 0,
	translateX: 0,
	width: window.innerWidth,
}
const hideAnimation = {
	translateY: - 5 * em,
	translateX: 0.7 * em, 
	width: window.innerWidth - 1.4 * em,
}

const ProfileComponent = React.createClass({
	propTypes: {
		isPresent: PropTypes.bool.isRequired,
	},

	componentWillMount(){
		this._canvasFrame = {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
			style: {
				zIndex: 2,
				position: 'relative',
				backgroundColor: 'white',
			},
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
			height: 1 * em,
			width: this._canvasFrame.width,
			fontFace: FONT_NORMAL,	
			lineHeight: 0.8 * em,
			fontSize: 0.8 * em,
			color: "#95a3b1",
		}
		this.locationStyle = {
			top: this.descriptionStyle.top + this.descriptionStyle.height + em,
			left: PADDING,
			height: 1.1 * em,
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
			currentTab: TABS[0],
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
		const gradientStyle = this.getGradientStyle()
		const labelStyle = _.extend({
			width: this._canvasFrame.width,
			top: Math.max(gradientStyle.height + 3.3 * em + GRADIENT_OFFSET - this.state.scrollTop, (GRADIENT_HEIGHT - GRADIENT_OFFSET - NORMAL_VERY_LARGE_FONT.lineHeight)/2),
			left: 0,
			textAlign: 'center',
			color: '#ffffff',
			zIndex: this.state.scrollTop > GRADIENT_OFFSET ? 3 : 0,
		}, NORMAL_VERY_LARGE_FONT)

		/* Gradient area on the top */
		return (
			<Group style={gradientStyle}>
				<Gradient style={gradientStyle}
					colorStops={[
						{color: "#2a6488", position: 0},	
						{color: "#3881b2", position: 1},	
					]}
				>
				</Gradient>
				<Text style={labelStyle} useBackingStore={true}>XuMM_12</Text>
			</Group>
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

		const followingStyle = this.getFollowingStyle(user.get('friends_count'))
		const followerStyle = this.getFollowerStyle(user.get('followers_count'), followingStyle.label)
		const tabButtonsStyle = this.getTabButtonsStyle(followingStyle.count)
		const borderStyle = {
			top: tabButtonsStyle[0].group.top + tabButtonsStyle[0].group.height + 0.5 * em,
			left: 0,
			width: this._canvasFrame.width,
			height: 1,
			backgroundColor: "#cdcdcd",
		}

		return (
			<Group style={this.getMainContentStyle()}>
				{/* Avatar row */}	
				<Image useBackingStore={true} style={this.getAvatarStyle()} src={user.get('avatar_large')} fadeIn={true}></Image>

				{/* User information row */}
				<Text useBackingStore={true} style={this.nameStyle}>{user.get('name')}</Text>	
				<Text useBackingStore={true} style={this.descriptionStyle}>{"@"+user.get('description')}</Text>
				<Text useBackingStore={true} style={this.locationStyle}>{"\uF031 " + user.get('location')}</Text>

				{/* Follower and folloees */}
				<Text useBackingStore={true} style={followingStyle.count}>{""+user.get('friends_count')}</Text>
				<Text useBackingStore={true} style={followingStyle.label}>关注</Text>
				<Text useBackingStore={true} style={followerStyle.count}>{""+user.get('followers_count')}</Text>
				<Text useBackingStore={true} style={followerStyle.label}>粉丝</Text>

				{/* Tools box */}
				<Group style={tabButtonsStyle[0].group} onTouchStart={()=>{this.setState({currentTab:TABS[0]})}}>
					<Text useBackingStore={true} style={tabButtonsStyle[0].text}>微博</Text>	
				</Group>	
				<Group style={tabButtonsStyle[1].group} onTouchStart={()=>{this.setState({currentTab:TABS[1]})}}>
					<Text useBackingStore={true} style={tabButtonsStyle[1].text}>照片</Text>	
				</Group>	
				<Group style={tabButtonsStyle[2].group} onTouchStart={()=>{this.setState({currentTab:TABS[2]})}}>
					<Text useBackingStore={true} style={tabButtonsStyle[2].text}>赞</Text>	
				</Group>	

				{/* border */}
				<Group style={borderStyle}></Group>
			</Group>
		)
	},
	render: function() {
		return (
			<div className={styles.container}>
				<div className={styles.black}></div>
				<VelocityComponent animation={this.props.isPresent?presentAnimation:hideAnimation} duration={300}>
					<Surface {...this._canvasFrame}>
						<Group style={this._canvasFrame} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} onTouchCancel={this.handleTouchCancel}>
							{this.renderHeader()}					
							{this.renderMainContent()}
						</Group>
					</Surface>
				</VelocityComponent>
			</div>
		)
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
			height:  GRADIENT_HEIGHT - Math.min(scrollTop, GRADIENT_OFFSET),
			zIndex: 2,
		}
	},
	getMainContentStyle(){
		const gradientStyle = this.getGradientStyle()	
		return {
			top: 0,
			left: 0,
			translateY: GRADIENT_HEIGHT - this.state.scrollTop,
			height: 2 * this._canvasFrame.height,
			width: this._canvasFrame.width,
			zIndex: this.state.scrollTop > GRADIENT_OFFSET ? 1 : 2,
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
	getFollowingStyle(cnt) {
		const countMetrics = measureText(cnt, this._canvasFrame.width, NORMAL_BOLD_FONT)
		const labelMetrics = measureText('关注', this._canvasFrame.width, NORMAL_NORMAL_FONT)

		const count = _.extend({
			left: PADDING,
			width: countMetrics.width,
			top: this.locationStyle.top + this.locationStyle.height + em,
		}, NORMAL_BOLD_FONT)
		const label = _.extend({
			left: PADDING + countMetrics.width + 0.3 * em,
			width: labelMetrics.width,
			top: count.top,
			color: "#95a3b1",
		}, NORMAL_NORMAL_FONT)

		return {
			count,
			label,
		}
	},
	getFollowerStyle(cnt, prevStyle) {
		const countMetrics = measureText(cnt, this._canvasFrame.width, NORMAL_BOLD_FONT)
		const labelMetrics = measureText('粉丝', this._canvasFrame.width, NORMAL_NORMAL_FONT)

		const count = _.extend({
			left: prevStyle.left + prevStyle.width + 2 * em,
			width: countMetrics.width,
			top: this.locationStyle.top + this.locationStyle.height + em,
		}, NORMAL_BOLD_FONT)
		const label = _.extend({
			left: count.left + count.width + 0.3 * em,
			width: labelMetrics.width,
			top: count.top,
			color: "#95a3b1",
		}, NORMAL_NORMAL_FONT)

		return {
			count,
			label,
		}
	},
	getTabButtonsStyle(prevStyle){
		const perWidth = (this._canvasFrame.width - 2 * PADDING) / 3
		const blueColor = '#21a2eb'
		const whiteColor = '#ffffff'

		// Tweet button
		const tweetButtonStyle = {}
		tweetButtonStyle.group = {
			left: PADDING,
			width: perWidth,
			top: prevStyle.top + prevStyle.height + 1.7 * em,
			height: 2.2 * em,
			backgroundColor: this.state.currentTab === TABS[0] ? blueColor : whiteColor,
			borderWidth: 3,
			borderColor: blueColor,
			borderRadius: [5, 0, 0, 5],
		}
		tweetButtonStyle.text = _.extend({
			color: this.state.currentTab === TABS[0] ? whiteColor : blueColor,
			width: tweetButtonStyle.group.width,
			left: tweetButtonStyle.group.left,
			top: tweetButtonStyle.group.top + 0.45 * em,
			textAlign: 'center',
		}, NORMAL_LARGE_FONT)

		// Media button
		const mediaButtonStyle = {}
		mediaButtonStyle.group = {
			left: tweetButtonStyle.group.left + tweetButtonStyle.group.width,
			width: perWidth,
			top: tweetButtonStyle.group.top,
			height: tweetButtonStyle.group.height,
			backgroundColor: this.state.currentTab === TABS[1] ? blueColor : whiteColor,
			borderWidth: 3,
			borderColor: blueColor,
			borderRadius: 0,
		}
		mediaButtonStyle.text = _.extend({
			color: this.state.currentTab === TABS[1] ? whiteColor : blueColor,
			width: mediaButtonStyle.group.width,
			left: mediaButtonStyle.group.left,
			top: mediaButtonStyle.group.top + 0.45 * em,
			textAlign: 'center',
		}, NORMAL_LARGE_FONT)

		// Likes button
		const likeButtonStyle = {}
		likeButtonStyle.group = {
			left: mediaButtonStyle.group.left + mediaButtonStyle.group.width,
			width: perWidth,
			top: mediaButtonStyle.group.top,
			height: mediaButtonStyle.group.height,
			backgroundColor: this.state.currentTab === TABS[2] ? blueColor : whiteColor,
			borderWidth: 3,
			borderColor: blueColor,
			borderRadius: [0, 5, 5, 0],
		}
		likeButtonStyle.text = _.extend({
			color: this.state.currentTab === TABS[2] ? whiteColor : blueColor,
			width: likeButtonStyle.group.width,
			left: likeButtonStyle.group.left,
			top: likeButtonStyle.group.top + 0.45 * em,
			textAlign: 'center',
		}, NORMAL_LARGE_FONT)

		return [tweetButtonStyle, mediaButtonStyle, likeButtonStyle]
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