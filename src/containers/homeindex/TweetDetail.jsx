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
	renderContent(tweetDetail){
		return (
			<div className={styles.mainContent}>
				<div className={styles.retweetLabel}><span className="Icon Icon--retweet"></span> Dan Abramov 转发了</div>
				<div className={styles.avatarGroup}>
					<img src="http://tva4.sinaimg.cn/crop.0.0.610.610.50/005zgTSzgw1ei8qp1iyo7j30h00h0428.jpg"/>					
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
			isPresent,
		} = this.props
		const tweetDetail = getTweetDetail(list, tid)

		return (
			<VelocityComponent animation={isPresent?presentAnimation:hideAnimation} duration={300}>
				{/* hide the detail page initially, thus set the opacity of it to 0 */}
				<div className={styles.container} style={{opacity: 0}}>
					{this.renderContent(tweetDetail)}		
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