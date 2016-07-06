import React from 'react'
import _ from 'underscore'
import {VelocityComponent} from 'velocity-react'

const Image = React.createClass({
	getDefaultProps(){
		return {
			src: 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com/avatar.jpeg',
			width: 400,
			height: 400,
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
			duration: 5200,
			runOnMount: true,
		} : null
	},
	getImageAnimation() {
		return this.state.imageLoaded ? {
			animation: {
				opacity: [1, 0],
			},
			duration: 5200,
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
			<div style={{width: width, height: height, position: 'relative', overflow: 'hidden'}}>
				{/* a gray div stuffs the contianer when image is unloaded */}
				<VelocityComponent {...this.getGrayStuffAnimation()}>
					<div style={{backgroundColor: '#efefef', position: 'absolute', zIndex:2}}></div>
				</VelocityComponent>
				<VelocityComponent {...this.getImageAnimation()}>
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
		)
	},
})

export default Image 