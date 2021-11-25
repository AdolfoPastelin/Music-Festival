document.addEventListener('DOMContentLoaded', function () {
	initApp()
})

function initApp() {
	fixedNavigation()
	createGallery()
	scrollNav()
	darkModeToggle()
}

function fixedNavigation() {
	const bar = document.querySelector('.header')
	const aboutFestival = document.querySelector('.about-festival')
	const body = document.querySelector('body')

	window.addEventListener('scroll', () => {
		if (aboutFestival.getBoundingClientRect().bottom < 0) {
			bar.classList.add('fixed')
			body.classList.add('scroll-body')
		} else {
			bar.classList.remove('fixed')
			body.classList.remove('scroll-body')
		}
	})
}

function scrollNav() {
	const links = document.querySelectorAll('.principal-navigation a')

	links.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			const scrollSection = e.target.attributes.href.value
			const section = document.querySelector(scrollSection)

			//Using scrollIntoView API
			section.scrollIntoView({ alignToTop: true, behavior: "smooth" })
		})
	})
}

function createGallery() {
	const gallery = document.querySelector('.gallery-images')

	for (let i = 1; i <= 12; i++) {
		const image = document.createElement('picture')
		image.innerHTML = `
			<source srcset="build/img/thumb/${i}.avif" type="image/avif">
			<source srcset="build/img/thumb/${i}.webp" type="image/webp">
			<img loading="lazy" width="200" height="200" src="build/img/thumb/${i}.jpg"
			alt="Gallery image ${i}">
		`
		image.style.cursor = 'pointer'

		image.onclick = function () {
			showImage(i)
		}

		gallery.appendChild(image)
	}
}

function showImage(id) {
	const image = document.createElement('picture')
	image.innerHTML = `
			<source srcset="build/img/large/${id}.avif" type="image/avif">
			<source srcset="build/img/large/${id}.webp" type="image/webp">
			<img loading="lazy" width="200" height="200" src="build/img/large/${id}.jpg"
			alt="Gallery image ${id}">
		`

	// Creates the overlay with the image
	const overlay = document.createElement('div')
	overlay.appendChild(image)
	overlay.classList.add('overlay')

	overlay.onclick = function () {
		const body = document.querySelector('body')
		body.classList.remove('fixBody')
		overlay.remove()
	}

	// Modal: Close button
	const closeModal = document.createElement('button')
	closeModal.classList.add('closeBtn')
	closeModal.innerHTML = `
	<span class="text">Close</span><span class="icon"><svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
	`
	closeModal.onclick = function () {
		const body = document.querySelector('body')
		body.classList.remove('fixBody')
		overlay.remove()
	}
	overlay.appendChild(closeModal)

	// Appends them to the HTML
	const body = document.querySelector('body')
	body.classList.add('fixBody')
	body.appendChild(overlay)

}

function darkModeToggle() {
	// Dynamic picture -> src element
	const pictureEl = document.createElement('picture')
	pictureEl.classList.add('toggle-icon')
	pictureEl.style.cursor = 'pointer'
	const navigation = document.querySelector('.principal-navigation')

	// Styles of dark mode
	const body = document.querySelector('body')
	const paragraph = document.querySelectorAll('.paragraph')

	// Dynamic creation of picture -> source x2 -> img
	if (!body.classList.contains('dark-mode-body')) {
		pictureEl.innerHTML = `
			<source srcset="build/img/icons/moon-icon.avif" type="image/avif">
			<source srcset="build/img/icons/moon-icon.webp" type="image/webp">
			<img width="50" height="50" src="build/img/icons/moon-icon.png"
			alt="Icon">
		`
		navigation.appendChild(pictureEl)
	}

	// Actions that will happen after clicking the icon.
	pictureEl.addEventListener('click', () => {
		body.classList.toggle('dark-mode-body')
		paragraph.forEach(p => p.classList.toggle('dark-mode-paragraph'))

		if (body.classList.contains('dark-mode-body')) {
			pictureEl.innerHTML = `
				<source srcset="build/img/icons/sun-icon.avif" type="image/avif">
				<source srcset="build/img/icons/sun-icon.webp" type="image/webp">
				<img width="50" height="50" src="build/img/icons/sun-icon.png"
				alt="Icon">
			`
			navigation.appendChild(pictureEl)
		} else {
			pictureEl.innerHTML = `
				<source srcset="build/img/icons/moon-icon.avif" type="image/avif">
				<source srcset="build/img/icons/moon-icon.webp" type="image/webp">
				<img width="50" height="50" src="build/img/icons/moon-icon.png"
				alt="Icon">
			`
			navigation.appendChild(pictureEl)
		}
	})
}