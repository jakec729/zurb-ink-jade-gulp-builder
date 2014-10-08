var gulp = require('gulp'),
	jade = require('gulp-jade');


gulp.task('templates', function() {
	var YOUR_LOCALS = {};

	gulp.src('./src/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./public/'))
});


gulp.task('default', ['templates', 'watch'], function(){

});

gulp.task('watch', function(){

	gulp.watch('src/*.jade',['templates']);

});