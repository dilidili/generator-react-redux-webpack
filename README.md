# isomorphicTwitter

> See the demo on [isomorphicTwitter](http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com/home/)

[isomorphicTwitter](http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com/home/) is a small isomorphic ([twitter](http://twitter.com)) web application featuring tweets from [Weibo](http://weibo.com).

It is built on [express](http://expressjs.com) using [React](https://facebook.github.io/react) and [Redux](https://github.com/reactjs/redux). It is developed with [webpack](http://webpack.github.io) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/) and written with [babeljs](http://babeljs.io) with the help of [eslint](http://eslint.org).

<div style="text-align:center"><img src="https://cloud.githubusercontent.com/assets/5905726/17507710/c6f4ac72-5e43-11e6-8e6b-d142cd168873.png" width="500"></div>

The intent of this project is to solidify my experience with these technologies and perhaps to inspire other developers in their journey with React and Redux. It works also as example of a javascript development environment with all the cool recent stuff :-)

- See the demo on [isomorphicTwitter](http://isomorphic-wb.oss-cn-hangzhou.aliyuncs.com/home/) !
- clone this repo and run to confirm it is actually working
- read on for some technical details

**Clone this repo**

**Note** This app has been tested on node 6.3.0 

```
git clone https://github.com/dilidili/react-canvas-isomorphic.git
cd react-canvas-isomorphic.git
npm install
```

**Start the app**

```bash
npm start
```

and open [localhost:8080](http://localhost:8080).

You can also try the built app:

```bash
npm run build   # First, build for production
npm run server    # then, run a expressjs server to verify the project working actually
```

then open [localhost:3000](http://localhost:3000).

## The React Canvas

[Introductory blog post](http://engineering.flipboard.com/2015/02/mobile-web/)

React Canvas adds the ability for React components to render to `<canvas>` rather than DOM.

That project is a work-in-progress. Though much of the code is in production on flipboard.com, the React canvas bindings are relatively new and the API is subject to change. Therefore, This project provides some bug-fix features as follows:
* ListView now can accepts that each item is not of the same height.
* Images loaded and Fonts loaded now cause the rerendering of their backstoring ancestor layer.
* Add the event bubble process to original event modle for enriching users' input.

## Other important libs
* react-motion
* post-css
* axios
* immutable.js
* linebreak
* velocity-react
* [Development](#development)
  * [Webpack](#webpack)
  * [Babeljs](#babeljs)
  * [Linting](#linting)

## Application structure

```bash
.
├── server.js           # Starts the express server for testing prod bundle
├── sass_modules        # Contains some scss modules are same as node modules can be directly imported by src files 
├── webpack.config.js   # Webpack Config for develop mode
├── webpack.deploy.config.js   # Webpack Config for production mode
├── src
│   ├── client.js       # Entry point for the client
│   ├── config.js       
│   │
│   ├── routes.js       # Routes used by redux-router
│   │
│   ├── server.js       # Start the express server and render the routes server-side
│   │
│   ├── actions         # Redux actions
│   ├── reducers        # Redux reducers
│   ├── store          	# Redux store
│   │
│   ├── components      # React components
│   ├── containers      # React containers
│   │   ├── ...
│   │
│   ├── enhancers       # React HOI containers
│   │   ├── ...
│   │
│   ├── public          # static files
│   ├── server          # Server-side only code
│   │
│   └── utils         
│       ├── react-canvas           # Lib to render whole canvas 
│       ├── Animate.js         	   # Utility to assist scroll animation 
│       ├── touch-emulator.js      # Emulate touch registers when visited by PC
│       ├── IntlUtils.js           # Utilities to load `Intl` and locale-data
│       ├── middlewares.js         # Middlewares of redux
│       └── auth.js     		   # Auth2.0 access controller
└── dist
    ├── index.html      # Static entry
    └── build           # Output files for webpack on production
