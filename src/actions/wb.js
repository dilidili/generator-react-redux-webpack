import config from '../config'
import axios from 'axios'

export const FETCH_WB_RECEIVED = 'FETCH_WB_RECEIVED'

export function fetchWb(){
    return (dispatch) => {
        axios.get(config.api.wb.get).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: FETCH_WB_RECEIVED,
                    payload: response.data.statuses
                })
            } else {
                throw Error(`${FETCH_WB_RECEIVED}`)
            }
        }).catch(() => {
            throw Error(`${FETCH_WB_RECEIVED}`)
        })
    }
}
