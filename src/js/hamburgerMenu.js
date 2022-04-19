export default function hamburgerMenuContent() {
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
