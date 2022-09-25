


//чекаем в переменную
let firstWindowInnerWidth = windowInnerWidth();

//определяем устрочйтсо тач или мышь
let touch = null;
if (firstWindowInnerWidth < 991.98) {
	touch = true;
} else {
	touch = false;
}


//чекаем функцией
firstCheckWindowInnerWidth();


function firstCheckWindowInnerWidth() {
	let CurrentWindowInnerWidth = windowInnerWidth();
	if (CurrentWindowInnerWidth < 991.98) {
		addPrevDefLinkSubMenu();
	} else {
		removePrevDefLinkSubMenu();
	}
}

//включаем отслеживание 
window.addEventListener('resize', сheckWindowInnerWidth);





function сheckWindowInnerWidth() {
	let CurrentWindowInnerWidth = windowInnerWidth();
	footerMenuHiddenCheck(CurrentWindowInnerWidth);
	if (CurrentWindowInnerWidth < 991.98) {
		if (touch) {
			console.log('уже тач - ничего не делаем');
		} else {
			addPrevDefLinkSubMenu();
			touch = true;
		}
	} else {
		if (touch) {
			removePrevDefLinkSubMenu();
			menuIcon.classList.remove("_active");
			menuLink.classList.remove("_active");
			menuBody.classList.remove("_active");
			menuCloser.classList.remove("_active");
			sitePage.classList.remove("_shifted");
			sitePage.classList.add("_unshifted");
			body.classList.remove("_lock");
			menuOverlay.classList.remove("_active");
			touch = false;
		} else {
			console.log('уже мышь - ничего не делаем');
		}
	}
}

function windowInnerWidth() {
	let windowInnerWidth = window.innerWidth;
	return windowInnerWidth;
}

function addPrevDefLinkSubMenu() {
	let allLiSubMenu = document.querySelectorAll('[class*="menuline-header__sub-menu"]');
	if (allLiSubMenu.length) {
		for (let i = 0; i < allLiSubMenu.length; i++) {
			const LiSubMenu = allLiSubMenu[i];
			let siblingLink = LiSubMenu.previousElementSibling;

			siblingLink.classList.add('_sub-menu-link');
			LiSubMenu.classList.add('_sub-menu');

			siblingLink.addEventListener("click", function () {
				let allSubMenu = document.querySelectorAll('._sub-menu');
				// console.log(allSubMenu);
				for (let j = 0; j < allSubMenu.length; j++) {
					const currentSubMenu = allSubMenu[j];
					if (LiSubMenu === currentSubMenu) {
						LiSubMenu.classList.toggle('_open');
						console.log('тоггле опен');

					} else {
						if (currentSubMenu.classList.contains('_open')) {
							currentSubMenu.classList.remove('_open');
							console.log('удалили опен');

						}
					}
				}
			});
			siblingLink.addEventListener("click", prevDef);
			console.log('отменили дейсвтие ссылкам');
		}
	} else {
		console.log('error1');
	}
}

function removePrevDefLinkSubMenu() {
	let allLiSubMenu = document.querySelectorAll('[class*="menuline-header__sub-menu"]');
	if (allLiSubMenu.length) {
		for (let i = 0; i < allLiSubMenu.length; i++) {
			const LiSubMenu = allLiSubMenu[i];
			let siblingLink = LiSubMenu.previousElementSibling;
			// let childMenuBody = LiSubMenu.childNodes[1];


			if (LiSubMenu.classList.contains('_open')) {
				LiSubMenu.classList.remove('_open')
			}

			siblingLink.classList.remove('_sub-menu-link');
			LiSubMenu.classList.remove('_sub-menu');
			siblingLink.removeEventListener("click", function () {
				let allSubMenu = document.querySelectorAll('._sub-menu');
				// console.log(allSubMenu);
				for (let j = 0; j < allSubMenu.length; j++) {
					const currentSubMenu = allSubMenu[j];
					if (LiSubMenu === currentSubMenu) {
						LiSubMenu.classList.toggle('_open');
					} else {
						if (currentSubMenu.classList.contains('_open')) {
							currentSubMenu.classList.remove('_open');
						}
					}
				}
			});
			siblingLink.removeEventListener("click", prevDef);
			console.log('вернули дейсвтие ссылкам');
		}
	} else {
		console.log('error2');

	}
}

function prevDef(elem) {
	elem.preventDefault();
	console.log('s');
}


