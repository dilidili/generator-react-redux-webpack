import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// initialize some necessary constants for react-canvas layout
window.fontSize = window.innerHeight > 570 ? (window.innerHeight < 670 ? 16 : 18) : 13
document.getElementById('react-root').setAttribute("style", `font-size: ${window.fontSize}px`)

const AppComponent = React.createClass({
	render: function(){
		return (
			<div>
				{this.props.children}
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

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)