export default function scrollNav() {
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
