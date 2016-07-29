import {Map, List} from 'immutable'
import {LOAD_TWEET} from '../actions/tweet'
import {LOAD_TWEET_DETAIL_TIMELINE} from '../actions/tweet'

const initialState = Map({
    list: List([]),
    isListTopLoading: false,
    isListBottomLoading: false,

    loadingDetailTimeline: Map({
        isLoading: false,
        token: 0,
    }),
})

function sortByTimeline(a, b) {
    return new Date(b.get('timestamp')) - new Date(a.get('timestamp'))
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TWEET[0]:
            return state.set(action.isFetchingTopTweet ? 'isListTopLoading' : 'isListBottomLoading', true)
        case LOAD_TWEET[1]:
            // Add new tweets to list
            return state.update('list', list => list.concat(formatTweetList(action.response.data.statuses)).sort(sortByTimeline))
                .set(action.isFetchingTopTweet ? 'isListTopLoading' : 'isListBottomLoading', false)
        case LOAD_TWEET[2]:
            return state.set(action.isFetchingTopTweet ? 'isListTopLoading' : 'isListBottomLoading', false)

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
    return List(rawData).filter(v => v && !v.deleted).map(v => formatTweet(v))
}

function formatTweet(v) {
    // recursion formate retweeted tweet
    if (!v || v.deleted) return null

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