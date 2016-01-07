var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpConstants = require('./constants.js');

// Scan your HTML for assets & optimize them
gulp.task('optimize:html', function() {

  return gulp.src([
    'app/**/*.html',
    '!app/{elements,test,bower_components}/**/*.html'
  ])
  // Concatenate and minify JavaScript
  .pipe($.if('*.js', $.uglify({
    preserveComments: 'some'
  })))
  // Minify any HTML
  .pipe($.if('*.html', $.minifyHtml({
    quotes: true,
    empty: true,
    spare: true
  })))
  // Output files
  .pipe(gulp.dest(gulpConstants.BASE_DIST))
  .pipe($.size({
    title: 'html'
  }));

});

// Vulcanize granular configuration
gulp.task('vulcanize', function() {
  return gulp.src(gulpConstants.ELEMENTS_ORIGIN)
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(gulpConstants.ELEMENTS_DIST))
    .pipe($.size({title: 'vulcanize'}));
});
