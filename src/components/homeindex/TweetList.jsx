import React, {PropTypes} from 'react'
import Tweet from './Tweet'
import classNames from 'classnames'
import _ from 'underscore'
import Surface from 'react-canvas/Surface' 
import ListView from 'react-canvas/ListView' 
import {VelocityComponent} from 'velocity-react'
import Spinner from '../common/Spinner'
import styles from './TweetList.scss'
import ImageViewer from './ImageViewer'

// const defaultList = {
// 	list: _.map(_.range(50), () => ({
// 		user: "Artour Babaev",
// 		tweet: _.sample(["is there a way to watch nanyang ingame without lag i remember i used to able to watch china games without any lag now its just always laggy",
// 				"is there a way to watch nanyang ingame without lag i remember i used to able to watch china games without any lag now its just always laggy e to watch china games without any lag now its just always laggy e to watch china games without any lag now its just always laggy e to watch china games without any lag now its just always laggy",
// 				"e to watch china games without any lag now its just always laggy",
// 			]),
// 		timestamp: new Date('Sun Jun 05 14:53:39 +0800 2016'),
// 		avatar: 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com/avatar.jpeg',
// 		retweet: {
// 			count: 40,
// 		},
// 		like: {
// 			count: 332,
// 		},
// 		id: "3996901369751053",
// 	})),
// }

// Animation
const presentAnimation = {
	translateX: "0",
	overlay: {
		opacity: 0,
	},
}
const hideAnimation = {
	translateX: -window.fontSize*5,
	overlay: {
		opacity: 0.2,
	},
}

const TweetList = React.createClass({
	// Lifecycle
	propTypes: {
		push: PropTypes.func.isRequired,
		handleFetchTweet: PropTypes.func.isRequired,
		list: PropTypes.object,
		isPresent: PropTypes.bool, 
		isSpinningTop: PropTypes.bool,
		isSpinningBottom: PropTypes.bool,
	},
	getDefaultProps: function(){
		return {
			list: [],
			isPresent: true,
			isSpinningTop: false,
			isSpinningBottom: false,
		}
	},
	getInitialState: function(){
		return _.extend(this.computeStyleFromProps(this.props), {
			imageViewerStyle: null, // imageViewerStyle's existing indicates to render an ImageViewer for some pictures
		})
	},
	componentWillReceiveProps(nextProps){
		this.setState(this.computeStyleFromProps(nextProps))
	},
	componentWillMount(){
		this._canvasFrame = {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.contentHeight,
		}
	},
	_scrollTop: 0,

	// Utils
	computeStyleFromProps(props){
		return {
			tweetsStyle: props.list.map(v => Tweet.getTweetStyle(v)),
		}
	},

	// Handler
	handleClickTweet(tid){
		// Navigate to tweet detail page
		this.props.push(`/home/tweet/${tid}`)
	},
	handleRefreshActivate(){
		// console.log('upActivate')
	},
	handleRefreshDeactivate(){
		// console.log('upDeactivate')
	},
	handleRefreshStart(){
		// console.log('upStart')
		this.props.handleFetchTweet(true)
	},
	handleRefreshActivateBottom(){
		// console.log('bottomActivate')
	},
	handleRefreshDeactivateBottom(){
		// console.log('bottomDeactivate')
	},
	handleRefreshStartBottom(){
		// console.log('bottomStart')
		this.props.handleFetchTweet(false)
	},
	handleClickIllustration(frameTweet, index, src, defaultSrcIndex){
		this.setState({
			imageViewerStyle: {
				top: frameTweet.top - this._scrollTop + _.reduce(_.range(index).map(v => this.state.tweetsStyle.get(v).containerStyle.height), (memo, num) => (memo + num), 0),
				left: frameTweet.left,
				width: frameTweet.width,
				height: frameTweet.height,
				defaultSrcIndex,
				src,
			},
		})
	},

	// Render
	renderTweet: function(index, scrollTop){
		this._scrollTop = scrollTop

	    return (
			<Tweet 
				key={index} 
				index={index} 
				tweet={this.props.list.get(index)} 
				style={this.state.tweetsStyle.get(index)} 
				handleClick={this.handleClickTweet}
				handleClickIllustration={this.handleClickIllustration}
			/>
	    )
	},
	render: function(){
		const {
			list,
			isPresent,
			isSpinningTop,
			isSpinningBottom,
		} = this.props
		if (list.size<=0) return null

		const transitionAnimation = isPresent ? presentAnimation : hideAnimation

		return (
			<VelocityComponent animation={transitionAnimation} duration={300}>
				<div>
					<VelocityComponent animation={transitionAnimation.overlay} duration={300}>
						{/* an overlay appears when click someone tweet */}
						<div style={{backgroundColor: "black", position:"absolute", top:0, left:0, display: isPresent?'none':'block'}}></div>
					</VelocityComponent>

					{/* Spinner on the top banner */}
					<Spinner className={styles.spinner} stopped={!isSpinningTop}></Spinner>

					<Surface  {...this._canvasFrame}>
						<ListView
							style={this._canvasFrame}
							numberOfItems={list.size}
							itemHeightArray={_.map(this.state.tweetsStyle.toArray(), v=>Math.round(v.containerStyle.height))}
							itemGetter={this.renderTweet}
							isSpinningTop={isSpinningTop}
							isSpinningBottom={isSpinningBottom}
							activatePullToRefresh = {
								[
									window.fontSize * 3.2,
									this.handleRefreshActivate,
									this.handleRefreshDeactivate,
									this.handleRefreshStart,
									this.handleRefreshActivateBottom,
									this.handleRefreshDeactivateBottom,
									this.handleRefreshStartBottom,
								]
							}
						>
						</ListView>
					</Surface>

					{/* Spinner on the top banner */}
					<Spinner className={styles.spinnerBottom} stopped={!isSpinningBottom}></Spinner>

					{this.state.imageViewerStyle?<ImageViewer style={this.state.imageViewerStyle}></ImageViewer>:null}
				</div>
			</VelocityComponent>
		)
	},
})

export default TweetList