// App config the for development environment.
const devServerURL = 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com'
const proServerURL = 'http://api.weibo.com/2'
const isProduction = process.env.NODE_ENV === "production"

const devConfig = {
	debug: true,
	api: {
		tweet: {
			get: `${devServerURL}/tweet.json`,
		},
	},
	token: "00EXkndCCY6kPE311ddb9e8cY46BmD",
}

// App config the for production environment.
const proConfig = {
	debug: false,
	api: {
		tweet: {
			get: `${devServerURL}/statuses/friends_timeline.json`,
		},
	},
}

const config = isProduction ? proConfig : devConfig
if (!isProduction) {
	require('touch-emulator')()
}

export default config
