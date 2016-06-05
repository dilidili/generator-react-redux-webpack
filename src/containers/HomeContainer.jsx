import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import WBList from '../components/WBList'

const HomeComponent = React.createClass({
	getSize: function(){
		// full screen component
		return document.getElementById('react-root').getBoundingClientRect()
	},
	render: function(){
		const size = this.getSize()
		return <WBList size={size}></WBList>
	},
})

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)