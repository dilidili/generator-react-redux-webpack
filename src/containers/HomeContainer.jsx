import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import {fetchWb} from '../actions/wb'
import FootTabContainer from './FootTabContainer'

const HomeComponent = React.createClass({
	// getSize: function(){
	// 	// full screen component
	// 	return document.getElementById('react-root').getBoundingClientRect()
	// },
	componentDidMount: function(){
		// this.props.fetchWb()
	},
	render: function(){
		// const size = this.getSize()
		// return <WBList size={size} wb={this.props.wb}></WBList>
		return <div>
			{this.props.children}
			<FootTabContainer></FootTabContainer>
		</div>
	},
})

function mapStateToProps(state) {
	return {
		// wb: state.getIn(['wb', 'list']).toJS()
	}
}

function mapDispatchToProps(dispatch) {
	return {
    	// fetchWb: bindActionCreators(fetchWb, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)