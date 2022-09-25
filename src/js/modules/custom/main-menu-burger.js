//=== Menu "Burger" ===============================
let menuIcon = document.querySelector(".icon-menu");
let menuLink = document.querySelector(".menuline-header__link");
let menuBody = document.querySelector(".menuline-header__body");
let menuCloser = document.querySelector(".menuline-header__body-closer");
let sitePage = document.querySelector(".page");
let menuOverlay = document.querySelector(".menuline-header__overlay");
let wrapper = document.querySelector(".wrapper")




// let body = document.querySelector("body");

menuIcon.onclick = activeMainMenu;
menuLink.onclick = activeMainMenu;
menuCloser.onclick = activeMainMenu;
menuOverlay.onclick = activeMainMenu;

function activeMainMenu() {
	if (menuIcon.classList.contains("_active") ||
		menuLink.classList.contains("_active") ||
		menuBody.classList.contains("_active") ||
		menuCloser.classList.contains("_active") ||
		sitePage.classList.contains("_shifted") ||
		body.classList.contains("_lock") ||
		menuOverlay.classList.contains("_active") ||
		wrapper.classList.contains("_lock")) {
		menuIcon.classList.remove("_active");
		menuLink.classList.remove("_active");
		menuBody.classList.remove("_active");
		menuCloser.classList.remove("_active");
		sitePage.classList.remove("_shifted");
		sitePage.classList.add("_unshifted");
		body.classList.remove("_lock");
		menuOverlay.classList.remove("_active");
		wrapper.classList.remove("_lock");
		// bodyUnlockPadding();
	} else {
		// bodyLockPaddidng();
		menuIcon.classList.add("_active");
		menuLink.classList.add("_active");
		menuBody.classList.add("_active");
		menuCloser.classList.add("_active");
		sitePage.classList.remove("_unshifted");
		sitePage.classList.add("_shifted");
		body.classList.add("_lock");
		menuOverlay.classList.add("_active");
		wrapper.classList.add("_lock");
	}
}

