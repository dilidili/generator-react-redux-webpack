import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Image from '../components/common/Image'

const TestComponent = React.createClass({
	componentDidMount: function(){
	},
	render: function(){
		return <div>
			<Image></Image>
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

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)