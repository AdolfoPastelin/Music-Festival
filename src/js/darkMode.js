export default function darkModeToggle() {
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
