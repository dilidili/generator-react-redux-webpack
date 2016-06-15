import React, {PropTypes} from 'react'
import ReactCanvas from 'react-canvas'
import _ from 'underscore'
import logoURL from '../public/images/logo.jpg'
const Group = ReactCanvas.Group
const Image = ReactCanvas.Image
const PIC_PADDING = 1

function calculateMultiLayout(style, count) {
	const {
		top,
		left,
		width,
		height,
	} = style

	const sideWidth = Math.min(width, height)
	const picWidth = (sideWidth - 4 * PIC_PADDING) / 3
	const baseTop = top + (height - sideWidth) / 2
	const baseLeft = left + (width - sideWidth) / 2

	const layout = []
	let r, c
	_.each(_.range(count), function(index) {
		r = ~~(index / 3)
		c = index % 3

		layout.push({
			left: baseLeft + c * picWidth + 2 * c * PIC_PADDING,
			top: baseTop + r * picWidth + 2 * r * PIC_PADDING,
			width: picWidth,
			height: picWidth,
		})
	})
	layout.frame = _.extend({
		backgroundColor: "#eee",
	}, style)
	return layout
}

const WBImage = React.createClass({
	propTypes: {
		style: PropTypes.object.isRequired,
		wb: PropTypes.object.isRequired,
	},
	componentWillMount: function(){
		// calculate multi-picture layout if need
		const pic_length = this.props.wb.pic_urls.length
		if ( pic_length > 1) {
			this._multiLayout = calculateMultiLayout(this.props.style, pic_length)	
		}
		this.updateRender()
	},
	renderMultiPic: function(){
		return (
			<Group style={this._multiLayout.frame}>
				{
					_.map(this.props.wb.pic_urls, (url, index)=>{
						return <Image key={url.thumbnail_pic} style={this._multiLayout[index]} src={url.thumbnail_pic} fadeIn={false} useBackingStore={true}></Image>
					})
				}	
			</Group>
		)
	},
	updateRender: function(){
		switch(this.props.wb.pic_urls.length){
			case 0: 
				this._render = <Image style={this.props.style} src={logoURL} fadeIn={false} useBackingStore={true}/>
				break
			case 1:
				this._render = <Image style={this.props.style} src={this.props.wb.bmiddle_pic} fadeIn={false} useBackingStore={true}/>
				break
			default:
				this._render = this.renderMultiPic()
				break
		}
	},
	render: function(){
		return this._render
	},
})

export default WBImage