export default function createGallery() {
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
