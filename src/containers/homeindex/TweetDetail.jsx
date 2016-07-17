import React, {PropTypes} from 'react'
import styles from './TweetDetail.scss'
import {connect} from 'react-redux'
import {getTweetDetail} from '../../reducer/tweet'

const TweetDetail = React.createClass({
	propTypes: {
		tid: PropTypes.string,
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