var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpConstants = require('./constants.js');

// Copy web fonts to dist
gulp.task('build:fonts', function() {
  return gulp.src(gulpConstants.FONTS_ORIGIN)
    .pipe(gulp.dest(gulpConstants.FONTS_DIST))
    .pipe($.size({
      title: 'fonts'
    }));
});