var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('default', ['clean', 'sass', 'autoprefixer', 'build-posts-html', 'build-post-html', 'build-post-video-html', 'watch']);



// css, html clean
gulp.task('clean', function(cb){
  del(['css/*.css', './dist/*'], cb);
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


// html concat
gulp.task('build-posts-html', function() {
  return gulp.src(['./html/header.html', './html/posts.html', './html/footer.html'])
    .pipe(concat('posts.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-post-html', function() {
  return gulp.src(['./html/header.html', './html/post.html', './html/footer.html'])
    .pipe(concat('post.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-post-video-html', function() {
  return gulp.src(['./html/header.html', './html/post-video.html', './html/footer.html'])
    .pipe(concat('post-video.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-post-text-html', function() {
  return gulp.src(['./html/header.html', './html/post-text.html', './html/footer.html'])
    .pipe(concat('post-text.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-post-image-html', function() {
  return gulp.src(['./html/header.html', './html/post-image.html', './html/footer.html'])
    .pipe(concat('post-image.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-post-photoset-html', function() {
  return gulp.src(['./html/header.html', './html/post-photoset.html', './html/footer.html'])
    .pipe(concat('post-photoset.html'))
    .pipe(gulp.dest('./dist/'));
});




// ... watch
gulp.task('watch', function(){
  gulp.watch(['./sass/**/*.sass', './html/*'], ['clean', 'sass', 'autoprefixer', 'build-posts-html', 'build-post-html', 'build-post-video-html', 'build-post-text-html', 'build-post-image-html', 'build-post-photoset-html']);
});
