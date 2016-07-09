import React, {PropTypes} from 'react'
import _ from 'underscore'
import {VelocityComponent} from 'velocity-react'

const Image = React.createClass({
	propTypes: {
		src: PropTypes.string.isRequired,
		width: PropTypes.number,	
		height: PropTypes.number,	
		className: PropTypes.string,
	},
	getDefaultProps(){
		return {
			src: '',
			width: 200,
			height: 200,
		}
	},
	getInitialState(){
		return {
			imageLoaded: false,
		}
	},
	_natrualWidth: 0,
	_natrualHeight: 0,

	handleLoad(evt){
		this._naturalWidth = evt.target.naturalWidth
		this._naturalHeight = evt.target.naturalHeight
		this.setState({
			imageLoaded: true,
		})
	},
	getImageStyle(){
		if (!this.state.imageLoaded) {
			return {
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
	getImageAnimation() {
		return this.state.imageLoaded ? {
			animation: {
				opacity: [1, 0],
			},
			duration: 300,
			runOnMount: true,
		} : null
	},

	render(){
		const {
			src,
			width,
			height,
		} = this.props
		const imageStyle = this.getImageStyle()	

		return (
			<div className={this.props.className} style={{width: width, height: height, position: 'relative', overflow: 'hidden'}}>
				{/* a gray div stuffs the contianer when image is unloaded */}
				<VelocityComponent {...this.getGrayStuffAnimation()}>
					<div className={this.props.className} style={{backgroundColor: '#efefef', position: 'absolute', zIndex:2}}></div>
				</VelocityComponent>
				<VelocityComponent {...this.getImageAnimation()}>
					<img 
						src={src} 
						width={width} 
						height={height}
						onLoad={this.handleLoad}
						style={imageStyle}
						className={this.props.className}
					>
					</img>
				</VelocityComponent>
			</div>
		)
	},
})

export default Image 