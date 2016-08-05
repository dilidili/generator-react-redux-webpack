import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import HomeIndexContainer from './HomeIndexContainer'
import ProfileContainer from './ProfileContainer'

const HOME_INDEX_VIEW = "HOME_INDEX_VIEW"
const PROFILE_VIEW = "PROFILE_VIEW"

const HomeComponent = React.createClass({
	render: function(){
		const {
			currentView
		} = this.props

		return <div>
			<HomeIndexContainer isPresent={currentView===HOME_INDEX_VIEW}></HomeIndexContainer>
			<ProfileContainer isPresent={currentView===PROFILE_VIEW}></ProfileContainer>
		</div>
	},
})

function mapStateToProps(state) {
	const route = state.get('route')
	let currentView
	if (~route.location.pathname.indexOf("home")) {
		// showing the home index view
		currentView = HOME_INDEX_VIEW
	} else {
		// showing the user profile view
		currentView = PROFILE_VIEW
	}

	return {
		currentView,
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)