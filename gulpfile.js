const { src, dest, watch, parallel } = require('gulp')

//CSS
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')

//Images
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

//* Gulp functions

/* Compiles SCSS files to CSS file */
function css(done) {
	src('src/scss/**/*.scss') //Identifies the .scss file to compile.
		.pipe(plumber()) //Avoid gulp execution interruption when a compilation error ocurrs.
		.pipe(sass()) // Compile the file.
		.pipe(dest('build/css')) // Stores the compiled files.
	done()
}

/* Add the --watch flag and executes css gulp function */
function dev(done) {
	watch('src/scss/**/*.scss', css)
	done()
}

function webpVersion(done) {
	const options = {
		quality: 50 // quality from 0 to 100 available
	}

	src('src/img/**/*.{png,jpg}')
		.pipe(webp(options)) //take the value from the object prop 'quality'
		.pipe(dest('build/img'))
	done()
}

function avifVersion(done) {
	const options = {
		quality: 50 // quality from 0 to 100 available
	}

	src('src/img/**/*.{png,jpg}')
		.pipe(avif(options)) //take the value from the object prop 'quality'
		.pipe(dest('build/img'))
	done()
}

function minifyImages(done) {
	const options = {
		optimizationLevel: 3 //options in gulp package documentation
	}

	src('src/img/**/*.{png,jpg}')
		.pipe(cache(imagemin(options))) //take the value from the object prop 'optimizationLevel'
		.pipe(dest('build/img'))
	done()
}

// run the functions with gulp + functionName
exports.css = css
exports.img = parallel(minifyImages, webpVersion, avifVersion)
exports.dev = parallel(css, dev)