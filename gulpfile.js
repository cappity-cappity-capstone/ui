var gulp        = require('gulp');

var compass     = require('gulp-compass');
var browserSync = require('browser-sync');

var paths = {
  sass: 'sass/*.scss'
};

gulp.task('compass', function() {
  gulp.src(paths.sass)
  .pipe(compass({
    css: 'stylesheets',
    sass: 'sass'
  }))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['compass']);
});

gulp.task('watch', ['compass', 'browser-sync', 'watch']);
gulp.task('build', ['compass']);
gulp.task('default', ['build']);
