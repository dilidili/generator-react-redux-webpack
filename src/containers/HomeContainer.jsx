import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import WBList from '../components/WBList'
import {fetchWb} from '../actions/wb'

const HomeComponent = React.createClass({
	getSize: function(){
		// full screen component
		return document.getElementById('react-root').getBoundingClientRect()
	},
	componentDidMount: function(){
		this.props.fetchWb()
	},
	render: function(){
		const size = this.getSize()
		return <WBList size={size} wb={this.props.wb}></WBList>
	},
})

function mapStateToProps(state) {
	return {
		wb: state.getIn(['wb', 'list']).toJS()
	}
}

function mapDispatchToProps(dispatch) {
	return {
    	fetchWb: bindActionCreators(fetchWb, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)