var gulp        = require('gulp');
var connect     = require('gulp-connect');
var compass     = require('gulp-compass');
var browserSync = require('browser-sync');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');

//because gulp kinda sucks
function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

var paths = {
  html:   ['./static/**/*.html', './src/js/**/*.jsx'],
  js:     ['./src/js/**/*.js', './src/js/**/*.jsx'],
  sass:   './src/sass/**/*.scss',
  sassIn:  'src/sass',
  cssOut:  'static/css'
};

gulp.task('js', function() {
  return browserify({ entries: './src/js/app.js' })
    .transform('reactify')
    .bundle()
    .on('error', swallowError)
    .pipe(source('./static/js/bundle.js'))
    .pipe(gulp.dest('./'));
});

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
      baseDir: 'static'
    }
  });
});

gulp.task('connect', function() {
  connect.server({
    root: 'static/',
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
  gulp.watch(paths.js, ['js']);
});

gulp.task('build', ['compass','js']);
gulp.task('default', ['browser-sync', 'connect', 'watch']);
