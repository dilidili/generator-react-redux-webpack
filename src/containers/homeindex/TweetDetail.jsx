import React, {PropTypes} from 'react'
import styles from './TweetDetail.scss'
import {connect} from 'react-redux'
import {getTweetDetail} from '../../reducer/tweet'
import PullToRefreshEnhancer from '../../enhancers/PullToRefreshEnhancer' 
import ReplyTimelineComponent from '../../components/homeindex/ReplyTimelineComponent'
import {VelocityComponent} from 'velocity-react'
import moment from 'moment'
import _ from 'underscore'

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
		children: PropTypes.element,
		onTouchStart: PropTypes.func,
		onTouchMove: PropTypes.func,
		onTouchEnd: PropTypes.func,
		style: PropTypes.object,
	},
	getDefaultProps() {
		return {
			isPresent: false,
			tid: "",
		}
	},
	getInitialState() {
		return {
			// Asynchronizing this.props.tid with this.state.tid 
			// to maintain the image of last Tweet page when we move back to Tweets list.
			tid: this.props.tid,
		}
	},
	componentWillReceiveProps(nextProps) {
		this.setState({
			tid: !!nextProps.tid ? nextProps.tid : this.props.tid
		})
	},

	// Renders
	renderTimelineEntry(tweet){
		if (!tweet) return

		const replyList = tweet.get('tweet').split("//@")
		if (replyList.length>1) {
			return <div className={styles.replyEntry}>{`${tweet.get('user')} 回复了`}</div>
		}else{
			return null
		}
	},
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

				<div className={styles.timestamp}>{moment(presentTweet.get('timestamp')).fromNow()}</div>

				<div className={styles.status}>
					<p><span className={styles.count}>{presentTweet.getIn(['retweet', 'count'])}</span> 转发</p>
					<p><span className={styles.count}>{presentTweet.getIn(['like', 'count'])}</span> 赞</p>
				</div>
			</div>
		)
	},

	render: function(){
		const {
			list,
			isPresent,
			style,
		} = this.props
		const tid = this.state.tid
		const tweet = getTweetDetail(list, tid)

		return (
			<VelocityComponent animation={isPresent?presentAnimation:hideAnimation} duration={300}>
				{/* hide the detail page initially, thus set the opacity of it to 0 */}
				<div className={styles.container} 
					style={_.extend({opacity: 0}, style)} 
					onTouchStart={this.props.onTouchStart}
					onTouchMove={this.props.onTouchMove}
					onTouchEnd={this.props.onTouchEnd}
				>
					{/* pull-to-update content */}
					{this.props.children}

					{/* reply timeline entry*/}
					{this.renderTimelineEntry(tweet)}

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
export default PullToRefreshEnhancer(
	ReplyTimelineComponent,
	connect(mapStateToProps, mapDispatchToProps)(TweetDetail)
)