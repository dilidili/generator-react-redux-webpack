import React, {PropTypes} from 'react'
import _ from 'underscore'
import {VelocityComponent} from 'velocity-react'

const Image = React.createClass({
	propTypes: {
		// Base
		src: PropTypes.string.isRequired,
		width: PropTypes.number,	
		height: PropTypes.number,	

		useGray: PropTypes.bool,
		style: PropTypes.object,
		getLoadedAnimation: PropTypes.func,
		getContainerLoadedAnimation: PropTypes.func,
		handleLoad: PropTypes.func,
	},
	getDefaultProps(){
		return {
			src: '',
			width: 200,
			height: 200,
			useGray: true,
			style: {},
		}
	},
	getInitialState(){
		return {
			imageLoaded: false,
		}
	},
	_natrualWidth: 0,
	_natrualHeight: 0,

	// Handler
	handleLoad(evt){
		this._naturalWidth = evt.target.naturalWidth
		this._naturalHeight = evt.target.naturalHeight

		this.props.handleLoad && this.props.handleLoad()
		this.setState({
			imageLoaded: true,
		})
	},
	getImageStyle(){
		if (!this.state.imageLoaded) {
			return {
				opacity: 0,
				display: 'hidden'
			}
		}

		// scale the image and crop it
		const scale = Math.max(this.props.width / this._naturalWidth, this.props.height / this._naturalHeight) || 1
		const scaledFrame = _.map([this._naturalWidth, this._naturalHeight], v=>v*scale) 
		return {
			position: 'absolute',
			zIndex: 1,
			top: -(scaledFrame[1]-this.props.height)/2,
			left: -(scaledFrame[0]-this.props.width)/2,
			width: scaledFrame[0],
			height: scaledFrame[1],
			opacity: 0,
		}
	},
	getGrayStuffAnimation() {
		return this.state.imageLoaded ? {
			animation: {
				opacity: [0, 1],
			},
			duration: 300,
			runOnMount: true,
		} : null
	},
	getImageAnimation(imageStyle) {
		return this.state.imageLoaded ? this.props.getLoadedAnimation && this.props.getLoadedAnimation(imageStyle.width, imageStyle.height, imageStyle.left, imageStyle.top) || {
			animation: {
				opacity: [1, 0],
			},
			duration: 300,
			runOnMount: true,
		} : null
	},
	getContainerLoadedAnimation() {
		return this.state.imageLoaded ? this.props.getContainerLoadedAnimation && this.props.getContainerLoadedAnimation() || null : null
	},
	
	// Renderer
	render(){
		const {
			src,
			width,
			height,
			useGray,
			style,
		} = this.props
		const imageStyle = this.getImageStyle()

		return (
			<VelocityComponent {...this.getContainerLoadedAnimation()}>
				<div style={_.extend({width: width, height: height, position: 'relative', overflow: 'hidden', margin:0}, style)}>
					{/* a gray div stuffs the contianer when image is unloaded */}
					{useGray?(
						<VelocityComponent {...this.getGrayStuffAnimation()}>
							<div style={{backgroundColor: '#efefef', position: 'absolute', zIndex:2}}></div>
						</VelocityComponent>
					):null}
					<VelocityComponent {...this.getImageAnimation(imageStyle)}>
						<img 
							src={src} 
							width={width} 
							height={height}
							onLoad={this.handleLoad}
							style={imageStyle}
						>
						</img>
					</VelocityComponent>
				</div>
			</VelocityComponent>
		)
	},
})

export default Image 