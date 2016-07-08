import React, {PropTypes} from 'react'
import Tweet, {getTweetHeight} from './Tweet'
import styles from './TweetList.scss'
import classNames from 'classnames'
import Infinite from 'react-infinite'
import _ from 'underscore'
import measureText from 'measureText'

const CONTENT_SCALE = 2/3

const defaultProps = {
	list: [{
		user: "Artour Babaev",
		tweet: "is there a way to watch nanyang ingame without lag i remember i used to able to watch china games without any lag now its just always laggy",
		timestamp: new Date('Sun Jun 05 14:53:39 +0800 2016'),
		avatar: 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com/avatar.jpeg',
		retweet: {
			count: 40,
		},
		like: {
			count: 332,
		},
	}],
}

const TweetList = React.createClass({
	// Lifecycle
	propTypes: {
		list: PropTypes.array,
	},
	getDefaultProps: function(){
		return defaultProps
	},
	getInitialState: function(){
		return this.computeStateFromProps(this.props)
	},

	// Utils
	computeStateFromProps(props){
		const {
			width,
			fontSize,
			lineHeight,
		} = this.getTweetContentStyle()

		const heightList = _.map(props.list, v=>{
			return measureText(v.tweet, width, fontSize, lineHeight).height	
		})

		return {
			heightList,
		}
	},
	getTweetContentStyle(){
		return {
			width: window.innerHeight*CONTENT_SCALE,
			fontSize: window.fontSize*1.1,
			lineHeight: window.fontSize*1.3,
		}
	},

	// Render
	renderTweet: function(index, scrollTop){
		const tweet = this.props.list[index] 

	    return (
			<Tweet tweet={tweet}/>
	    )
	},
	render: function(){
		const {size, list} = this.props
		if (list.length<=0) return null

		return (
			<div>
				{this.renderTweet(0)}	
			</div>
		)
		// return (
		// 	<div>
		// 		<Infinite
		// 			containerHeight={window.innerHeight}
		// 			elementHeight={40}
		// 		>
		// 			{_.map(_.range(1200), v=><div key={v} style={{height: 30}}>{v}</div>)}
		// 		</Infinite>
		// 	</div>
		// )
	},
})

export default TweetList