var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('default', () => {
    del(['dist/easyobjects.js'], { force: true });
    
    // Combine all files and generate dist
   return gulp.src(['src/index.js'], {read: false})
    .pipe(browserify({
      debug: false
    }))
    .pipe(rename('easyobjects.js'))
    .pipe(gulp.dest('dist/'));

});