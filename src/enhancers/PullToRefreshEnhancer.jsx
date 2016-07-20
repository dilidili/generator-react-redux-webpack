import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './PullToRefreshEnhancer.scss'
import _ from 'underscore'
import {Motion, spring} from 'react-motion'

const SPINNER_CONTAINER_HEIGHT = 3 * window.fontSize
const SPINNER_RADIUS = SPINNER_CONTAINER_HEIGHT / 4

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
		componentWillMount() {
			// Precompute spinner petal layout datas
			this.PETAL_DELTA = SPINNER_CONTAINER_HEIGHT * Math.PI / 12 // spinner consists of 12 petals
			this.PARABOLIC_PETAL_COUNT = Math.round(window.innerWidth / (2 * this.PETAL_DELTA))
			this.PETAL_COUNT = this.PARABOLIC_PETAL_COUNT * 2 + 12

			// Calculate position and threshoud for every spinner petal
			const k = SPINNER_CONTAINER_HEIGHT / Math.pow(window.innerWidth, 2)
			const k_z = 360 / Math.pow(window.innerWidth, 2)
			this.petalMeta = _.map(_.range(this.PETAL_COUNT), index => {
				// calculate position
				let position
				let rotateZ = 90
				if (index < this.PARABOLIC_PETAL_COUNT) {
					// petals march
					const x = index * this.PETAL_DELTA
					const y = k * x * x
					position = [x, y]
					rotateZ = - 90 + k_z * x * x
					
				// one spinner contains 12 petals
				} else if (index < this.PARABOLIC_PETAL_COUNT + 12) {
					// petals on spinner
					index = index - this.PARABOLIC_PETAL_COUNT
					const radians = index * Math.PI / 6
					position = [
						window.innerWidth / 2 + Math.sin(radians) * SPINNER_RADIUS,
						SPINNER_CONTAINER_HEIGHT / 4 + (1 - Math.cos(radians)) * SPINNER_RADIUS,
					]
					rotateZ = index * 30
				} else {
					// petals leave
					index = 2 * this.PARABOLIC_PETAL_COUNT + 12 - index - 1
					const x = index * this.PETAL_DELTA
					const y = k * x * x
					position = [window.innerWidth - x, y]
					rotateZ = 90 - k_z * x * x
				}

				// calculate threshold
				const threshold = index * SPINNER_CONTAINER_HEIGHT / this.PETAL_COUNT

				return {
					position,
					rotateZ,
					threshold,
				}
			})
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
				pullDistance: SPINNER_CONTAINER_HEIGHT,
			})
		},

		// Render
		renderSpinner(deltaHeight){
			return <div className={styles.spinnerContainer}
				style={{
					top: -deltaHeight,	
					height: deltaHeight,
					backgroundColor: '#f9fafd',
				}}
			>
				{
					_.map(this.petalMeta, (v,k)=>
						<div
							className={styles.spinnerPetal}
							key={k}
							style={{
								left: v.position[0],
								top: v.position[1],
								transform: `rotateZ(${v.rotateZ}deg)`,
								WebkitTransform: `rotateZ(${v.rotateZ}deg)`,
							}}
						>
						</div>
					)	
				}
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