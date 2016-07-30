import config from '../config'
import axios from 'axios'
import _ from 'underscore'

export const LOAD_TWEET = ['LOAD_TWEET_REQUEST', 'LOAD_TWEET_SUCCESS', 'LOAD_TWEET_FAILURE'] 
export const LOAD_TWEET_DETAIL_TIMELINE = ['LOAD_TWEET_DETAIL_TIMELINE_REQUEST', 'LOAD_TWEET_DETAIL_TIMELINE_SUCCESS', 'LOAD_TWEET_DETAIL_TIMELINE_FAILURE'] 

let lastFetchTweet = 0
export function fetchTweet(token, params={}) {
    return {
        types: LOAD_TWEET,
        callAPI: () => {
            if (Date.now() - lastFetchTweet > config.apiLimit) {
                lastFetchTweet = Date.now()

                return axios.get(`${config.serverURL}/tweet/${token}/follow`, {
                    params,
                })
            } else {
                return new Promise((resolve, reject) => {
                    reject()
                })
            }
        },
        payload: {
            isFetchingTopTweet: _.has(params, 'since_id'),
            isFetchingBottomTweet: _.has(params, 'max_id'),
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