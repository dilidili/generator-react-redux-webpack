import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './FootTabContainer.scss'
import homeIcon from 'images/home.svg'
import notificationIcon from 'images/notification.svg'
import messageIcon from 'images/message.svg'
import meIcon from 'images/me.svg'
import {Me, Message, Home, Notification} from 'svg'
import InlineSVG from 'svg-inline-react'
import {push} from 'redux-router'
import classNames from 'classnames'
import _ from 'underscore'

const TAB_CONTENT = [{
	icon: Home,
	text: '主页',
	pathname: '/home',
},{
	icon: Notification,	
	text: '通知',
	pathname: '/notification',
},{
	icon: Message,	
	text: '私信',
	pathname: '/message',
},{
	icon: Me,	
	text: '我',
	pathname: '/profile',
}]

const FootTabComponent = React.createClass({
	// Handler
	handleClickTab: function(){
		arguments[1].preventDefault()
		arguments[1].stopPropagation()
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
						const isCurrentTab = v.pathname.startsWith(this.props.pathname)
						const color = isCurrentTab?"#1da1f2":"#8899a6"
						const Icon = v.icon

						return <div key={k} className={classNames(styles.tab, isCurrentTab?styles.tabClicked:"")}
									onClick={this.handleClickTab.bind(this, v.pathname)}
									onTouchStart={this.handleClickTab.bind(this, v.pathname)}
								>
								<Icon pathStyle={{fill: color}}></Icon>
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