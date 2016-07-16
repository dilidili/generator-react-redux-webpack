import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTweet} from '../actions/tweet'
import Header from '../components/homeindex/Header'
import TweetList from '../components/homeindex/TweetList'
import {push} from 'redux-router'
import _ from 'underscore'

const LIST_VIEW = "LIST_VIEW"
const TWEET_VIEW = "TWEET_VIEW"

const HomeIndexComponent = React.createClass({
	componentDidMount(){
		this.props.fetchTweet()
	},
	render: function(){
		return (
			<div>
				<Header></Header>
				<TweetList list={this.props.tweet} push={this.props.push} isPresent={this.props.currentView[0]===LIST_VIEW}></TweetList>
			</div>
		)
	},
})

function mapStateToProps(state){
	const route = state.get('route')
	let currentView
	if (!~route.location.pathname.indexOf("tweet")) {
		// showing the list view
		currentView = [LIST_VIEW]
	} else {
		// showing one tweet details
		currentView = [TWEET_VIEW, route.params.tid]
	}

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
			},
			id: v.idstr,
		})),
		currentView, // as [THE_PRESENT_VIEW, data]
    }
}

function mapDispatchToProps(dispatch){
    return {
		fetchTweet: bindActionCreators(fetchTweet, dispatch),
		push: bindActionCreators(push, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndexComponent)