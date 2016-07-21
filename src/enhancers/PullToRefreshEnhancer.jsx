import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './PullToRefreshEnhancer.scss'
import _ from 'underscore'
import {Motion, spring} from 'react-motion'
import {fetchTweetDetailTimeline} from '../actions/tweet'
import timerMixin from 'react-timer-mixin'

const SPINNER_CONTAINER_HEIGHT = 3 * window.fontSize
const SPINNER_RADIUS = SPINNER_CONTAINER_HEIGHT / 4

/**
 * @param {Component} DataReceiverComponent
 * @param {Component} ConcreteComponent
 */
export default function PullToRefreshEnhancer(DataReceiverComponent, ConcreteComponent){
	const EnhanciveComponent = React.createClass({
		propTypes: {
			style: PropTypes.object,
			className: PropTypes.string,
		},
		getDefaultProps(){
			style: PropTypes.object,
			className: PropTypes.string,
		},
		getInitialState(){
			return {
				pullDistance: 0, // The distance of the ConcreteCompoment moves down
				loadingSpinnerCounter: 0, // Refer to componentWillReceiveProps
				isSpinning: false, // Spinner is spinning
			}
		},
		_lastTouchY: 0,
		_loadingTimelineToken: 0, // Identify each loading request's state
		mixins: [timerMixin],

		componentWillMount() {
			// Precompute spinner petal layout datas
			this.PETAL_DELTA = SPINNER_CONTAINER_HEIGHT * Math.PI / 12 // spinner consists of 12 petals
			this.PARABOLIC_PETAL_COUNT = Math.round(window.innerWidth / (2 * this.PETAL_DELTA))
			this.PETAL_COUNT = this.PARABOLIC_PETAL_COUNT * 2 + 12
			this.THRESHOLD_DELTA = SPINNER_CONTAINER_HEIGHT * 2 / this.PETAL_COUNT

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
					const relativeIndex = index - this.PARABOLIC_PETAL_COUNT
					const radians = relativeIndex * Math.PI / 6
					position = [
						window.innerWidth / 2 + Math.sin(radians) * SPINNER_RADIUS,
						SPINNER_CONTAINER_HEIGHT / 4 + (1 - Math.cos(radians)) * SPINNER_RADIUS,
					]
					rotateZ = relativeIndex * 30
				} else {
					// petals leave
					const relativeIndex = 2 * this.PARABOLIC_PETAL_COUNT + 12 - index - 1
					const x = relativeIndex * this.PETAL_DELTA
					const y = k * x * x
					position = [window.innerWidth - x, y]
					rotateZ = 90 - k_z * x * x
				}

				return {
					position,
					rotateZ,
				}
			})
		},
		componentWillReceiveProps(nextProps){
			if (!this.props.isLoading && nextProps.isLoading) {
				this.setState({
					loadingSpinnerCounter: 0,
					isSpinning: true,
				})

				// Start loading, move the spinner petal moves forward with a certain frequency.
				this._intervalId = this.setInterval(function(){
					this.setState({
						loadingSpinnerCounter: this.state.loadingSpinnerCounter + 1,
					})
				}.bind(this), 80)
			}

			if (this.props.isLoading && !nextProps.isLoading) {
				// stop the spinner and fold its container until end the current loop
				this.setTimeout(function() {
					this.clearInterval(this._intervalId)
					this.setState({
						isSpinning: false,
					})
				}.bind(this), 12 - (6 + this.state.loadingSpinnerCounter) % 12)
			}
		},

		// Handler
		handleTouchStart(evt){
			if (this.props.isLoading) return

			this._lastTouchY = evt.touches[0].clientY
		},
		handleTouchMove(evt){
			if (this.props.isLoading) return

			evt.preventDefault()
			const currentTouchY = evt.touches[0].clientY
			// debounce by distance delta
			if (Math.abs(currentTouchY - this._lastTouchY) < 10) return

			this.setState({
				pullDistance: Math.max(this.state.pullDistance + (currentTouchY - this._lastTouchY)/2, 0),
			})
			this._lastTouchY = currentTouchY

			// if (evt.touches[0].clientY - this._lastTouchY > 10 && !this.props.isLoading) {
			// 	this.setState({
			// 		pullDistance: SPINNER_CONTAINER_HEIGHT,
			// 	})

			// 	this._loadingTimelineToken = Date.now()
			// 	this.props.fetchTweetDetailTimeline(this._loadingTimelineToken)
			// }
		},
		handleTouchEnd(evt){
			if (this.props.isLoading) return

			const distance = this.state.pullDistance
			if (distance < SPINNER_CONTAINER_HEIGHT) {
				this.setState({
					pullDistance: 0,
				})	
			}else if (distance > SPINNER_CONTAINER_HEIGHT) {
				this.setState({
					pullDistance: SPINNER_CONTAINER_HEIGHT,
				})

				// start loading
				this._loadingTimelineToken = Date.now()
				this.props.fetchTweetDetailTimeline(this._loadingTimelineToken)
			}
		},

		// Render
		renderSpinner(deltaHeight){
			// the petal index of the current spinner head
			let headIndex = ~~ (deltaHeight / this.THRESHOLD_DELTA) + this.state.loadingSpinnerCounter
			let opacityArray = _.map(_.range(this.PETAL_COUNT), v=>0)


			if (!this.props.isLoading && this.props.token === this._loadingTimelineToken) {
				// loading complete
				
			}	
			// calulate the color of each petal
			if (true) {
				// when petal march and sp
				_.each(_.range(6), v => {
					const index = headIndex - v < this.PARABOLIC_PETAL_COUNT ? headIndex - v : this.PARABOLIC_PETAL_COUNT + (headIndex - v - this.PARABOLIC_PETAL_COUNT) % 12
					opacityArray[index] = 0.6 - v * 0.1
				})
			}

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
								opacity: opacityArray[k],
							}}
						>
						</div>
					)	
				}
			</div>
		},

		render: function(){
			const {
				pullDistance,
				style,
				className,
			} = this.state

			// Data loaded 
			if (this._loadingTimelineToken && !this.props.isLoading && this.props.token === this._loadingTimelineToken && !this.state.isSpinning) {
								// style={{
								// 	position: 'absolute',
								// 	bottom: window.contentHeight - this.state.pullDistance,
								// }}
				return (
					<div>
						<ConcreteComponent {...this.props}
							style={{
								top: this.state.pullDistance,
								overflow: 'scroll',
								height: window.contentHeight,
							}}
						>
						</ConcreteComponent>
					</div>
				)
			}

			return (
				<div style={style} className={className}>
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
				</div>
			)
		},
	})

	function mapStateToProps(state) {
		return {
			isLoading: state.getIn(['tweet', 'loadingDetailTimeline', 'isLoading']),
			token: state.getIn(['tweet', 'loadingDetailTimeline', 'token']),
		}
	}
	function mapDispatchToProps(dispatch) {
		return {
			fetchTweetDetailTimeline: bindActionCreators(fetchTweetDetailTimeline, dispatch),
		}
	}
	return connect(mapStateToProps, mapDispatchToProps)(EnhanciveComponent)
}