import React from 'react'
import styles from './Tweet.scss'

export function getTweetHeight(info){
	console.log(info)
}

const Tweet = React.createClass({
	getDefaultProps(){
		return {}
	},	

	render: function(){
		return <div className={styles.container}>
			<div className={styles.content}>

			</div>	
		</div> 
	},
})

export default Tweet 