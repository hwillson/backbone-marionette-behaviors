var gulp = require('gulp');
var _ = require('lodash');
var jslint = require('gulp-jslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('karma').server;

var VENDOR_FILES = [
 './test/vendor/jquery.js',
 './test/vendor/underscore.js',
 './test/vendor/backbone.js',
 './test/vendor/backbone.marionette.js'
];

var APP_FILES = [
  './src/**/*.js'
];

var TEST_FILES = [
  './test/**/*.spec.js'
];

var TEST_DIR = './test';
var LIB_DIR = './lib';

// Karma test runner config
var karmaConfig = {
  frameworks: ['mocha', 'chai-sinon'],
  files:
    VENDOR_FILES
      .concat(APP_FILES)
      .concat(TEST_FILES),
  browsers: ['PhantomJS'],
  reporters: ['progress', 'coverage'],
  preprocessors: {
    './src/**/*.js': ['coverage']
  },
  coverageReporter: {
    type : 'html',
    dir : TEST_DIR + '/coverage'
  }
};

// Vendor scripts
gulp.task('vendor', function () {
  return gulp.src(VENDOR_FILES);
});

// Uglify/minify scripts and copy to lib
gulp.task('scripts', function () {
  return gulp.src(APP_FILES)
    .pipe(uglify())
    .pipe(rename('behaviors.min.js'))
    .pipe(gulp.dest(LIB_DIR));
});

// JSLint source files
gulp.task('jslint', function () {
  gulp.src(APP_FILES.concat(TEST_FILES))
  .pipe(jslint({
    node: true,
    evil: true,
    nomen: true,
    indent: 2,
    unparam: true,
    errorsOnly: false
  })).on('error', function (error) {
    console.error(String(error));
    process.exit(1);
  });
});

// Run tests once and exit
gulp.task('test-once', ['build'], function (done) {
  karma.start(_.assign({}, karmaConfig, {singleRun: true}), done);
});

// Run tests and watch for changes
gulp.task('test', ['watch'], function (done) {
  karma.start(karmaConfig, done);
});

// Watch application files for changes; if found trigger re-concat and deploy
gulp.task('watch', ['build'], function () {
  gulp.watch(VENDOR_FILES, ['vendor']);
  gulp.watch(APP_FILES, ['scripts']);
});

// Build
gulp.task('build', ['vendor', 'scripts']);

// Default task
gulp.task('default', ['watch']);
