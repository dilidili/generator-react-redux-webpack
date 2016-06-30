import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './Header.scss'
import InlineSVG from 'svg-inline-react'

const Header = React.createClass({
	render: function(){
		return (
			<div className={styles.container}>
				<InlineSVG raw src={require('../../public/images/logo.svg')}></InlineSVG>
			</div>
		)
	},
})

export default Header 