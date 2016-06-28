import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './FootTabContainer.scss'
import homeIcon from 'images/home.svg'
import InlineSVG from 'svg-inline-react'
import _ from 'underscore'

const TAB_CONTENT = [{
	icon: homeIcon,
	text: '主页',
}]

const FootTabComponent = React.createClass({
	// Render
	render: function(){
		return (
			<div className={styles.container}>
				{/* render foot tab item */}
				{
					_.map(TAB_CONTENT, (v, k)=>{
						return <div key={k} className={styles.tab}>
							<InlineSVG raw src={v.icon}></InlineSVG>	
							<div>{v.text}</div>
						</div>
					})
				}
			</div>
		)
	},
})

function mapStateToProps(state){
    return {
    }
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FootTabComponent)