import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './PullToRefreshEnhancer.scss'

/**
 * @param {Object} TipStyle              the style of spinner container
 * @param {Component} DataReceiverComponent
 * @param {Component} ConcreteComponent
 */
export default function PullToRefreshEnhancer(TipStyle, DataReceiverComponent, ConcreteComponent){
	const EnhanciveComponent = React.createClass({
		render: function(){
			return (
				<ConcreteComponent {...this.props}>
					<div className={styles.spinnerContainer}>123</div>	
				</ConcreteComponent>
			)
		},
	})

	function mapStateToProps(state) {
		return {}
	}
	function mapDispatchToProps(dispatch) {
		return {}
	}
	return connect(mapStateToProps, mapDispatchToProps)(EnhanciveComponent)
}