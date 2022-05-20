var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var inlineimage = require('gulp-inline-image');
var exec = require('child_process').exec;

// paths
var css_directory = 'dist/css';
var sass_directory = 'scss';

gulp.task('generate_css', function () {
	return gulp.src([
			sass_directory + '/*.scss' // multiple sources generate multiple css files
		])
		.pipe(sass({

			sourceComments: false
		}).on('error', sass.logError))
		.pipe(inlineimage())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write("")) // adding a path in write, makes it write sourcemaps into a seperate file, which greatly reduces css file size
		.pipe(gulp.dest(css_directory));
});

// This gets executed with command: gulp
gulp.task('default', function() {
	console.log("Running initial generation...");
	exec('gulp generate_css', function (err, stdout, stderr) {
		if ( stderr ) {
			console.log("Initial generation had error:");
			console.log(stderr);
		} else {
			console.log("Initial generation successfull.");
		}
		console.log("Watching...");
		// watch: array(s) of paths to the files we want to be watched, task(s) to execute upon detecting a file change
		gulp.watch(sass_directory + '/**/*.scss', gulp.series('generate_css'));
	});
});
