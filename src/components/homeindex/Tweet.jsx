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
import _ from 'underscore'

const em = window.fontSize
const PADDING = 0.7 * em
const FONT_BOLD = FontFace('Helvetica, sans-serif', null, {weight: 500})
const FONT_NORMAL = FontFace('Helvetica, sans-serif', null, {weight: 300})
const IMAGE_PADDING = 0.1 * em

const Tweet = React.createClass({
	propTypes: {
		index: PropTypes.number.isRequired,
		tweet: PropTypes.object.isRequired, // The content of this tweet.
		style: PropTypes.object.isRequired, // The total style of this component, generated from Tweet.getTweetStyle.
		handleClick: PropTypes.func.isRequired,
		handleClickIllustration: PropTypes.func.isRequired,
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
			const illustrationStyle = getIllustrationStyle(tweetStyle, contentStyle, presentTweet.get('illustrations'))

			// compute container height, coz the height of textarea element needs metric to know their height.
			contentStyle.height = illustrationStyle.top + illustrationStyle.height
			const likeStyle = getLikeStyle(contentStyle)
			containerStyle.height = likeStyle.top + likeStyle.height - 0.5*em

			return {
				containerStyle,
				contentStyle,
				avatarStyle,
				userNameStyle,
				dateTimeStyle,
				tweetStyle,
				illustrationStyle,
				likeStyle,
				retweetLabelStyle,
			}
		},
	},

	// Hanlder

	// Touch on tweet area
	handleTouchStart(evt){
		this._touchStartClientY = evt.touches[0].clientY
		this._touchStartTime = evt.timeStamp
		this._preventClickTweet = false
	},
	handleTouchEnd(evt) {
		const timeDelta = evt.timeStamp - this._touchStartTime
		if (timeDelta < 120 && this._touchStartClientY === evt.changedTouches[0].clientY) {
			!this._preventClickTweet && this.props.handleClick(this.props.tweet.get('id'))
		}
	},

	// Touch on illustrations area
	handleTouchImageStart(evt) {
		this._touchImageStartClientY = evt.touches[0].clientY
		this._touchImageStartTime = evt.timeStamp
	},
	handleTouchImageEnd(illStyle, illustrations, illustrationIndex, evt) {
		const timeDelta = evt.timeStamp - this._touchImageStartTime
		if (timeDelta < 120 && this._touchImageStartClientY === evt.changedTouches[0].clientY) {
			this._preventClickTweet = true

			const {
				contentStyle
			} = this.props.style

			this.props.handleClickIllustration && this.props.handleClickIllustration({
				top: contentStyle.translateY + illStyle.top,
				left: contentStyle.translateX + illStyle.left,
				width: illStyle.width,
				height: illStyle.height,
			}, this.props.index, illustrations, illustrationIndex)
		}
	},

	// Render
	renderIllustrations(illustrations){
		const illStyle = this.props.style.illustrationStyle

		switch(illustrations.length){
			case 2:
				return (
					<Group style={illStyle}>
						<Image style={illStyle.twoGrids[0]} src={illustrations[0].thumb} onTouchStart={this.handleTouchImageStart} onTouchEnd={this.handleTouchImageEnd.bind(this, illStyle.twoGrids[0], illustrations, 0)} fadeIn={false}></Image>	
						<Image style={illStyle.twoGrids[1]} src={illustrations[1].thumb} onTouchStart={this.handleTouchImageStart} onTouchEnd={this.handleTouchImageEnd.bind(this, illStyle.twoGrids[1], illustrations, 1)} fadeIn={false}></Image>	
					</Group>
				)
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
				return (
					<Group style={illStyle}>
						<Image style={illStyle.fourGrids[0]} src={illustrations[0].thumb} onTouchStart={this.handleTouchImageStart} onTouchEnd={this.handleTouchImageEnd.bind(this, illStyle.fourGrids[0], illustrations, 0)} fadeIn={false}></Image>	
						<Image style={illStyle.fourGrids[1]} src={illustrations[1].thumb} onTouchStart={this.handleTouchImageStart} onTouchEnd={this.handleTouchImageEnd.bind(this, illStyle.fourGrids[1], illustrations, 1)} fadeIn={false}></Image>	
						<Image style={illStyle.fourGrids[2]} src={illustrations[2].thumb} onTouchStart={this.handleTouchImageStart} onTouchEnd={this.handleTouchImageEnd.bind(this, illStyle.fourGrids[2], illustrations, 2)} fadeIn={false}></Image>	
						<Image style={illStyle.fourGrids[3]} src={illustrations[3].thumb} onTouchStart={this.handleTouchImageStart} onTouchEnd={this.handleTouchImageEnd.bind(this, illStyle.fourGrids[3], illustrations, 3)} fadeIn={false}></Image>	
					</Group>
				)
			case 1:
			case 3:
				return <Image style={illStyle} src={illustrations[0].thumb} onTouchStart={this.handleTouchImageStart} onTouchEnd={this.handleTouchImageEnd.bind(this, illStyle, illustrations, 0)}></Image>	
			default:
				return null
		}
	},
	renderTweetContent(content){
		return <Text style={this.props.style.tweetStyle}>{content}</Text>
	},
	render: function(){
		const {
			style,
			tweet,
		} = this.props

		// When there is a Tweet that retweet another Tweet, show the one retweeted.
		const isRetweeted = !!tweet.get('retweeted')
		const presentTweet = isRetweeted?tweet.get('retweeted'):tweet
		return <Group style={style.containerStyle} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
        	{isRetweeted?<Text style={style.retweetLabelStyle} useBackingStore={true}>{isRetweeted?`${String.fromCharCode("0xf152")} 来自${tweet.get('user')}的转发`:""}</Text>:null}
	        <Image style={style.avatarStyle} src={presentTweet.get('avatar')} useBackingStore={true}/>

	        <Group style={style.contentStyle} useBackingStore={true}>
	        	<Text style={style.userNameStyle}>{presentTweet.get('user')}</Text>
	        	<Text style={style.dateTimeStyle}>{moment(tweet.get('timestamp')).fromNow()}</Text>
	        	{this.renderTweetContent(presentTweet.get('tweet'))}

		        {this.renderIllustrations(presentTweet.get('illustrations'))}
	        </Group>
	        
	        <SpriteImage style={style.likeStyle} src={likeImage} frameCount={29} useBackingStore={true}></SpriteImage>
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
		height: !!label?lineHeight:0,
		width: containerStyle.width,
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
function getIllustrationStyle(tweetStyle, contentStyle, illustrations){
	// Single illustration style
	const illStyle = {
		top: tweetStyle.top + tweetStyle.height + 0.6 * em,
		left: 0,
		width: contentStyle.width,
		height: illustrations.length ? 10 * em : 0,
		backgroundColor: "#eee",
		borderRadius: 5,
		borderColor: "#eee",
	}

	// Two illustrations style
	const grid2_0 = _.extend({}, illStyle, {
		width: illStyle.width / 2 - IMAGE_PADDING,
		borderRadius: [5, 0, 0, 5],
	})
	const grid2_1 = _.extend({}, illStyle, {
		left: illStyle.left + illStyle.width / 2 + IMAGE_PADDING,
		width: illStyle.width / 2 - IMAGE_PADDING,
		borderRadius: [0, 5, 5, 0],
	})

	// Four illustrations style
	const gridWidth = illStyle.width / 2 - IMAGE_PADDING
	const gridHeight = illStyle.height / 2 - IMAGE_PADDING
	const grid4_0 = _.extend({}, illStyle, {
		width: gridWidth,
		height: gridHeight,
		borderRadius: [5, 0, 0, 0],
	})
	const grid4_1 = _.extend({}, illStyle, {
		left: illStyle.left + gridWidth + 2 * IMAGE_PADDING,
		width: gridWidth,
		height: gridHeight,
		borderRadius: [0, 5, 0, 0],
	})
	const grid4_2 = _.extend({}, illStyle, {
		top: illStyle.top + gridHeight + 2 * IMAGE_PADDING,
		width: gridWidth,
		height: gridHeight,
		borderRadius: [0, 0, 0, 5],
	})
	const grid4_3 = _.extend({}, illStyle, {
		top: illStyle.top + gridHeight + 2 * IMAGE_PADDING,
		left: illStyle.left + gridWidth + 2 * IMAGE_PADDING,
		width: gridWidth,
		height: gridHeight,
		borderRadius: [0, 0, 5, 0],
	})

	illStyle.twoGrids = [grid2_0, grid2_1]
	illStyle.fourGrids = [grid4_0, grid4_1, grid4_2, grid4_3]

	return illStyle
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