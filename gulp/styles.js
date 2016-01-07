'use strict';

var gulp = require('gulp');
var ifElse = require('gulp-if-else');
var gulpConstants = require('./constants.js');
var $ = require('gulp-load-plugins')();
var htmlAutoprefixer = require('gulp-html-autoprefixer');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


// Compile and automatically prefix stylesheets
gulp.task('build:styles', function() {
  return gulp.src(gulpConstants.STYLES_ORIGIN)
    .pipe(ifElse(false,function(){
    	return $.autoprefixer(AUTOPREFIXER_BROWSERS);
    },htmlAutoprefixer))
    .pipe(gulp.dest('.tmp/' + gulpConstants.STYLES_ORIGIN))
    .pipe(ifElse(false,$.minifyCss,function(){
    	return $.minifyHtml({
	      quotes: true,
	      empty: true,
	      spare: true
	    });
    }))
    .pipe(gulp.dest(gulpConstants.STYLES_DIST))
    .pipe($.size({title: gulpConstants.STYLES_ORIGIN}));
});
