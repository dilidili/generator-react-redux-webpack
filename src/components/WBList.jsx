import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ReactCanvas from 'react-canvas'
import WB from './WB'

const WBListComponent = React.createClass({
	// getter
	getListViewStyle: function() {
		return {
			top: 0,
			left: 0,
			width: this.props.size.width,
			height: this.props.size.height,
		}
	},
	getNumberOfPages: function(){
		return this.props.wb.length
	},
	getPageHeight: function(){
		return this.props.size.height
	},

	// lifecycle
	propTypes: {
		size: PropTypes.object.isRequired,
		wb: PropTypes.array.isRequired,
	},
	renderWb: function(wbIndex, scrollTop){
		const wb = this.props.wb[wbIndex] 
		const pageScrollTop = wbIndex * this.getPageHeight() - scrollTop
	    return (
			<WB
				width={this.props.size.width}
				height={this.props.size.height}
				wb={wb}
				scrollTop={pageScrollTop}/>
	    )
	},
	render: function(){
		// avoid useless render
		if (this.props.wb.length<=0) return null

		const {size} = this.props

		return (
			<ReactCanvas.Surface top={0} left={0} width={size.width} height={size.height}>
				<ReactCanvas.ListView
					style={this.getListViewStyle()}
					snapping={true}
					scrollingDeceleration={0.92}
					scrollingPenetrationAcceleration={0.13}
					numberOfItemsGetter={this.getNumberOfPages}
					itemHeightGetter={this.getPageHeight}
					itemGetter={this.renderWb} />
			</ReactCanvas.Surface>
		)
	},
})

export default WBListComponent