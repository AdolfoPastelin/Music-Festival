export default function revealElementsOnScroll() {

	const allSections = document.querySelectorAll('section')

	const revealSections = (entries, observer) => {
		const [entry] = entries

		//? Guard clause
		if (!entry.isIntersecting) {
			entries.forEach(entry => {
				entry.target.classList.remove('section--hidden')
			})
		}

		entry.target.classList.remove('section--hidden')
		observer.unobserve(entry.target)
	}

	const sectionOptions = {
		root: null,
		threshold: 0.1
	}

	const sectionObserver = new IntersectionObserver(revealSections, sectionOptions)
	allSections.forEach(section => {
		sectionObserver.observe(section)
		section.classList.add('section--hidden')
	})
}
