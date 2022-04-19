export default function fixedNavigation() {
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
