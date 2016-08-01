import React from 'react'
import styles from './Header.scss'

const Header = React.createClass({
	render: function(){
		return (
			<div className={styles.container} style={{height: window.headerHeight}}>
				{this.props.renderHeaderLeft('headerLeft')}
				{this.props.renderHeaderCenter('headerCenter')}
				<span></span>
			</div>
		)
	},
})

export default Header 