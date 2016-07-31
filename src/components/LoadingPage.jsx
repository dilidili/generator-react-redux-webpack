import React, {PropTypes} from 'react'
import styles from './LoadingPage.scss'
import {Logo} from 'svg'
import {VelocityComponent, velocityHelpers} from 'velocity-react'

const animation = {
	loaded: velocityHelpers.registerEffect({
		calls: [
			[{
				scale: 0.85,
			}, 0.5, {
				easing: 'ease-in',
			}],
			[{
				scale: 30,
			}, 0.3, {
				easing: 'ease-out',
			}],
		],
	})
}

const LoadingComponent = React.createClass({
	propTypes: {
		loadedCallback: PropTypes.func,
		isLoaded: PropTypes.bool,
	},
	getDefaultProps() {
		return {
			isLoaded: false,
		}
	},

	render(){
		const {
			isLoaded,
			loadedCallback,
		} = this.props

		return <div className={styles.container}>
			<VelocityComponent animation={isLoaded ? animation.loaded : {}} complete={()=>{isLoaded && loadedCallback && loadedCallback()}}>
				<Logo fillColor='#fff'></Logo>				
			</VelocityComponent>
		</div>
	},
})

export default LoadingComponent