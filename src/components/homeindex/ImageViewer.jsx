import React, {PropTypes} from 'react'
import styles from './ImageViewer.scss'
import _ from 'underscore'
import Image from '../common/Image'
import {velocityHelpers, VelocityComponent} from 'velocity-react'

// frame of image container
const IMAGE_CONTAINER_FRAME = [window.innerWidth, window.innerHeight - window.fontSize * 8]

const ImageViwer = React.createClass({
	propTypes: {
		appearFrame: PropTypes.object.isRequired,
		srcList: PropTypes.object.isRequired,
		defaultIndex: PropTypes.number.isRequired,
		handClose: PropTypes.func.isRequired,
	},
	getInitialState(){
		return {
			isPresent: false,
		}
	},

	// Getter
	getLoadedAnimation(imageWidth, imageHeight, imageLeft, imageTop){
		const {appearFrame} = this.props
		let imageTransformation

		if (imageWidth / imageHeight > IMAGE_CONTAINER_FRAME[0] / IMAGE_CONTAINER_FRAME[1]) {
			const scale = IMAGE_CONTAINER_FRAME[0] / imageWidth
			imageTransformation = {
				width: IMAGE_CONTAINER_FRAME[0],
				height: scale * imageHeight,
				top: IMAGE_CONTAINER_FRAME[1] / 2 - scale * imageHeight / 2,
				left: 0,
			}
		} else {
			const scale = IMAGE_CONTAINER_FRAME[1] / imageHeight
			imageTransformation = {
				height: IMAGE_CONTAINER_FRAME[1],
				width: imageWidth * scale,
				top: 0,
				left: IMAGE_CONTAINER_FRAME[0] / 2 - scale * imageWidth / 2,
			}
		}

		return this.state.isPresent?{
			animation: velocityHelpers.registerEffect({
				calls: [
					// appear from invisibility 
					[{
						opacity: [1, 0],
					}, 0.3, {
						easing: 'ease-in',
					}],
					// scale to suitable size and move to centre of screen
					[_.extend(imageTransformation), 0.35, {
						easing: 'ease-out',
					}]
				],
			}),
			runOnMount: true,
		}: {
			animation: {
				width: imageWidth,
				height: imageHeight,
				left: imageLeft,
				top: imageTop,
			},
			runOnMount: true,
			duration: 350,

			// Close the image viewer
			complete: () => {
				this.props.handClose()
			},
		}
	},
	getContainerLoadedAnimation(){
		return this.state.isPresent ? {
			animation: {
				top: window.innerHeight / 2 - IMAGE_CONTAINER_FRAME[1] / 2,
				left: 0,
				width: IMAGE_CONTAINER_FRAME[0],
				height: IMAGE_CONTAINER_FRAME[1],
			},
			duration: 350,
			delay: 300,
			runOnMount: true,
		} : {
			animation: {
				top: this.props.appearFrame.get('top') + window.headerHeight,
				left: this.props.appearFrame.get('left'),
				width: this.props.appearFrame.get('width'),
				height: this.props.appearFrame.get('height'),
			},
			duration: 350,
			runOnMount: true,
		}
	},
	getBackgroundColorAnimation() {
		return this.state.isPresent ? {
			animation: {
				opacity: 1,
			},
			duration: 250,
			delay: 200,
			runOnMount: true,
		} : {
			animation: {
				opacity: 0,
			},
			duration: 250,
			delay: 200,
			runOnMount: true,
		}
	},

	// Handler
	handleClose(){
		this.setState({
			isPresent: false,
		})
	},

	// Renderer
	render: function() {
		const {
			appearFrame,
			srcList,
			defaultIndex,
		} = this.props

		return (
			// Full screen image viewer
			<div className={styles.container}
				style={{top:-window.headerHeight, left:0, width: window.innerWidth, height: window.innerHeight}}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEnd}
			>
				<VelocityComponent {...this.getBackgroundColorAnimation()}>
					<div className={styles.blackOverlay}>
						<span className={`Icon--close Icon ${styles.close}`} onClick={this.handleClose}></span>	

						<div className={styles.footerButton}>
							<span className={`Icon--reply Icon`}></span>	
							<span className={`Icon--retweet Icon`}></span>	
							<span className={`Icon--like Icon`}></span>	
							<span className={`Icon--other Icon`}></span>	
						</div>
					</div>
				</VelocityComponent>

				<Image 
					src={srcList.getIn([defaultIndex, 'middle'])} 
					width={appearFrame.get('width')} 
					height={appearFrame.get('height')} 
					useGray={false} 
					style={{borderRadius:5, top: appearFrame.get('top')+window.headerHeight, left: appearFrame.get('left')}}
					getLoadedAnimation={this.getLoadedAnimation}	
					getContainerLoadedAnimation={this.getContainerLoadedAnimation}
					handleLoad={()=>{this.setState({isPresent:true})}}
				/>
			</div>
		)
	},
})

export default ImageViwer 