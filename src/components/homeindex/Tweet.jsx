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

// get height of tweet according to the content. 
// react-infinite will use the result to define the tweet list.
export function getTweetHeight(info){
	const HEIGHT_CONFIG = getHeightConfig()

	const textContentHeight = measureText(info.tweet, window.innerWidth-5.4*window.fontSize, window.fontSize, window.fontSize*1.3).height
	return 2*HEIGHT_CONFIG.padding + HEIGHT_CONFIG.header + HEIGHT_CONFIG.footer + textContentHeight
}
function getHeightConfig(){
	return {
		padding: 0.7 * window.fontSize,
		header: 1.5 * window.fontSize,
		footer: 1.6 * window.fontSize,
	}
}

const Tweet = React.createClass({
	propTypes: {
		height: PropTypes.number.isRequired, // the height of this tweet
		tweet: PropTypes.object.isRequired, // the content of this tweet 
	},
	componentWillMount(){
		this.updateStyle()
	},

	render: function(){
		const {
			avatar,
			user,
			timestamp,
			tweet,
		} = this.props.tweet

		return <Group style={this._containerStyle}>
	        <Image style={this._avatarStyle} src={avatar} />
	        <Group style={this._contentStyle}>
	        	<Text style={this._usernameStyle}>{user}</Text>
	        	<Text style={this._datatimeStyle}>一个月前</Text>
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

	// Style
	updateStyle(){
		this._PADDING = getHeightConfig().padding
		this._FONT_FACE = 

		this._containerStyle = this.getContainerStyle()
		this._avatarStyle = this.getAvatarStyle()
		this._contentStyle = this.getContentStyle()
		this._usernameStyle = this.getUserNameStyle()
		this._datatimeStyle = this.getDateTimeStyle()
	},
	getContainerStyle(){
		return {
			width: window.innerWidth, 
			height: this.props.height,
			borderColor: '#e0e0e0',
		}
	},
	getContentStyle(){
		const left = 1.6*this._PADDING + this._avatarStyle.width
		return {
			top: 0,
			left: 0,
			translateX: left, 
			translateY: this._PADDING, 
			width: this._containerStyle.width - left - this._PADDING,
			height: this._containerStyle.height - this._PADDING,
			backgroundColor: "#eee"
		}
	},
	getAvatarStyle(){
		return {
			borderRadius: 5,
			left: this._PADDING,
			top: this._PADDING,
			width: window.fontSize*3,
			height: window.fontSize*3,
		}
	},
	getUserNameStyle(){
		return {
			top: 0,
			left: 0,
			height: 1.2*window.fontSize,
			width: this._contentStyle.width,	
			fontSize: window.fontSize,
			lineHeight: window.fontSize*1.2,	
			fontFace: FontFace('Helvetica, sans-serif', null, {weight: 500}),
		}
	},
	getDateTimeStyle(){
		const fontFace = FontFace('Helvetica, sans-serif', null, {weight: 300})
		const fontSize = window.fontSize*0.8
		const lineHeight = window.fontSize
		// const metrics = measure('一个月前', this._contentStyle.width, fontFace, fontSize, lineHeight)

		return {
			top: 0,
			// left: this._contentStyle.width-metrics.width,
			// height: metrics.height,
			// width: metrics.width,	
			left: 0,
			height: 20,
			width: 30,
			color: '#909498',
			fontSize,
			lineHeight,
			fontFace,
		}
	}
})

export default Tweet 