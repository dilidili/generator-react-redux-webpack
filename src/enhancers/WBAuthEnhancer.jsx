import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {queryToken} from '../actions/user'

export default function WBAuthEnhancer(Component){
	const WBAuthEnhancer = React.createClass({
		componentWillMount(){
			const {
				token,
				route,
			} = this.props
			const code = route.location.query.code

			if (!token && code) {
				this.props.queryToken(code)
			}
		},
		render(){
			const {
				token,
			} = this.props

			return token?<Component {...this.props}></Component>:null
		}
	})


	function mapStateToProps(state) {
		return {
			route: state.get('route'),
			token: state.getIn(['user', 'token']),
		}
	}

	function mapDispatchToProps(dispatch) {
		return {
			queryToken: bindActionCreators(queryToken, dispatch),
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(WBAuthEnhancer)
}