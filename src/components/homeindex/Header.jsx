import React, {PropTypes} from 'react'
import styles from './Header.scss'

const Header = React.createClass({
	propTypes: {
		renderHeaderLeft: PropTypes.func,
		renderHeaderCenter: PropTypes.func,
		renderHeaderRight: PropTypes.func,
	},

	render: function(){
		const {
			renderHeaderLeft,
			renderHeaderCenter,
			renderHeaderRight,
		} = this.props

		return (
			<div className={styles.container} style={{height: window.headerHeight}}>
				{renderHeaderLeft && renderHeaderLeft('headerLeft') || <span></span>}
				{renderHeaderCenter && renderHeaderCenter('headerCenter') || <span></span>}
				{renderHeaderRight && renderHeaderRight('headerRight') || <span></span>}
			</div>
		)
	},
})

export default Header 