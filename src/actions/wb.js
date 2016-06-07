import config from '../config'
import axios from 'axios'

export const LOAD_WB = ['LOAD_WB_REQUEST', 'LOAD_WB_SUCCESS', 'LOAD_WB_FAILURE'] 

export function fetchWb() {
    return {
        types: LOAD_WB,
        shouldCallAPI: (state)=>state.getIn(['wb','list']).size===0,
        callAPI: () => axios.get(config.api.wb.get),
        payload: {
            date: Date.now(),
        },
    }
}