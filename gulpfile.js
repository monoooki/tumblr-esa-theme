var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

gulp.task('default', ['clean', 'sass', 'autoprefixer', 'watch']);



// css clean
gulp.task('clean', function(cb){
  del(['css/*.css'], cb);
});

// sass compile
gulp.task('sass', function () {
  gulp.src('./sass/**/*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// autoprefixer
gulp.task('autoprefixer', function(){
  return gulp.src('./css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css'));
});


// image compress


// ... watch
gulp.task('watch', function(){
  gulp.watch('./sass/**/*.sass', ['clean', 'sass', 'autoprefixer']);
});
