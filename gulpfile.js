var gulp = require('gulp')
var templates = require('gulp-angular-templatecache')
var concat = require('gulp-concat')
var clean = require('gulp-clean')
var pkg = require('./bower.json')
var template = './template/clockpicker.html'
var main = './angular-clockpicker.js'

gulp.task('templates', function () {
  return gulp.src(template)
    .pipe(templates('templates.tmp', {
      root: '/template/',
      module: pkg.name
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('concat', ['templates'], function () {
  return gulp.src([main, 'templates.tmp'])
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', ['concat'], function () {
  gulp.src('./*.tmp', {read: false})
    .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(['*.js', '*.html'], ['build']);
});

gulp.task('build', ['templates', 'concat', 'clean']);
gulp.task('default', ['build', 'watch']);