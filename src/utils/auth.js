import axios from 'axios'

// Authentication process
// Refer to https://www.cs.cmu.edu/~lingwang/weiboguide/
export function initialAuth() {
	const isRedirect = ~window.location.href.indexOf('auth?code=')

	if (!localStorage.getItem("code") && !isRedirect) {
		// Unauthorized 
		window.location.href = "https://api.weibo.com/oauth2/authorize?client_id=1776573903&redirect_uri=http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com/auth&response_type=code"
	}
}

export function fetchAccessToken(resolve, reject){
	const code = localStorage.getItem('code') || window.location.href.split('/auth?code=')[1]

	// WB2.anyWhere((W)=>{
	// 	W.parseCMD("/access_token", function(sResult, bStatus) {
	// 		try {
	// 			console.log(sResult)
	// 			console.log(bStatus)
	// 		} catch (e) {}
	// 	}, {
	// 		client_id: 1776573903,
	// 		client_secret: '7ce9d028bef1e3c82f73f9dd3156c558',
	// 		grant_type: 'authorization_code',
	// 		code,
	// 	},{
	// 		method: 'post'
	// 	})
	// })
	axios({
		method: 'post',
		url: 'http://120.55.67.18:3154/auth/accessToken',
		data: {
			client_id: 1776573903,
			client_secret: '7ce9d028bef1e3c82f73f9dd3156c558',
			grant_type: 'authorization_code',
			code,
			redirect_uri: 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com',
		},
	}).then((response) => {
		console.log(response)
		resolve()
	})
}