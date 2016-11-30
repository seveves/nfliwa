const gulp   = require('gulp');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const tslint = require('gulp-tslint');
const stylish = require('jshint-stylish');

gulp.task('lint:js', function() {
  return gulp.src('./server/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task("lint:ts", function() {
  return gulp.src("./client/**/*.tsx")
      .pipe(tslint({
          formatter: "prose"
      }))
      .pipe(tslint.report());
});

gulp.task('sass', function () {
  return gulp.src('./server/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./server/scss/**/*.scss', ['sass']);
});

gulp.task('watch', ['sass:watch']);
gulp.task('lint', ['lint:js', 'lint:ts']);