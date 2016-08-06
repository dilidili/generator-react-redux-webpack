import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchAuthInfo} from '../actions/user'
import WBAuthEnhancer from '../enhancers/WBAuthEnhancer'

// initialize some necessary constants for react-canvas layout
window.fontSize = window.innerHeight > 570 ? (window.innerHeight < 670 ? 16 : 18) : 13
document.getElementById('react-root').setAttribute("style", `font-size: ${window.fontSize}px`)
window.innerHeight = Math.min(window.innerHeight, 736)
window.innerWidth = Math.min(window.innerWidth, 414)
// get rid of header
window.contentHeight = ~~(window.innerHeight - 4 * window.fontSize)
window.headerHeight = 4 * window.fontSize

const AppComponent = React.createClass({
	componentWillMount(){
		this.props.fetchAuthInfo()
	},

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
    	fetchAuthInfo: bindActionCreators(fetchAuthInfo, dispatch),
    }
}

export default WBAuthEnhancer(connect(mapStateToProps, mapDispatchToProps)(AppComponent))