import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const HomeComponent = React.createClass({
	render: function(){
		return <div>
			{this.props.children}
		</div>
	},
})

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)