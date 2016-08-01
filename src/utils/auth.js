import axios from 'axios'
import config from '../config'

// Authentication process
// Refer to https://www.cs.cmu.edu/~lingwang/weiboguide/
export function initialAuth() {
	if (config.debug) return

	const isCodeRedirect = ~window.location.href.indexOf('?code=')

	if (!localStorage.getItem("token") && !isCodeRedirect) {
		// Unauthorized 
		window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=1776573903&redirect_uri=${window.location.href}&response_type=code`
	}
}