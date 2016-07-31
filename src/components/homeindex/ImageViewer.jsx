import React, {PropTypes} from 'react'
import styles from './ImageViewer.scss'
import _ from 'underscore'
import Image from '../common/Image'
import {VelocityComponent, velocityHelpers} from 'velocity-react'

const ImageViwer = React.createClass({
	propTypes: {
		style: PropTypes.object.isRequired,
	},
	componentDidMount() {
		this._animation = this.getAnimation()
	},
	getAnimation(props) {
		return {
			show: velocityHelpers.registerEffect({
				calls: [
					[{
						opacity: [1, 0],
					}, 0.2, {
						easing: 'ease-in',
					}],
					[{
						scale: 1,
					}, 0.5, {
						easing: 'ease-out',
					}],
				],
			})
		}
	},
	render: function() {
		const {
			style: {
				defaultSrcIndex,
				src,
			},
		} = this.props

		return (
			<div className={styles.container} style={_.pick(this.props.style, 'top', 'left', 'width', 'height')}>
				<VelocityComponent animation={this._animation.show} runOnMount={true}>
					<Image src={src[defaultSrcIndex].thumb} width={this.props.style.width} height={this.props.style.height} useGray={false}/>
				</VelocityComponent>
			</div>
		)
	},
})

export default ImageViwer 