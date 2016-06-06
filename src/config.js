// App config the for development environment.
const devServerURL = 'http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com'

const devConfig = {
	debug: true,
	api: {
		wb: {
			get: `${devServerURL}/wb.json`,
		},
	}
}

// App config the for production environment.
const proConfig = {
	// debug: false,
	// apiServerUrl: serverURL,
	// api: {
	// }
}

const config = (process.env.NODE_ENV === "production") ? proConfig : devConfig
export default config
