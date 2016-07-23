import React, {PropTypes} from 'react'
import Tweet from './Tweet'
import classNames from 'classnames'
import _ from 'underscore'
import Surface from 'react-canvas/Surface' 
import ListView from 'react-canvas/ListView' 
import {VelocityComponent} from 'velocity-react'

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
		list: PropTypes.object,
		isPresent: PropTypes.bool, 
	},
	getDefaultProps: function(){
		return {
			list: [],
			isPresent: true,
		}
	},
	getInitialState: function(){
		return this.computeStyleFromProps(this.props)
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

	// Utils
	computeStyleFromProps(props){
		return {
			tweetsStyle: props.list.map(v => Tweet.getTweetStyle(v)),
		}
	},

	handleClickTweet(tid){
		// Navigate to tweet detail page
		this.props.push(`/home/tweet/${tid}`)
	},

	// Render
	renderTweet: function(index){
	    return (
			<Tweet 
				key={index} 
				tweet={this.props.list.get(index)} 
				style={this.state.tweetsStyle.get(index)} 
				handleClick={this.handleClickTweet}
			/>
	    )
	},
	render: function(){
		const {
			list,
			isPresent,
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

					<Surface  {...this._canvasFrame}>
						<ListView
							style={this._canvasFrame}
							numberOfItems={this.props.list.size}
							itemHeightArray={_.map(this.state.tweetsStyle.toArray(), v=>Math.round(v.containerStyle.height))}
							itemGetter={this.renderTweet}
						>
						</ListView>
					</Surface>
				</div>
			</VelocityComponent>
		)
	},
})

export default TweetList