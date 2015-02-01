var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var karma = require('gulp-karma');

var publicDir = 'public/**/*.js';

//Backbone requires specific order for its dependencies
gulp.task('scripts', function(){
  return gulp.src(['./bower_components/jquery/dist/jquery.js',
                   './bower_components/underscore/underscore.js',
                   './bower_components/backbone/backbone.js',
                   './node_modules/socket.io-client/socket.io.js',
                   './public/client/app.js',
                   './public/client/**/*.js'])
          .pipe(concat('scripts.js'))
          .pipe(rename('scripts.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('./public/dist/'));
});

gulp.task('watch-public', function(){
  gulp.watch([publicDir, '!public/dist/*.js'], ['scripts']);
});

gulp.task('develop', function(){
  gulp.start('scripts');
  nodemon({ 
    script: './server.js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['public/dist/']
  })
  //have nodemon run watch on start
  .on('start', ['watch-public']);
});

gulp.task('default', ['develop']);

var testFiles = ['./test/unit/*.js',
  './test/integration/*.js'];

gulp.task('test', function() {

  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      reporters: ['progress', 'coverage'],
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});