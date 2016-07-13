import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTweet} from '../actions/tweet'
import Header from '../components/homeindex/Header'
import TweetList from '../components/homeindex/TweetList'
import _ from 'underscore'

const HomeIndexComponent = React.createClass({
	componentDidMount(){
		this.props.fetchTweet()
	},
	render: function(){
		return (
			<div>
				<Header></Header>
				<TweetList list={this.props.tweet}></TweetList>
			</div>
		)
	},
})

function mapStateToProps(state){
    return {
		tweet: _.map(state.getIn(['tweet', 'list']), v=>({
			user: v.user.name,
			tweet: v.text,
			timestamp: new Date(v.created_at),
			avatar: v.user.profile_image_url,
			avatar: v.user.profile_image_url,
			retweet: {
				count: v.reposts_count,
			},
			like: {
				count: v.attitudes_count,
			}
		}))
    }
}

function mapDispatchToProps(dispatch){
    return {
		fetchTweet: bindActionCreators(fetchTweet, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndexComponent)