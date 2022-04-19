import fixedNavigation from "./fixedNavigation.js"
import createGallery from "./createGallery.js"
import scrollNav from "./scrollNavigation.js"
import darkModeToggle from "./darkMode.js"
import hamburgerMenuContent from "./hamburgerMenu.js"
import revealElementsOnScroll from "./dynamicElements.js"

function initApp() {
	fixedNavigation()
	createGallery()
	scrollNav()
	darkModeToggle()
	hamburgerMenuContent()
	revealElementsOnScroll()
}

initApp()
