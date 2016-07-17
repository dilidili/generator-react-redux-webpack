import {Map, List} from 'immutable'
import {LOAD_TWEET} from '../actions/tweet'

const initialState = Map({
    list: List([]),
})

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TWEET[1]:
            if (action.response.status === 200) {
                // Add new tweets to list
                return state.update('list', list => list.mergeDeepWith((prev, next) => next, formatTweetList(action.response.data.statuses)))
            }
            return state
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
    return List(rawData).map(v => Map({
        user: v.user.name,
        tweet: v.text,
        timestamp: new Date(v.created_at),
        avatar: v.user.profile_image_url,
        retweet: {
            count: v.reposts_count,
        },
        like: {
            count: v.attitudes_count,
        },
        id: v.id,
    }))
}