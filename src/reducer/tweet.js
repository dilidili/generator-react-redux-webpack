import {Map, List} from 'immutable'
import {LOAD_TWEET} from '../actions/tweet'
import {LOAD_TWEET_DETAIL_TIMELINE} from '../actions/tweet'

const initialState = Map({
    list: List([]),
    loadingDetailTimeline: Map({
        isLoading: false,
        token: 0,
    }),
})

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TWEET[1]:
            if (action.response.status === 200) {
                // Add new tweets to list
                return state.update('list', list => list.mergeDeepWith((prev, next) => next, formatTweetList(action.response.data.statuses)))
            }
            return state

        case LOAD_TWEET_DETAIL_TIMELINE[0]:
            return state.setIn(['loadingDetailTimeline', 'isLoading'], true).setIn(['loadingDetailTimeline', 'token'], action.token)
        case LOAD_TWEET_DETAIL_TIMELINE[1]:
            return state.setIn(['loadingDetailTimeline', 'isLoading'], false).setIn(['loadingDetailTimeline', 'token'], action.token)
        default:
            return state
    }
}

// Utils
export function getTweetDetail(list, tid){
    tid = Number.parseInt(tid)
    return list.find((v, k)=>v.get('id')===tid)
}

function formatTweetList(rawData) {
    return List(rawData).map(v => formatTweet(v))
}

function formatTweet(v) {
    if (!v) return null

    return Map({
        user: v.user.name,
        tweet: v.text,
        timestamp: new Date(v.created_at),
        avatar: v.user.profile_image_url,
        retweeted: formatTweet(v.retweeted_status),
        retweet: Map({
            count: v.reposts_count,
        }),
        like: Map({
            count: v.attitudes_count,
        }),
        id: v.id,
    })
}