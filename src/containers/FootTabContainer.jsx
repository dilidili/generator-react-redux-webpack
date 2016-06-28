import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './FootTabContainer.scss'
import homeIcon from 'images/home.svg'
import notificationIcon from 'images/notification.svg'
import messageIcon from 'images/message.svg'
import meIcon from 'images/me.svg'
import InlineSVG from 'svg-inline-react'
import {push} from 'redux-router'
import _ from 'underscore'

const TAB_CONTENT = [{
	icon: homeIcon,
	text: '主页',
	pathname: '/home',
},{
	icon: notificationIcon,	
	text: '通知',
	pathname: '/notification',
},{
	icon: messageIcon,	
	text: '私信',
	pathname: '/message',
},{
	icon: meIcon,	
	text: '我',
	pathname: '/profile',
}]

const FootTabComponent = React.createClass({
	// Handler
	handleClickTab: function(){
		arguments[1].preventDefault()
		this.props.push(arguments[0])
	},

	// Render
	render: function(){
		return (
			<div className={styles.container}>
				{/* render foot tab item */}
				{
					_.map(TAB_CONTENT, (v, k)=>{
						// highlight current tab 
						const color = v.pathname.startsWith(this.props.pathname)?"#1da1f2":"#8899a6"

						return <div key={k} className={styles.tab}
									onClick={this.handleClickTab.bind(this, v.pathname)}
									onTouchStart={this.handleClickTab.bind(this, v.pathname)}
								>
							<InlineSVG raw src={v.icon} style={{fill: color}}></InlineSVG>	
							<div className={styles.label} style={{color: color}}>{v.text}</div>
						</div>
					})
				}
			</div>
		)
	},
})

function mapStateToProps(state){
    return {
    	pathname: state.get('route').location.pathname,
    }
}

function mapDispatchToProps(dispatch){
    return {
    	push: bindActionCreators(push, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FootTabComponent)