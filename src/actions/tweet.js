import config from '../config'
import axios from 'axios'

export const LOAD_TWEET = ['LOAD_TWEET_REQUEST', 'LOAD_TWEET_SUCCESS', 'LOAD_TWEET_FAILURE'] 

export function fetchTweet() {
    return {
        types: LOAD_TWEET,
        callAPI: () => axios.get(config.api.tweet.get, {
        	params: {
	        	access_token: config.token, 
        	},
        }),
        payload: {
            timestamp: Date.now(),
        },
    }
}