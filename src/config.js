import _ from 'underscore'

// App config the for development environment.
const devServerURL = 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com'
const isProduction = process.env.NODE_ENV === "production"

const config = _.extend({
	debug: !isProduction,
	// serverURL: isProduction ? 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com' : "http://192.168.1.100:3154",
	serverURL: !isProduction ? "http://192.168.1.101:3154" : "http://120.55.67.18:3154",
	apiLimit: 3000,
}, isProduction ? {
	token: "2.00EXkndCCY6kPEe126ddd16avqo8PC",
} : {
	token: "2.00EXkndCCY6kPEe126ddd16avqo8PC",
})

export default config
