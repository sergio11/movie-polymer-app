var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpConstants = require('./constants.js');

// Optimize images
gulp.task('build:images', function() {
  return gulp.src(gulpConstants.IMAGES_ORIGIN)
  	.pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(gulpConstants.IMAGES_DIST))
    .pipe($.size({title: 'images'}));
});