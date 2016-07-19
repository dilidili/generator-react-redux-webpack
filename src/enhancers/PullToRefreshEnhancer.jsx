import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './PullToRefreshEnhancer.scss'
import _ from 'underscore'
import {Motion, spring} from 'react-motion'

const SPINNEER_CONTAINER_HEIGHT = 3 * window.fontSize

/**
 * @param {Component} DataReceiverComponent
 * @param {Component} ConcreteComponent
 */
export default function PullToRefreshEnhancer(DataReceiverComponent, ConcreteComponent){
	const EnhanciveComponent = React.createClass({
		getInitialState(){
			return {
				pullDistance: 0, // The length of the ConcreteCompoment moves down, 
			}
		},
		componentWillMount(){
			// precompute spinner petal layout datas
			this.PETAL_DELTA = SPINNEER_CONTAINER_HEIGHT * Math.PI / 12 // spinner consists of 12 petals
			this.PETAL_COUNT = window.innerWidth / this.PETAL_DELTA + 12
		},

		// Handler
		handleTouchStart(evt){
			this._lastTouchY = evt.touches[0].clientY
		},
		handleTouchMove(evt){
			evt.preventDefault()

			this.setState({
				pullDistance: this.state.pullDistance + evt.touches[0].clientY/2 - this._lastTouchY/2
			})
			this._lastTouchY = evt.touches[0].clientY
		},
		handleTouchEnd(evt){
			this.setState({
				pullDistance: 30,
			})
		},

		// Render
		renderSpinner(deltaHeight){
			<div className={styles.spinnerContainer}
				style={{
					top: -deltaHeight,	
					height: deltaHeight,
					backgroundColor: '#f9fafd',
				}}
			>
			</div>
		},

		render: function(){
			const {
				pullDistance
			} = this.state

			return (
				<Motion style={{
					pullDistance: spring(pullDistance)
				}}>
					{
						interpolatingStyle => (
							<ConcreteComponent {...this.props} 
								onTouchStart={this.handleTouchStart} 
								onTouchMove={this.handleTouchMove} 
								onTouchEnd={this.handleTouchEnd}
								style={{
									top: interpolatingStyle.pullDistance,
								}}
							>
								{this.renderSpinner(interpolatingStyle.pullDistance)}
							</ConcreteComponent>
						)
					}
				</Motion>
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