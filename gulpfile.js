'use strict';
var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var requireDir = require("require-dir");
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');
var gulpConstants = require('./gulp/constants.js');
var runSequence = require('run-sequence');
var del = require('del');
var merge = require('merge-stream');
requireDir("./gulp", { recurse: true });

// Clean output directory
gulp.task('clean', function() {
  return del(['.tmp',gulpConstants.BASE_DIST]);
});

// Copy all files at the root level (app)
gulp.task('copy', function() {
  var app = gulp.src([
    'app/*',
    '!app/test',
    '!app/elements',
    '!app/bower_components',
    '!app/cache-config.json',
    '!**/.DS_Store'
  ], {
    dot: true
  }).pipe(gulp.dest(gulpConstants.BASE_DIST));

  //Copiamos los componentes que no se vulcanizarán.
  var bower = gulp.src([
    'app/bower_components/{webcomponentsjs,platinum-sw,sw-toolbox,promise-polyfill}/**/*'
  ]).pipe(gulp.dest(gulpConstants.BASE_DIST + 'bower_components'));

  return merge(app, bower)
    .pipe($.size({
      title: 'copy'
    }));

});

// Build production files, the default task
gulp.task('default', ['clean'], function(cb) {
  // Uncomment 'cache-config' if you are going to use service workers.
  runSequence(
    ['copy'],
    ['build:images', 'build:fonts', 'optimize:html'],
    'vulcanize', // 'cache-config',
    cb);
});


// Watch files for changes & reload
gulp.task('serve', ['build:styles','build:images','build:fonts','optimize:html','vulcanize'], function() {
  browserSync({
    port: 5000,
    notify: false,
    logPrefix: 'PSK',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: [historyApiFallback()]
    }
  });

});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  browserSync({
    port: 5001,
    notify: false,
    logPrefix: 'PSK',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },

    server: gulpConstants.BASE_DIST,
    middleware: [historyApiFallback()]
  });
});

