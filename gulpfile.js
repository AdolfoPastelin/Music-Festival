const { src, dest, watch, parallel } = require('gulp')

//CSS
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')

//PostCSS
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

//Images
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')
const resizer = require('gulp-images-resizer')

// JS
const terser = require('gulp-terser-js')

//* Gulp functions

/* Compiles SCSS files to CSS file */
function css(done) {
	src('src/scss/**/*.scss') //Identifies the .scss file to compile.
		.pipe(sourcemaps.init())
		.pipe(plumber()) //Avoid gulp execution interruption when a compilation error ocurrs.
		.pipe(sass()) // Compile the file.
		.pipe(postcss([autoprefixer, cssnano()])) // add prefixes and minify the code.
		.pipe(sourcemaps.write('.')) // "." means the same route as the dest path.
		.pipe(dest('build/css')) // Stores the compiled files.
	done()
}

function js(done) {
	src('src/js/**/*.js')
		.pipe(sourcemaps.init()) // Initialize sourcemap creation.
		.pipe(terser()) // minify the code.
		.pipe(sourcemaps.write('.')) // "." means the same route as the dest path.
		.pipe(dest('build/js'))
	done()
}

/* Add the --watch flag and executes css and js gulp functions */
function dev(done) {
	watch('src/scss/**/*.scss', css)
	watch('src/js/**/*.js', js)
	done()
}

function webpVersion(done) {
	const options = {
		quality: 90 // quality from 0 to 100 available
	}

	src('src/img/**/*.{png,jpg}')
		.pipe(webp(options)) //take the value from the object prop 'quality'
		.pipe(dest('build/img'))
	done()
}

function avifVersion(done) {
	const options = {
		quality: 90 // quality from 0 to 100 available
	}

	src('src/img/**/*.{png,jpg}')
		.pipe(avif(options)) //take the value from the object prop 'quality'
		.pipe(dest('build/img'))
	done()
}

function minifyImages(done) {
	const options = {
		optimizationLevel: 3 //options available 0 - 7
	}

	src('src/img/**/*.{png,jpg}')
		.pipe(cache(imagemin(options))) //take the value from the object prop 'optimizationLevel'
		.pipe(dest('build/img'))
	done()
}

function resizeImages(done) {
	const options = {
		width: 350,
		height: 250
	}

	src('src/img/large/**/*.{jpg,png}')
		.pipe(resizer(options))
		.pipe(dest('src/img/thumb'))
	done()
}

// run the functions with gulp + functionName
exports.css = css
exports.js = js
exports.resizeImages = resizeImages
exports.img = parallel(minifyImages, webpVersion, avifVersion)
exports.dev = parallel(css, js, dev)
