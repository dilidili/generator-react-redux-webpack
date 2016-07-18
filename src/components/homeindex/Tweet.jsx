import React, {PropTypes} from 'react'
import moment from 'moment' 
import {Comment, Repost} from 'svg'
import likeImage from 'images/like.png'
import Group from 'react-canvas/Group'
import Text from 'react-canvas/Text'
import Image from 'react-canvas/Image'
import measureText from 'react-canvas/measureText'
import FontFace from 'react-canvas/FontFace'
import SpriteImage from 'react-canvas/SpriteImage'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'

const em = window.fontSize
const PADDING = 0.7 * em
const FONT_BOLD = FontFace('Helvetica, sans-serif', null, {weight: 500})
const FONT_NORMAL = FontFace('Helvetica, sans-serif', null, {weight: 300})

const Tweet = React.createClass({
	propTypes: {
		tweet: PropTypes.object.isRequired, // The content of this tweet.
		style: PropTypes.object.isRequired, // The total style of this component, generated from Tweet.getTweetStyle.
		push: PropTypes.func.isRequired, // Change the route
	},
	mixins: [PureRenderMixin],
	_touchClick: null, // For identifing the touch click and touch drag.
	statics: {
		getTweetStyle(tweet) {
			const isRetweeted = !!tweet.get('retweeted')
			const presentTweet = isRetweeted?tweet.get('retweeted'):tweet

			const containerStyle = getContainerStyle()
			const retweetLabelStyle = getRetweetLabelStyle(containerStyle, isRetweeted?`${String.fromCharCode("0xf152")} 来自${tweet.get('user')}的转发`:"")
			const avatarStyle = getAvatarStyle(retweetLabelStyle)
			const contentStyle = getContentStyle(containerStyle, avatarStyle)
			const userNameStyle = getUserNameStyle(contentStyle)
			const dateTimeStyle = getDateTimeStyle(contentStyle, presentTweet.get('timestamp'))
			const tweetStyle = getTweetStyle(userNameStyle, contentStyle, presentTweet.get('tweet'))

			// compute container height, coz the height of textarea element needs metric to know their height.
			contentStyle.height = tweetStyle.top + tweetStyle.height
			const likeStyle = getLikeStyle(contentStyle)
			containerStyle.height = likeStyle.top + likeStyle.height - 0.5*em

			return {
				containerStyle,
				contentStyle,
				avatarStyle,
				userNameStyle,
				dateTimeStyle,
				tweetStyle,
				likeStyle,
				retweetLabelStyle,
			}
		},
	},

	// Hanlder
	handleTouchStart(){
		this._touchClick = true
		this._touchStartTime = Date.now()
	},
	handleTouchMove(){
		this._touchClick = false
	},
	handleTouchEnd(){
		if (this._touchClick && (Date.now() - this._touchStartTime) < 150) {
			this._touchClick = false

			// Navigate to tweet detail page
			this.props.push(`/home/tweet/${this.props.tweet.get('id')}`)	
		}
	},

	// Render
	render: function(){
		const {
			style,
			tweet,
		} = this.props
		// When there is a Tweet that retweet another Tweet, show the one retweeted.
		const isRetweeted = !!tweet.get('retweeted')
		const presentTweet = isRetweeted?tweet.get('retweeted'):tweet
		return <Group style={style.containerStyle} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
        	<Text style={style.retweetLabelStyle}>{isRetweeted?`${String.fromCharCode("0xf152")} 来自${tweet.get('user')}的转发`:""}</Text>
	        <Image style={style.avatarStyle} src={presentTweet.get('avatar')} useBackingStore={true} fadeIn={true}/>
	        <Group style={style.contentStyle} useBackingStore={true}>
	        	<Text style={style.userNameStyle}>{presentTweet.get('user')}</Text>
	        	<Text style={style.dateTimeStyle}>{moment(presentTweet.get('timestamp')).fromNow()}</Text>
	        	<Text style={style.tweetStyle}>{presentTweet.get('tweet')}</Text>
	        </Group>
    		<SpriteImage style={style.likeStyle} src={likeImage} frameCount={29}></SpriteImage>	
		</Group>
	},
})

// Style getter
function getContainerStyle() {
	return {
		width: window.innerWidth,
		height: 0,
		borderColor: '#e0e0e0',
	}
}
function getContentStyle(containerStyle, avatarStyle) {
	const left = 1.6 * PADDING + avatarStyle.width
	return {
		top: 0,
		left: 0,
		translateX: left,
		translateY: avatarStyle.top,
		width: containerStyle.width - left - PADDING,
		height: 0,
	}
}
function getRetweetLabelStyle(containerStyle, label){
	const fontSize = 0.8*em
	const lineHeight = em
	const font = FontFace('rosettaicons', null, {weight: 300})
	const metrics = measureText(label, containerStyle.width, font, fontSize, lineHeight)

	return {
		top: PADDING,
		left: PADDING + 2.4*em,
		height: !!label?metrics.height:0,
		width: metrics.width,
		color: '#909498',
		fontFace: font,
		fontSize,
		lineHeight,
	}
}
function getAvatarStyle(getAvatarStyle) {
	return {
		borderRadius: 5,
		left: PADDING,
		top: PADDING + getAvatarStyle.top + getAvatarStyle.height,
		width: em * 3,
		height: em * 3,
		backgroundColor: "#eee",
	}
}
function getUserNameStyle(contentStyle) {
	return {
		top: 0,
		left: 0,
		height: 1.2 * em,
		width: contentStyle.width,
		fontSize: em,
		lineHeight: em,
		fontFace: FONT_BOLD,
	}
}
function getDateTimeStyle(contentStyle, timestamp) {
	const fontSize = 0.8*em
	const lineHeight = em
	const metrics = measureText(moment(timestamp).fromNow(), contentStyle.width, FONT_NORMAL, fontSize, lineHeight)

	return {
		top: 0.1*em,
		left: contentStyle.width - metrics.width,
		height: metrics.height,
		width: metrics.width,
		color: '#909498',
		fontFace: FONT_NORMAL,
		fontSize,
		lineHeight,
	}
}
function getTweetStyle(userNameStyle, contentStyle, tweet){
	const fontSize = em
	const lineHeight = 1.5*em
	const metrics = measureText(tweet, contentStyle.width, FONT_NORMAL, fontSize, lineHeight)

	return {
		top: userNameStyle.top+userNameStyle.height+PADDING,
		left: 0,
		height: metrics.height,
		width: metrics.width,
		fontFace: FONT_NORMAL,
		fontSize,
		lineHeight,
	}
}
function getLikeStyle(contentStyle){
	return {
		left: contentStyle.translateX - 1.5*em,
		top: contentStyle.translateY + contentStyle.height - 0.6*em,
		width: 4*em,
		height: 4*em,	
		zIndex: 2,
	}
}

export default Tweet 