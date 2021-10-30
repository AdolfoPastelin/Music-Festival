document.addEventListener('DOMContentLoaded', function () {
	initApp()
})

function initApp() {
	createGalery()
}

function createGalery() {
	const galery = document.querySelector('.galery-images')
	galery.textContent = 'Example text'
}