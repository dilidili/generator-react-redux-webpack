import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTweet} from '../actions/tweet'
import {viewImage, closeImage} from '../actions/homeindex'
import Header from '../components/homeindex/Header'
import TweetList from '../components/homeindex/TweetList'
import TweetDetail from '../containers/homeindex/TweetDetail'
import {push} from 'redux-router'
import {VelocityComponent} from 'velocity-react'
import {Logo, Back} from 'svg'
import ImageViewer from '../components/homeindex/ImageViewer'
import _ from 'underscore'

const LIST_VIEW = "LIST_VIEW"
const TWEET_VIEW = "TWEET_VIEW"

const presentAnimation = {
	translateY: 0,
}
const hideAnimation = {
	translateY: window.innerHeight - window.headerHeight,
}

const HomeIndexComponent = React.createClass({
	propTypes: {
		isPresent: PropTypes.bool,
	},
	getDefaultProps() {
		return {
			isPresent: true,
		}
	},

	componentDidMount(){
		if (!this.props.tweet.size) {
			this.props.fetchTweet(this.props.token)
		}
	},

	// Handler
	handleClickContainer() {
		if (!this.props.isPresent) {
			this.props.push('/home')
		}
	},
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
	renderHeaderRight(className){
		return <span className={`Icon--other Icon ${className}`} onTouchStart={(evt)=>{this.props.push(this.props.isPresent?'/profile':'/home')}}></span>
	},
	render: function(){
		const {
			currentView,
			isSpinningTop,
			isSpinningBottom,
			fetchTweet,
			push,
			tweet,
			imageViewerData,
			viewImage,
			handCloseImageViewer,
			isPresent,
		} = this.props
		return (
			<VelocityComponent animation={isPresent?presentAnimation:hideAnimation} duration={300}>
				<div onTouchStart={this.handleClickContainer} style={{position: 'relative', zIndex: 2}}>
					<Header renderHeaderLeft={this.renderHeaderLeft} renderHeaderCenter={this.renderHeaderCenter} renderHeaderRight={this.renderHeaderRight}></Header>
						<div style={{height: window.contentHeight, position: 'relative'}}>
							<TweetList list={tweet} push={push} isPresent={currentView[0]===LIST_VIEW} handleFetchTweet={this.handleFetchTweet} isSpinningTop={isSpinningTop} isSpinningBottom={isSpinningBottom} viewImage={viewImage}></TweetList>

							{/* Do not render TweetDetail for unfix velocity-react animation conflicts bug */}
							{isPresent?<TweetDetail tid={currentView[1]} isPresent={currentView[0]===TWEET_VIEW}></TweetDetail>:null}
							{imageViewerData.get('srcList').size?<ImageViewer appearFrame={imageViewerData.get('frame')} srcList={imageViewerData.get('srcList')} defaultIndex={imageViewerData.get('defaultIndex')} handClose={handCloseImageViewer}></ImageViewer>:null}
						</div>
				</div>
			</VelocityComponent>
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
		imageViewerData: state.getIn(['homeindex', 'imageViewerData']),
		currentView, // as [THE_PRESENT_VIEW, data]
    }
}

function mapDispatchToProps(dispatch){
    return {
		fetchTweet: bindActionCreators(fetchTweet, dispatch),
		viewImage: bindActionCreators(viewImage, dispatch),
		push: bindActionCreators(push, dispatch),
		handCloseImageViewer: bindActionCreators(closeImage, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndexComponent)