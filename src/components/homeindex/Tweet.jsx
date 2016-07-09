import React, {PropTypes} from 'react'
import styles from './Tweet.scss'
import measureText from 'measureText'
import Image from '../common/Image'
import moment from 'moment' 

// get height of tweet according to the content. 
// react-infinite will use the result to define the tweet list.
export function getTweetHeight(info){
	const HEIGHT_CONFIG = getHeightConfig()

	const textContentHeight = measureText(info.tweet, window.innerWidth*0.7, window.fontSize, window.fontSize*1.5).height
	return 2*HEIGHT_CONFIG.padding + HEIGHT_CONFIG.header + HEIGHT_CONFIG.footer + textContentHeight
}

function getHeightConfig(){
	return {
		padding: 0.7 * window.fontSize,
		header: 1.5 * window.fontSize,
		footer: 2 * window.fontSize,
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
		} = this.props.tweet

		return <div className={styles.container} style={{height: this.props.height, padding: heightConfig.padding}}>
			<Image width={window.fontSize*3} height={window.fontSize*3} src={avatar} className={styles.avatar}></Image>
			<div className={styles.content}>
				<div className={styles.header} style={{height: heightConfig.header}}>
					<div className={styles.userName}>{user}</div>
					<div className={styles.date}>{moment(timestamp).fromNow()}</div>
				</div>
			</div>
		</div> 
	},
})

export default Tweet 