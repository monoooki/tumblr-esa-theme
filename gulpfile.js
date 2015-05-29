var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('default', ['clean', 'sass', 'autoprefixer', 'build-posts-html', 'build-posts-detail-html', 'build-post-html', 'watch']);



// css, html clean
gulp.task('clean', function() {
  del(['./dist/*']);
});

// sass compile
gulp.task('sass', function () {
  gulp.src('./sass/**/*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

// autoprefixer
gulp.task('autoprefixer', function() {
  return gulp.src('./dist/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
});


// image compress


// html concat
gulp.task('build-posts-html', function() {
  return gulp.src(['./html/header.html', './html/posts.html', './html/footer.html'])
    .pipe(concat('posts.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-posts-detail-html', function() {
  return gulp.src(['./html/header.html', './html/posts_detail_view.html', './html/footer.html'])
    .pipe(concat('posts_detail_view.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-post-html', function() {
  return gulp.src([
      './html/header.html',
      './html/post.html',
      './html/posttypes/post-text.html',
      './html/posttypes/post-image.html',
      './html/posttypes/post-photoset.html',
      './html/posttypes/post-link.html',
      './html/posttypes/post-quote-short.html',
      './html/posttypes/post-quote-long.html',
      './html/posttypes/post-chat.html',
      './html/posttypes/post-audio.html',
      './html/posttypes/post-video.html',
      './html/posttypes/post-answer.html',
      './html/footer.html'
    ])
    .pipe(concat('post.html'))
    .pipe(gulp.dest('./dist/'));
});


// watch
gulp.task('watch', function() {
  gulp.watch(['./sass/**/*.sass', './html/*'], ['clean', 'sass', 'autoprefixer', 'build-posts-html', 'build-posts-detail-html', 'build-post-html']);
});
