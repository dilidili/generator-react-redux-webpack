const gulp = require('gulp')
const argv = require('yargs').argv
const cmp = require('./gulp_modules/component')
const fs = require('fs')

gulp.task('cmp', function(){
	const targetFile = argv['t'] || argv['target']

	console.log(gulp.src(targetFile.toString()))
})