import React from 'react'
import styles from './Tweet.scss'

// get height of tweet according to the content. 
// react-infinite will use the result to define the tweet list.
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