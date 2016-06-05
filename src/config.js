// App config the for development environment.
const serverURL = 'ngs-children.oss-cn-shanghai.aliyuncs.com'

const devConfig = {
	debug: true,
	apiServerUrl: serverURL,
	api: {
	}
}

// App config the for production environment.
const proConfig = {
	debug: true,
	apiServerUrl: serverURL,
	api: {
	}
}

const config = (process.env.NODE_ENV === "production") ? proConfig : devConfig
export default config
