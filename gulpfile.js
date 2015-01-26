var gulp        = require('gulp');
var connect     = require('gulp-connect');
var compass     = require('gulp-compass');
var browserSync = require('browser-sync');
var browserify  = require('browserify');

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

var root = 'static'

var paths = {
  sass: [root + '/sass/**/*.scss'],
  html: [root + '/*.html', root + '/views/*.jsx'],
  sassIn:  root + '/sass',
  cssOut:  root + '/css'
};

gulp.task('compass', function() {
  return gulp.src(paths.sass)
    .pipe(compass({
      css: paths.cssOut,
      sass: paths.sassIn
    }))
    .on('error', swallowError)
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: root
    }
  });
});

gulp.task('connect', function() {
  connect.server({
    root: root + '/',
    port: 1337,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(connect.reload());
})

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.sass, ['compass']);
});

gulp.task('test', []);
gulp.task('build', ['compass']);
gulp.task('default', ['browser-sync', 'connect', 'watch']);
