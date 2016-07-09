import React from 'react'
import styles from './Header.scss'
import {Logo} from 'svg'

const Header = React.createClass({
	render: function(){
		return (
			<div className={styles.container}>
				<Logo></Logo>
			</div>
		)
	},
})

export default Header 