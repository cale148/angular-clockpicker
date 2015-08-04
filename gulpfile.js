var gulp = require('gulp')
var templates = require('gulp-angular-templatecache')
var concat = require('gulp-concat')
var clean = require('gulp-clean')
var sass = require('gulp-sass')
var pkg = require('./bower.json')
var template = './template/clockpicker.html'
var main = './angular-clockpicker.js'
var paths = {
  sass: ['./scss/**/*.scss', './scss/**/*.sass']
}

gulp.task('templates', function () {
  return gulp.src(template)
    .pipe(templates('templates.tmp', {
      root: '/template/',
      module: pkg.name
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/angular-clock-picker.sass')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./dist/'))
    .on('end', done);
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
gulp.task('default', ['build', 'sass', 'watch']);