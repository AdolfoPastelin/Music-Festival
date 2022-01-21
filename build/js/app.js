document.addEventListener('DOMContentLoaded', function () {
	initApp()
})

function initApp() {
	fixedNavigation()
	createGallery()
	scrollNav()
	darkModeToggle()
	hamburgerMenuContent()
}

function fixedNavigation() {
	const main = document.querySelector('main')
	const header = document.querySelector('.header')
	const headerHeight = header.getBoundingClientRect().height

	const mainFunction = (entries) => {
		const [entry] = entries

		if (!entry.isIntersecting) {
			header.classList.add('sticky')
		} else {
			header.classList.remove('sticky')
		}
	}

	const mainOptions = {
		root: null,
		rootMargin: `-${headerHeight}px`,
		threshold: 0
	}

	const mainObserver = new IntersectionObserver(mainFunction, mainOptions)
	mainObserver.observe(main)
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
			<img width="200" height="200" src="build/img/thumb/${i}.jpg"
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
	const paragraphs = document.querySelectorAll('.paragraph')
	const dates = document.querySelectorAll('.date')
	const days = document.querySelectorAll('.day')
	const stagesNames = document.querySelectorAll('.stage-name')
	const packageTitles = document.querySelectorAll('.package-title')
	const packageItems = document.querySelectorAll('.package-body > ul > li')

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
		paragraphs.forEach(paragraph => {
			paragraph.classList.toggle('dark-mode-paragraph')
		})

		dates.forEach(date => {
			date.classList.toggle('dark-mode-date')
			date.classList.toggle('date')
		})

		days.forEach(day => {
			day.classList.toggle('dark-mode-day')
			day.classList.toggle('day')
		})

		stagesNames.forEach(stageName => {
			stageName.classList.toggle('dark-mode-stage-name')
			stageName.classList.toggle('stage-name')
		})

		packageTitles.forEach(packageTitle => {
			packageTitle.classList.toggle('dark-mode-package-title')
		})

		packageItems.forEach(packageItem => {
			packageItem.classList.toggle('dark-mode-package-item')
		})

		// Icon toggle
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

function hamburgerMenuContent() {
	const hamburger = document.querySelector('#hamburger')
	const principalNavigation = document.querySelector('.principal-navigation')

	const aboutFestival = document.querySelector('.about-festival')
	const body = document.querySelector('body')

	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('open')
		principalNavigation.classList.toggle('show')

		window.addEventListener('scroll', () => {
			if (aboutFestival.getBoundingClientRect().bottom < 0 && principalNavigation.classList.contains('show')) {
				body.classList.add('fixed-show')
			} else {
				body.classList.remove('fixed-show')
			}
		})
	})
}