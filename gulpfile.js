var gulp        = require('gulp');
var connect     = require('gulp-connect');
var compass     = require('gulp-compass');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var browserify  = require('browserify');

//because gulp kinda sucks
function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

var root = 'static'

var paths = {
  sass:   [root + '/sass/**/*.scss'],
  html:   [root + '/**/*.html', root + '/js/**/*.jsx'],
  js:     [root + '/js/**/*.js', root + '/js/**/*.jsx'],
  sassIn:  root + '/sass',
  cssOut:  root + '/css'
};

gulp.task('js', function() {
  return browserify({ entries: './static/js/app.js' })
    .transform('reactify')
    .bundle()
    .on('error', swallowError)
    .pipe(source(root + '/js/bundle.js'))
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
  gulp.watch(paths.js, ['js']);
});

gulp.task('test', []);
gulp.task('build', ['compass','js']);
gulp.task('default', ['browser-sync', 'connect', 'watch']);
