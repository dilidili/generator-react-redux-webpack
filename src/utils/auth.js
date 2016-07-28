import axios from 'axios'
import config from '../config'

// Authentication process
// Refer to https://www.cs.cmu.edu/~lingwang/weiboguide/
export function initialAuth() {
	if (config.debug) return

	const isCodeRedirect = ~window.location.href.indexOf('auth?code=')

	if (!localStorage.getItem("token") && !isCodeRedirect) {
		// Unauthorized 
		window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=1776573903&redirect_uri=${window.location.href}&response_type=code`
	}
}

// export function fetchAccessToken(resolve, reject) {
// 	const code = localStorage.getItem('code') || window.location.href.split('/auth?code=')[1]

// 	axios({
// 		method: 'post',
// 		url: 'http://localhost:3154/auth/accessToken',
// 		data: {
// 			client_id: 1776573903,
// 			client_secret: '7ce9d028bef1e3c82f73f9dd3156c558',
// 			grant_type: 'authorization_code',
// 			code,
// 			redirect_uri: 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com',
// 		},
// 	}).then((response) => {
// 		console.log(response)
// 		resolve()
// 	})
// }