import React, {PropTypes} from 'react'
import styles from './TweetDetail.scss'
import {connect} from 'react-redux'
import {getTweetDetail} from '../../reducer/tweet'

const TweetDetail = React.createClass({
	propTypes: {
		tid: PropTypes.string,
	},


	// Renders
	renderContent(){
		return (
			<div className={styles.mainContent}>
				<div className={styles.retweetLabel}><span className="Icon Icon--retweet"></span> Dan Abramov 转发了此微博</div>
				<div className={styles.avatarGroup}>
					<img src="https://pbs.twimg.com/profile_images/729685404568330240/5y91rCy2_bigger.jpg"/>					
					<p>Micheal Chan</p>
					<button><span className="Icon Icon--follow"></span></button>
				</div>
				<div className={styles.textGroup}>
					i hear all the time companies interview for "culture fit". i think that's part of the problem. maybe you should hire for "culture shakeup".
				</div>
				<div className={styles.timestamp}>7/13/16, 05:34</div>
				<div className={styles.status}>
					<p><span className={styles.count}>5</span> 转发</p>
					<p><span className={styles.count}>9</span> 赞</p>
				</div>
			</div>
		)
	},

	render: function(){
		const {
			tid,
			list,
		} = this.props
		const tweetDetail = getTweetDetail(list, tid)
		if (!tweetDetail) return null

		return (
			<div className={styles.container}>
				{this.renderContent()}		
			</div>
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