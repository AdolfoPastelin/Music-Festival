const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

/* Compiles SCSS files to CSS file */
function css(done) {
	src('src/scss/**/*.scss') //Identifies the .scss file to compile.
		.pipe(sass()) // Compile the file.
		.pipe(dest('build/css')) // Stores the compiled files.
	done()
}

/* Add the --watch flag */
function dev(done) {
	watch('src/scss/**/*.scss', css)
	done()
}

// run the functions with gulp + functionName
exports.css = css
exports.dev = dev