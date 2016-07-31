import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTweet} from '../actions/tweet'
import Header from '../components/homeindex/Header'
import TweetList from '../components/homeindex/TweetList'
import TweetDetail from '../containers/homeindex/TweetDetail'
import {push} from 'redux-router'
import {Logo, Back} from 'svg'
import _ from 'underscore'

const LIST_VIEW = "LIST_VIEW"
const TWEET_VIEW = "TWEET_VIEW"

const HomeIndexComponent = React.createClass({
	componentDidMount(){
		this.props.fetchTweet(this.props.token)
	},

	// Handler
	handleFetchTweet(isFetchTop = true) {
		if (isFetchTop) {
			this.props.fetchTweet(this.props.token, {
				since_id: this.props.tweet.get(0).get('id')
			})
		}else{
			this.props.fetchTweet(this.props.token, {
				max_id: this.props.tweet.last().get('id')
			})
		}
	},

	// Render
	renderHeaderCenter(className){
		switch(this.props.currentView[0]){
			case TWEET_VIEW:
				return <p className={className}>Tweet</p>
			case LIST_VIEW:
				return <Logo className={className}></Logo>
			default:
				return <span></span>
		}
	},
	renderHeaderLeft(className){
		switch(this.props.currentView[0]){
			case TWEET_VIEW:
				return <span onTouchStart={()=>{this.props.push('/home')}}><Back className={className}></Back></span>
			default:
				return <span></span>
		}
	},
	render: function(){
		const {
			currentView,
			isSpinningTop,
			isSpinningBottom,
			fetchTweet,
			push,
			tweet,
		} = this.props

		return (
			<div>
				<Header renderHeaderLeft={this.renderHeaderLeft} renderHeaderCenter={this.renderHeaderCenter}></Header>
				<div style={{height: window.contentHeight, position: 'relative'}}>
					<TweetList list={tweet} push={push} isPresent={currentView[0]===LIST_VIEW} handleFetchTweet={this.handleFetchTweet} isSpinningTop={isSpinningTop} isSpinningBottom={isSpinningBottom}></TweetList>
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
		isSpinningBottom: state.getIn(['tweet', 'isListBottomLoading']),
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