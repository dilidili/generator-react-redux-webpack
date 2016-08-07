import config from '../config'
import axios from 'axios'

export const QUERY_TOKEN = ['QUERY_TOKEN_REQUEST', 'QUERY_TOKEN_SUCCESS', 'QUERY_TOKEN_FAILURE'] 
export const UPDATE_TOKEN_INFO = 'UPDATE_TOKEN_INFO'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

export function queryToken(code) {
    return {
        types: QUERY_TOKEN,
        callAPI: () => axios.get(`${config.serverURL}/auth/token/${code}`),
    }
}

// Fetch the token information and the user information according to the token supplied.
export function fetchAuthInfo(){
	return dispatch	=> {
		// TODO: deploy token get
		const token = config.token ? config.token : ""
		axios.get(`${config.serverURL}/auth/token/${token}/info`).then(tokenInfoRes=>{
			dispatch({
				type: UPDATE_TOKEN_INFO,
				payload: tokenInfoRes.data,
			})

			axios.get(`${config.serverURL}/auth/user/${tokenInfoRes.data.uid}`, {
				params: {
					access_token: token,
				},
			}).then((userInfoRes) => {
				dispatch({
					type: UPDATE_USER_INFO,
					payload: userInfoRes.data,
				})
			})
		})
	}
}