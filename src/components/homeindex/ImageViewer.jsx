import React, {PropTypes} from 'react'
import styles from './ImageViewer.scss'
import _ from 'underscore'
import Image from '../common/Image'
import {velocityHelpers} from 'velocity-react'

const ImageViwer = React.createClass({
	propTypes: {
		appearFrame: PropTypes.object.isRequired,
		srcList: PropTypes.object.isRequired,
		defaultIndex: PropTypes.number.isRequired,
	},

	// Getter
	getLoadedAnimation(imageWidth, imageHeight, imageLeft, imageTop){
		const {appearFrame} = this.props
		let imageTransformation
		// const deltaTop = window.innerWidth / 2 - appearFrame.get('left') - imageWidth / 2
		// const deltaLeft = window.innerHeight / 2 - appearFrame.get('top') - imageHeight / 2

		if (imageWidth > imageHeight) {
			const scale = window.innerWidth / imageWidth
			imageTransformation = {
				width: window.innerWidth,
				height: scale * imageHeight,
				top: window.innerHeight / 2 - scale * imageHeight / 2,
				left: 0,
			}
		} else {
			const scale = window.innerHeight / imageHeight
			imageTransformation = {
				height: window.innerHeight,
				width: window.innerWidth * scale,
				top: 0,
				left: window.innerWidth / 2 - scale * imageWidth / 2,
			}
		}

		return {
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
		}
	},
	getContainerLoadedAnimation(){
		return {
			animation: {
				left: 0,
				top: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			},
			duration: 350,
			delay: 300,
			runOnMount: true,
		}
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
			<div className={styles.container} style={{top:-window.headerHeight, left:0, width: window.innerWidth, height: window.innerHeight}}>
				<Image 
					src={srcList.getIn([defaultIndex, 'middle'])} 
					width={appearFrame.get('width')} 
					height={appearFrame.get('height')} 
					useGray={false} 
					style={{borderRadius:5, top: appearFrame.get('top')+window.headerHeight, left: appearFrame.get('left')}}
					getLoadedAnimation={this.getLoadedAnimation}	
					getContainerLoadedAnimation={this.getContainerLoadedAnimation}
				/>
			</div>
		)
	},
})

export default ImageViwer 