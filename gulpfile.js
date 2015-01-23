var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

//Backbone requires specific order for its dependencies
gulp.task('scripts', function(){
  return gulp.src(['./public/lib/jquery.js',
                   './public/lib/underscore.js',
                   './public/lib/backbone.js',
                   './public/lib/socket.io.js',
                   './public/client/app.js'])
            .pipe(concat('scripts.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./public/dist/'));
});

gulp.task('develop', function(){
  nodemon({ script: './server/server.js',
            env: { 'NODE_ENV': 'development' }
          });
});

gulp.task('default', ['scripts', 'develop']);