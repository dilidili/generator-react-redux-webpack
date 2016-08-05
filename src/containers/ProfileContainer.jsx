import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './ProfileContainer.scss'
import Surface from 'react-canvas/Surface' 
import Gradient from 'react-canvas/Gradient'

const ProfileComponent = React.createClass({
	componentWillMount(){
		this._canvasFrame = {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		}
	},
	getInitialState() {
		return {
			scrollTop: 0,
		}
	},
	componentWillMount(){
			
	},

	render: function() {
		return <div className={styles.container}>
			<Surface {...this._canvasFrame}>
				{/* Gradient area on the top */}
				<Gradient style={this.getGradientStyle()}
					colorStops={[
						{color: "#2a6488", position: 0},	
						{color: "#3881b2", position: 1},	
					]}
				>
				</Gradient>

			</Surface>
		</div>
	},

	// Style getter
	getGradientStyle(){
		return {
			top: 0,
			left: 0,
			width: this._canvasFrame.width,
			height: this._canvasFrame.height * 0.18
		}
	},
})

function mapStateToProps(state) {
	return {}
}
function mapDispatchToProps(dispatch) {
	return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)