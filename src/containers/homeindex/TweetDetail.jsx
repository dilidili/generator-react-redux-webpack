import React, {PropTypes} from 'react'
import styles from './TweetDetail.scss'
import {connect} from 'react-redux'
import {getTweetDetail} from '../../reducer/tweet'
import {VelocityComponent} from 'velocity-react'

// Animation
const presentAnimation = {
	translateX: 0,
	opacity: 1,
}
const hideAnimation = {
	translateX: window.innerWidth,
	opacity: 1,
}

const TweetDetail = React.createClass({
	propTypes: {
		tid: PropTypes.string,
		isPresent: PropTypes.bool,
	},
	getDefaultProps() {
		return {
			isPresent: false,
			tid: "",
		}
	},

	// Renders
	renderContent(tweet){
		if (!tweet) return null

		const isRetweeted = tweet.get('retweeted')
		const presentTweet = isRetweeted ? tweet.get('retweeted') : tweet

		return (
			<div className={styles.mainContent}>
				{/* retweeted label */}
				{isRetweeted?<div className={styles.retweetLabel}><span className="Icon Icon--retweet"></span>{` ${tweet.get('user')} 转发了`}</div>:null}

				{/* avatar row */}
				<div className={styles.avatarGroup}>
					<img src={presentTweet.get('avatar')}/>					
					<p>{presentTweet.get('user')}</p>
					<button><span className="Icon Icon--follow"></span></button>
				</div>

				{/* tweet content */}
				<div className={styles.textGroup}>
					{presentTweet.get('tweet')}
				</div>

				<div className={styles.timestamp}>7/13/16, 05:34</div>

				<div className={styles.status}>
					<p><span className={styles.count}>{presentTweet.getIn(['retweet', 'count'])}</span> 转发</p>
					<p><span className={styles.count}>{presentTweet.getIn(['like', 'count'])}</span> 赞</p>
				</div>
			</div>
		)
	},

	render: function(){
		const {
			tid,
			list,
			isPresent,
		} = this.props
		const tweet = getTweetDetail(list, tid)

		return (
			<VelocityComponent animation={isPresent?presentAnimation:hideAnimation} duration={300}>
				{/* hide the detail page initially, thus set the opacity of it to 0 */}
				<div className={styles.container} style={{opacity: 0}}>
					{this.renderContent(tweet)}		
				</div>
			</VelocityComponent>
		)
	},
})

function mapStateToProps(state) {
	return {
		list: state.getIn(['tweet', 'list'])
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetDetail)