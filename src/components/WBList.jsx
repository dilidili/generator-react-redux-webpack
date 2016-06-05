import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ReactCanvas from 'react-canvas'

const WBListComponent = React.createClass({
	getListViewStyle: function() {
		var size = this.getSize()
		return {
			top: 0,
			left: 0,
			width: size.width,
			height: size.height
		}
	},

	propTypes: {
		size: PropTypes.object.isRequired,
	},
	render: function(){
		return (
			<ReactCanvas.Surface top={0} left={0} width={size.width} height={size.height}>
				<ReactCanvas.ListView
					style={this.getListViewStyle()}
					snapping={true}
					scrollingDeceleration={0.92}
					scrollingPenetrationAcceleration={0.13}
					numberOfItemsGetter={this.getNumberOfPages}
					itemHeightGetter={this.getPageHeight}
					itemGetter={this.renderPage} />
			</ReactCanvas.Surface>
		)
	},
})

export default WBListComponent