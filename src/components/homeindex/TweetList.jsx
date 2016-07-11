import React, {PropTypes} from 'react'
import Tweet, {getTweetHeight} from './Tweet'
import styles from './TweetList.scss'
import classNames from 'classnames'
import Infinite from 'react-infinite'
import _ from 'underscore'

const defaultProps = {
	list: _.map(_.range(25), () => ({
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
	})),
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
		const heightList = _.map(props.list, v => {
			return ~~getTweetHeight(v)
		})
		return {
			heightList,
		}
	},

	// Render
	renderTweet: function(index){
	    return (
			<Tweet key={index} tweet={this.props.list[index]} height={this.state.heightList[index]}/>
	    )
	},
	render: function(){
		const {size, list} = this.props
		if (list.length<=0) return null

		return (
			<div>
				<Infinite
					containerHeight={500}
					elementHeight={40}
					useWindowAsScrollContainer={false}
					preloadBatchSize={Infinite.containerHeightScaleFactor(3)}
					preloadAdditionalHeight={Infinite.containerHeightScaleFactor(3)}
				>
					{_.map(this.props.list, (v, k)=>this.renderTweet(k))}
				</Infinite>
			</div>
		)
	},
})

export default TweetList