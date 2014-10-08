/* Plugins */
/* -------------------------------------- */

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-ruby-sass'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	prefixer = require('gulp-autoprefixer'),
	inlineCSS = require('gulp-inline-css');


/* Processing Tasks */
/* -------------------------------------- */

gulp.task('styles', function(){

	gulp.src('sass/*.scss')

		// Compile Sass
		.pipe(sass({
			style: "expanded",
			precision: 6,
			noCache: true
		}))

		// Save 'Pretty' version
		.pipe(gulp.dest('css'))

		// Prefix the CSS
		.pipe(prefixer({
			browsers: ['last 2 versions'],
            cascade: false
		}))

		// Minify the CSS
		.pipe(minify())

		// Change filename for dist file
		.pipe(rename({ suffix: "-min" }))

		// Save 'Dist' version
		.pipe(gulp.dest('css'))

});

gulp.task('templates', ['styles'], function() {
	var YOUR_LOCALS = {};

	gulp.src('src/*.jade')

		// Process Jade files
		.pipe(jade({
			pretty: true
		}))

		// Inline the CSS
		.pipe(inlineCSS({}))

		// Export to public folder
		.pipe(gulp.dest('public'))
});

gulp.task('default', ['templates', 'watch'] );


/* Watch Tasks */
/* -------------------------------------- */

gulp.task('watch', function() {
	gulp.watch('src/*.jade', ['templates']);
	gulp.watch('sass/**/*.scss', ['styles']);
});
