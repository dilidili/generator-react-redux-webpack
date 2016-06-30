import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Header from '../components/homeindex/Header'

const HomeIndexComponent = React.createClass({
	render: function(){
		return (
			<div>
				<Header></Header>
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