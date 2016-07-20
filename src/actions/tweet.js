import config from '../config'
import axios from 'axios'

export const LOAD_TWEET = ['LOAD_TWEET_REQUEST', 'LOAD_TWEET_SUCCESS', 'LOAD_TWEET_FAILURE'] 
export const LOAD_TWEET_DETAIL_TIMELINE = ['LOAD_TWEET_DETAIL_TIMELINE_REQUEST', 'LOAD_TWEET_DETAIL_TIMELINE_SUCCESS', 'LOAD_TWEET_DETAIL_TIMELINE_FAILURE'] 

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

export function fetchTweetDetailTimeline(token) {
    return {
        types: LOAD_TWEET_DETAIL_TIMELINE,
        callAPI: () => new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve()
            }, 3000)
        }),
        payload: {
            token: token,
        },
    }
}