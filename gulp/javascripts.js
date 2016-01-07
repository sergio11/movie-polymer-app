var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var gulpConstants = require('./constants.js');

gulp.task('build:javascript', function(){
    return gulp.src(gulpConstants.SCRIPTS_ORIGIN)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(gulpConstants.SCRIPTS_DIST))
        .pipe(notify({ message: 'Finished minifying JavaScript'}))
        .on('error',function(e){
        	console.log("Error");
        	console.log(e);
        });
});
