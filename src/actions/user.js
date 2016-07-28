import config from '../config'
import axios from 'axios'

export const QUERY_TOKEN = ['QUERY_TOKEN_REQUEST', 'QUERY_TOKEN_SUCCESS', 'QUERY_TOKEN_FAILURE'] 

export function queryToken(code) {
    return {
        types: QUERY_TOKEN,
        callAPI: () => axios.get(`${config.serverURL}/auth/token/${code}`),
    }
}