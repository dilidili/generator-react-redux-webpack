import React, {PropTypes} from 'react'

export default function ClickOverlayEnhancer(Component){
	const EnhanciveComponent = React.createClass({
		getInitialState(){
			return {
				isPressing: false,
			}
		},

		render(){
			return (
				<Component {...this.props}>
					{/* black overlay */}
					<div style={{
						position: 'absulote',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						blackgroundColor: `rgba(0, 0, 0, 0)`,
					}}></div>

					{this.props.children}
				</Component>
			)
		}
	})

	return EnhanciveComponent
}