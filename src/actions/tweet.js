import config from '../config'
import axios from 'axios'

export const LOAD_TWEET = ['LOAD_TWEET_REQUEST', 'LOAD_TWEET_SUCCESS', 'LOAD_TWEET_FAILURE'] 
export const LOAD_TWEET_DETAIL_TIMELINE = ['LOAD_TWEET_DETAIL_TIMELINE_REQUEST', 'LOAD_TWEET_DETAIL_TIMELINE_SUCCESS', 'LOAD_TWEET_DETAIL_TIMELINE_FAILURE'] 

export function fetchTweet(token, params={}, isFetchingTopTweet=true) {
    return {
        types: LOAD_TWEET,
        callAPI: () => axios.get(`${config.serverURL}/tweet/${token}/follow`, {
            params,
        }),
        payload: {
            timestamp: Date.now(),
            isFetchingTopTweet,
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