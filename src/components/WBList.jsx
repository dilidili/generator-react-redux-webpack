import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ReactCanvas from 'react-canvas'
import WB from './WB'
import styles from './WBList.scss'
import classNames from 'classnames'

const REPOST_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkU2RkFGNkE4RDVEMTFFNDlFNzRCRjA0MTBGMDE4MkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkU2RkFGNkI4RDVEMTFFNDlFNzRCRjA0MTBGMDE4MkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRkI2QjE2QjhENUIxMUU0OUU3NEJGMDQxMEYwMTgyQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRkI2QjE2QzhENUIxMUU0OUU3NEJGMDQxMEYwMTgyQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr+VOG8AAAcASURBVHja7JxpbFRV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"
const LIKE_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNjgwMTE3NDA3MjA2ODExQjQ5QkU4M0YzNEI0MDk3MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRTZGQUY2RjhENUQxMUU0OUU3NEJGMDQxMEYwMTgyQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRTZGQUY2RThENUQxMUU0OUU3NEJGMDQxMEYwMTgyQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA4ODAxMTc0MDcyMDY4MTFCNDlCRTgzRjM0QjQwOTczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA2ODAxMTc0MDcyMDY4MTFCNDlCRTgzRjM0QjQwOTczIi8+IDwvcmRmOkRlc2NyaXB0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"
const COMMENT_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAYAAAAc0MJxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNzgwMTE3NDA3MjA2ODExQjQ5QkU4M0YzNEI0MDk3MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRTZGQUY3MzhENUQxMUU0OUU3NEJGMDQxMEYwMTgyQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRTZGQUY3MjhENUQxMUU0OUU3NEJGMDQxMEYwMTgyQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA3ODAxMTc0MDcyMDY4MTFCNDlCRTgzRjM0QjQwOTczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA3ODAxMTc0MDcyMDY4MTFCNDlCRTgzRjM0QjQwOTczIi8+IDwvcmRmOkRlc2NyaXB0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"

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
	renderWbControlPanel: function(){
		return (
			<div className={styles.wbControlPanel}>
				<img className={classNames(styles.icon, styles.repost)} src={REPOST_SRC}/>	
				<img className={classNames(styles.icon, styles.like)} src={LIKE_SRC}/>	
				<img className={classNames(styles.icon, styles.comment)} src={COMMENT_SRC}/>	
			</div>
		)	
	},
	render: function(){
		// avoid useless render
		if (this.props.wb.length<=0) return null

		const {size} = this.props

		return (
			<div>
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
				{this.renderWbControlPanel()}
			</div>
		)
	},
})

export default WBListComponent