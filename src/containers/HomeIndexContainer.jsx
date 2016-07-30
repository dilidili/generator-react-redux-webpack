import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTweet} from '../actions/tweet'
import Header from '../components/homeindex/Header'
import TweetList from '../components/homeindex/TweetList'
import TweetDetail from '../containers/homeindex/TweetDetail'
import {push} from 'redux-router'
import _ from 'underscore'

const LIST_VIEW = "LIST_VIEW"
const TWEET_VIEW = "TWEET_VIEW"

const HomeIndexComponent = React.createClass({
	componentDidMount(){
		this.props.fetchTweet(this.props.token)
	},

	// Handler
	handleFetchTop(){
		this.props.fetchTweet(this.props.token, {
			since_id: this.props.tweet.get(0).get('id')
		})
	},

	// Render
	render: function(){
		const {
			currentView,
			isSpinningTop,
			fetchTweet,
			push,
			tweet,
		} = this.props

		return (
			<div>
				<Header></Header>
				<div style={{height: window.contentHeight, position: 'relative'}}>
					<TweetList list={tweet} push={push} isPresent={currentView[0]===LIST_VIEW} handleFetchTop={this.handleFetchTop} isSpinningTop={isSpinningTop}></TweetList>
					<TweetDetail tid={currentView[1]} isPresent={currentView[0]===TWEET_VIEW}></TweetDetail>
				</div>
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
		tweet: state.getIn(['tweet', 'list']),
		token: state.getIn(['user', 'token']),
		isSpinningTop: state.getIn(['tweet', 'isListTopLoading']),
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