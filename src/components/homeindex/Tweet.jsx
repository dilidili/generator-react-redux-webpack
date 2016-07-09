import React, {PropTypes} from 'react'
import styles from './Tweet.scss'
import measureText from 'measureText'
import Image from '../common/Image'
import moment from 'moment' 
import {Comment, Repost} from 'svg'

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

	render: function(){
		const heightConfig = getHeightConfig()
		const {
			avatar,
			user,
			timestamp,
			tweet,
		} = this.props.tweet

		return <div className={styles.container} style={{height: this.props.height, padding: heightConfig.padding}}>
			{/* <Image width={window.fontSize*3} height={window.fontSize*3} src={avatar} className={styles.avatar}></Image> */}
			<div className={styles.content}>
				{/* header */}	
				<div className={styles.header} style={{height: heightConfig.header}}>
					<div className={styles.userName}>{user}</div>
					<div className={styles.date}>{moment(timestamp).fromNow()}</div>
				</div>
				{/* content */}	
				<div className={styles.content}>
					{tweet}
				</div>
				{/* footer */}	
				<div className={styles.footer} style={{height: heightConfig.footer}}>
					<Comment className={styles.icon}></Comment>
					<Repost className={styles.icon}></Repost>
				</div>
			</div>
		</div> 
	},
})

export default Tweet 