import React, {PropTypes} from 'react'
import styles from './Tweet.scss'
import measureText from 'measureText'
import moment from 'moment' 
import {Comment, Repost} from 'svg'
import Group from 'react-canvas/Group'
import Text from 'react-canvas/Text'
import Image from 'react-canvas/Image'
import measure from 'react-canvas/measureText'
import FontFace from 'react-canvas/FontFace'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'

const em = window.fontSize
const PADDING = 0.7 * em
const FONT_BOLD = FontFace('Helvetica, sans-serif', null, {weight: 500})
const FONT_NORMAL = FontFace('Helvetica, sans-serif', null, {weight: 300})

const Tweet = React.createClass({
	propTypes: {
		tweet: PropTypes.object.isRequired, // The content of this tweet.
		style: PropTypes.object.isRequired, // The total style of this component, generated from Tweet.getTweetStyle.
	},
	mixins: [PureRenderMixin],
	statics: {
		getTweetStyle() {
			const containerStyle = getContainerStyle()
			const avatarStyle = getAvatarStyle()
			const contentStyle = getContentStyle(containerStyle, avatarStyle)
			const userNameStyle = getUserNameStyle(contentStyle)
			const dateTimeStyle = getDateTimeStyle(contentStyle)

			// compute container height, coz the height of textarea element needs metric to know their height.
			contentStyle.height = Math.max(userNameStyle.height, dateTimeStyle.height)
			containerStyle.height = Math.max(avatarStyle.height, contentStyle.height) + 12 * PADDING

			return {
				containerStyle,
				contentStyle,
				avatarStyle,
				avatarStyle,
				userNameStyle,
				dateTimeStyle,
			}
		},
	},
	render: function(){
		const {
			style,
			tweet: {
				avatar,
				user,
				timestamp,
				tweet,
			}
		} = this.props

		return <Group style={style.containerStyle}>
	        <Image style={style.avatarStyle} src={avatar} useBackingStore={true}/>
	        <Group style={style.contentStyle} useBackingStore={true}>
	        	<Text style={style.userNameStyle}>{user}</Text>
	        	<Text style={style.dateTimeStyle}>一个月前</Text>
	        </Group>
		</Group>

		// return <div className={styles.container} style={{height: this.props.height, padding: heightConfig.padding}}>
		// 	<Image width={window.fontSize*3} height={window.fontSize*3} src={avatar} className={styles.avatar}></Image>
		// 	<div className={styles.content}>
		// 		{/* header */}	
		// 		<div className={styles.header} style={{height: heightConfig.header}}>
		// 			<div className={styles.userName}>{user}</div>
		// 			<div className={styles.date}>{moment(timestamp).fromNow()}</div>
		// 		</div>
		// 		{/* content */}	
		// 		<div className={styles.content}>
		// 			{tweet}
		// 		</div>
		// 		{/* footer */}	
		// 		<div className={styles.footer} style={{height: heightConfig.footer}}>
		// 			<Comment className={styles.icon}></Comment>
		// 			<Repost className={styles.icon}></Repost>
		// 		</div>
		// 	</div>
		// </div> 
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
		translateY: PADDING,
		width: containerStyle.width - left - PADDING,
		height: 0,
		backgroundColor: "#eee"
	}
}
function getAvatarStyle() {
	return {
		borderRadius: 5,
		left: PADDING,
		top: PADDING,
		width: em * 3,
		height: em * 3,
	}
}
function getUserNameStyle(contentStyle) {
	return {
		top: 0,
		left: 0,
		height: 1.2 * em,
		width: contentStyle.width,
		fontSize: em,
		lineHeight: em * 1.2,
		fontFace: FONT_BOLD,
	}
}
function getDateTimeStyle(contentStyle) {
	const fontSize = em * 0.8
	const lineHeight = em
	const metrics = measure('一个月前', contentStyle.width, FONT_NORMAL, fontSize, lineHeight)

	return {
		top: 0,
		left: contentStyle.width - metrics.width,
		height: metrics.height,
		width: metrics.width,
		color: '#909498',
		fontFace: FONT_NORMAL,
		fontSize,
		lineHeight,
	}
}

export default Tweet 