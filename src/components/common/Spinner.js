import React from 'react'
import spinner from 'spin.js'

const Spinner = React.createClass({
	propTypes: {
		config: React.PropTypes.object,
		stopped: React.PropTypes.bool,
		className: React.PropTypes.string,
	},
	getDefaultProps() {
		return {
			stopped: false,
			className: "",
			config: {
				lines: 13, // The number of lines to draw
				length: 28, // The length of each line
				width: 14, // The line thickness
				radius: 42, // The radius of the inner circle
				scale: 0.14, // Scales overall size of the spinner
				corners: 1, // Corner roundness (0..1)
				color: '#8899a6', // #rgb or #rrggbb or array of colors
				opacity: 0.25, // Opacity of the lines
				rotate: 0, // The rotation offset
				direction: 1, // 1: clockwise, -1: counterclockwise
				speed: 1, // Rounds per second
				trail: 60, // Afterglow percentage
				fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
				zIndex: 2e9, // The z-index (defaults to 2000000000)
				className: 'spinner', // The CSS class to assign to the spinner
				top: '50%', // Top position relative to parent
				left: '50%', // Left position relative to parent
				shadow: false, // Whether to render a shadow
				hwaccel: false, // Whether to use hardware acceleration
				position: 'absolute', // Element positioning
			},
		}
	},
	componentDidMount: function() {
		this.spinner = new spinner(this.props.config)
		if (!this.props.stopped) {
			this.spinner.spin(this.refs.container)
		}
	},
	componentWillReceiveProps: function(newProps) {
		if (newProps.stopped && !this.props.stopped) {
			this.spinner.stop()
		} else if (!newProps.stopped && this.props.stopped) {
			this.spinner.spin(this.refs.container)
		}
	},
	componentWillUnmount: function() {
		this.spinner.stop()
	},

	render: function() {
		return <div ref="container" className={this.props.className}/>
	}
})

export default Spinner