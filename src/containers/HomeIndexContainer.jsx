import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Header from '../components/homeindex/Header'
import TweetList from '../components/homeindex/TweetList'

const HomeIndexComponent = React.createClass({
	render: function(){
		return (
			<div>
				<Header></Header>
				<TweetList></TweetList>
			</div>
		)
	},
})

function mapStateToProps(state){
    return {
    }
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndexComponent)