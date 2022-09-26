/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
	//Проверка поддрежки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

isWebp();








"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
let body = document.querySelector('body');
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
} else {
	body.classList.add('_mouse');
}

let collabBtn = document.querySelector('.menu-collaboration__btn');
let collabMenu = document.querySelector('.menu-collaboration__body');
collabBtn.addEventListener("click", prevDef);
collabBtn.addEventListener('click', function () {
	collabBtn.classList.toggle('_open');
	collabMenu.classList.toggle('_active');
});







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


let searchButton = document.querySelector(".search__input-button");
let searchBlock = document.querySelector(".search");

searchButton.addEventListener('click', prevDef);
searchButton.addEventListener('click', activeSearch);


function activeSearch() {
	searchButton = document.querySelector(".search__input-button");

	if (searchButton.classList.contains('_closed')) {
		console.log('кслосед - есть');
		searchButton.classList.remove('_closed');
		searchBlock.classList.add('_active');
		searchButton.classList.add('_active');
		searchButton.removeEventListener("click", prevDef);
	} else if (!searchButton.classList.contains('_active')) {
		console.log('актив - нету, кслосед - нету, добавили актив, убрали прев деф кнопке');
		searchBlock.classList.add('_active');
		searchButton.classList.add('_active');

		searchButton.removeEventListener("click", prevDef);
	} else {
		console.log('нету клосед, есть актив');
		searchButton.removeEventListener("click", prevDef);
	}
}

let copyrightLink = document.querySelector('.copyright__link');
let copyrightInfo = document.querySelector('.copyright__info');
copyrightLink.addEventListener("click", prevDef);
copyrightLink.addEventListener('click', function () {
	copyrightInfo.classList.toggle('_active');
});


document.addEventListener('click', e => {
	let target = e.target;


	// если нажали НЕ на коллаб меню
	if (!(collabMenu.contains(target) || collabBtn.contains(target))) {

		// и если нажали НЕ на копирайт
		if (!(copyrightLink.contains(target) || copyrightInfo.contains(target))) {

			if (selectBody && selectHeader) {
				// и если нажали НЕ на фильтр сортировки или фильтр товара
				if (!(selectBody.contains(target) || selectHeader.contains(target))) {

					// закрываем коллаб меню
					collabBtn.classList.remove('_open');
					collabMenu.classList.remove('_active');

					// закрываем копирайт
					copyrightInfo.classList.remove('_active');

					// закрываем фильтры
					selectHeader.classList.remove('_active');
					selectBody.classList.remove('_active');

				}
			}



			// если нажали НЕ на коллаб, но на копирайт
		} else {

			// закрываем коллаб меню
			collabBtn.classList.remove('_open');
			collabMenu.classList.remove('_active');

		}

		// если нажали на коллаб меню
	} else {

		// закрываем копирайт
		copyrightInfo.classList.remove('_active');

	}
});

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape') {
		const popupActive = document.querySelector('.popup._active');
		if (popupActive) {
			popupActive.classList.remove('_active');
			body.classList.remove('_lock');
		}
		////////////////////////////
		const menuСategories_menu = document.querySelector('.menu-categories._open');
		const sitePage = document.querySelector(".page");
		const wrapper = document.querySelector('.wrapper');
		const menuСategories_overlay = document.querySelector('.page-content__overlay--menu-categories');
		const menuСategories_closer = document.querySelector('.menu-categories__body-closer');
		if (menuСategories_menu) {
			menuСategories_overlay.classList.remove('_open');
			menuСategories_menu.classList.remove('_open');
			sitePage.classList.remove('_shifted');
			sitePage.classList.add('_unshifted');
			body.classList.remove('_lock');
			wrapper.classList.remove('_lock');
			menuСategories_closer.classList.remove('_open');
		}

	}
});
let footerMenuListLi = document.querySelectorAll(".footer-menu-list__li");

// чекаем видимость меню под разрешение при изменении разрешения (touch-version_main_menu.js)
function footerMenuHiddenCheck(resolution) {
	for (let i = 0; i < footerMenuListLi.length; i++) {
		const currentFooterMenuListLi = footerMenuListLi[i];
		const currentFooterSubmenuBody = currentFooterMenuListLi.querySelector(".footer-submenu__body");
		const currentFooterMenuTitle = currentFooterMenuListLi.querySelector(".footer-menu-list__title");
		currentFooterMenuTitle.classList.remove('_active');
		if (resolution < 991.98) {
			// console.log(resolution);

			currentFooterSubmenuBody.classList.remove('_noSpoiler');
			currentFooterSubmenuBody.hidden = true;
		} else {
			currentFooterSubmenuBody.hidden = false;
			currentFooterSubmenuBody.classList.add('_noSpoiler');

		}

	}
}


for (let i = 0; i < footerMenuListLi.length; i++) {
	const currentFooterMenuListLi = footerMenuListLi[i];
	const currentFooterMenuTitle = currentFooterMenuListLi.querySelector(".footer-menu-list__title");
	const currentFooterSubmenuBody = currentFooterMenuListLi.querySelector(".footer-submenu__body");
	if (touch) {
		currentFooterSubmenuBody.hidden = true;
	} else {
		currentFooterSubmenuBody.hidden = false;
		currentFooterSubmenuBody.classList.add('_noSpoiler')
	}
	// const currentFooterSubmenu = currentFooterMenuListLi.querySelector(".footer-submenu");
	currentFooterMenuListLi.addEventListener('click', function () {
		if (!currentFooterSubmenuBody.classList.contains('_noSpoiler')) {


			for (let i = 0; i < footerMenuListLi.length; i++) {
				const otherFooterMenuListLi = footerMenuListLi[i];
				const otherFooterSubmenuBody = otherFooterMenuListLi.querySelector(".footer-submenu__body");
				const otherFooterMenuTitle = otherFooterMenuListLi.querySelector(".footer-menu-list__title");

				if (currentFooterSubmenuBody === otherFooterSubmenuBody) {

				} else {
					if (otherFooterSubmenuBody.classList.contains('_open')) {
						_slideUp(otherFooterSubmenuBody, 500);
						otherFooterSubmenuBody.classList.remove('_open');
						otherFooterMenuTitle.classList.remove('_active');
					}

				}


			}
			currentFooterMenuTitle.classList.toggle('_active');
			_slideToggle(currentFooterSubmenuBody, 500);
			currentFooterSubmenuBody.classList.toggle('_open');
		}
	});
}


// доблестно украденый код
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

let selectBody = document.querySelector('.sort-filter__body');
let selectHeader = document.querySelector('.sort-filter__header');

let sortFilter = function () {

	if (selectHeader && selectBody) {

		let selectItem = document.querySelectorAll('.sort-filter__item');

		selectHeader.addEventListener('click', function () {

			selectBody.classList.toggle('_active');
			selectHeader.classList.toggle('_active');

			let itemFilterHeaders = document.querySelectorAll('.item-filter__header');
			let itemFilterBodies = document.querySelectorAll('.item-filter__body');

			itemFilterHeaders.forEach(itemFilterHeader => {
				itemFilterHeader.classList.remove('_active');
			});
			itemFilterBodies.forEach(itemFilterBody => {
				itemFilterBody.classList.remove('_active');
			});

		});

		selectItem.forEach(item => {
			item.addEventListener('click', function () {
				selectItem.forEach(item => {
					item.classList.remove('_choise')
				});
				this.classList.add('_choise');
				let text = this.innerText;
				let select = this.closest('.sort-filter');
				let currentText = select.querySelector('.sort-filter__current');
				currentText.innerText = text;


				selectBody.classList.remove('_active');
				selectHeader.classList.remove('_active');

			});
		});

	}



};

sortFilter();







let itemFilter = function () {
	let filtersHeaders = document.querySelectorAll('.item-filter__header');
	let filtersBody = document.querySelectorAll('.item-filter__body');
	let filtersButton = document.querySelector('.item-filter__button');
	let firstFilterId = 0;




	// Вешаем на каждый хедер-фильтр просушку на клик, чтобы открывалось боди-фильтр
	filtersHeaders.forEach(filterHeader => {
		filterHeader.addEventListener('click', function () {


			// закрываем не активные фильтры если открыты
			filtersHeaders.forEach(filterHeader => {
				filterHeader.classList.remove('_active');
			});

			filtersBody.forEach(itemFB => {
				itemFB.classList.remove('_active');
			});


			//Показываем выбранный фильтр тело и хедер (присваиваем класс актив)
			let filterBody = this.nextElementSibling;
			filterBody.classList.toggle('_active');
			filterHeader.classList.toggle('_active');


			// убираем у фильтра сортировки активы
			let sortFilterHeader = document.querySelector('.sort-filter__header');
			let sortFilterBodie = document.querySelector('.sort-filter__body');
			sortFilterHeader.classList.remove('_active');
			sortFilterBodie.classList.remove('_active');






			//Получаем пункты меню выбранного фильтра
			let filterItems = filterBody.querySelectorAll('.item-filter__item');


			//Вешаем прослушку на элементы селекта выбранного фильтра
			filterItems.forEach(filterItem => {
				filterItem.addEventListener('click', function () {

					//окрашиваем выбранный пункт фильтра в боди и ставим в текущий элемент в шапке
					filterItems.forEach(filterItem => {
						filterItem.classList.remove('_choise');
					});
					this.classList.add('_choise');
					let filterItemText = this.innerHTML;
					// console.log(filterItemText);
					let filter = this.closest('.item-filter__block');
					let currentItemText = filter.querySelector('.item-filter__current');
					currentItemText.innerHTML = filterItemText;

					//получаем айди выбранного пункта фильтра и находим следующий нужный фильтр по айди
					let selectedFilterItemId = this.id;
					// console.log(selectedFilterItemId);
					// let selectedFilter = document.querySelector(`.item-filter__block--${selectedFilterItemId}`);
					// console.log(selectedFilter);
					// let selectedFilterClass = selectedFilter.classList.item(1);
					// console.log(selectedFilterClass);


					//	А вот тут у вас начнется кровь из глаз, прошу понять и простить.. на момент написания кода, я еще даже не начал изучать js нормально и писал "по наитию"
					switch (selectedFilterItemId) {
						case 'all':
							if (firstFilterId == 0) {
								document.querySelector(`.item-filter__block--clothes`).classList.remove('_open');
								document.querySelector(`.item-filter__block--dishes`).classList.remove('_open');
								document.querySelector(`.item-filter__block--covers`).classList.remove('_open');
								document.querySelector(`.item-filter__block--accessories`).classList.remove('_open');
								document.querySelector(`.item-filter__block--clothes-man`).classList.remove('_open');
								document.querySelector(`.item-filter__block--clothes-wom`).classList.remove('_open');
								document.querySelector(`.item-filter__block--dishes-cups`).classList.remove('_open');
								document.querySelector(`.item-filter__block--covers-smartfon`).classList.remove('_open');
								document.querySelector(`.item-filter__block--accessories-mousepads`).classList.remove('_open');
							} else {
								document.querySelector(`.item-filter__block--clothes`).classList.remove('_open');
								document.querySelector(`.item-filter__block--dishes`).classList.remove('_open');
								document.querySelector(`.item-filter__block--covers`).classList.remove('_open');
								document.querySelector(`.item-filter__block--accessories`).classList.remove('_open');
								document.querySelector(`.item-filter__block--clothes-man`).classList.remove('_open');
								document.querySelector(`.item-filter__block--clothes-wom`).classList.remove('_open');
								document.querySelector(`.item-filter__block--dishes-cups`).classList.remove('_open');
								document.querySelector(`.item-filter__block--covers-smartfon`).classList.remove('_open');
								document.querySelector(`.item-filter__block--accessories-mousepads`).classList.remove('_open');
								// Открываем кнопку фильтров
								filtersButton.classList.add('_open');
							}
							break;
						case 'clothes':
							document.querySelector(`.item-filter__block--clothes`).classList.add('_open');
							document.querySelector(`.item-filter__block--dishes`).classList.remove('_open');
							document.querySelector(`.item-filter__block--covers`).classList.remove('_open');
							document.querySelector(`.item-filter__block--accessories`).classList.remove('_open');
							document.querySelector(`.item-filter__block--clothes-man`).classList.remove('_open');
							document.querySelector(`.item-filter__block--clothes-wom`).classList.remove('_open');
							document.querySelector(`.item-filter__block--dishes-cups`).classList.remove('_open');
							document.querySelector(`.item-filter__block--covers-smartfon`).classList.remove('_open');
							document.querySelector(`.item-filter__block--accessories-mousepads`).classList.remove('_open');
							firstFilterId++;
							// Открываем кнопку фильтров
							filtersButton.classList.add('_open');
							break;
						case 'dishes':
							document.querySelector(`.item-filter__block--clothes`).classList.remove('_open');
							document.querySelector(`.item-filter__block--dishes`).classList.add('_open');
							document.querySelector(`.item-filter__block--covers`).classList.remove('_open');
							document.querySelector(`.item-filter__block--accessories`).classList.remove('_open');
							document.querySelector(`.item-filter__block--clothes-man`).classList.remove('_open');
							document.querySelector(`.item-filter__block--clothes-wom`).classList.remove('_open');
							document.querySelector(`.item-filter__block--dishes-cups`).classList.remove('_open');
							document.querySelector(`.item-filter__block--covers-smartfon`).classList.remove('_open');
							document.querySelector(`.item-filter__block--accessories-mousepads`).classList.remove('_open');
							firstFilterId++;
							// Открываем кнопку фильтров
							filtersButton.classList.add('_open');
							break;
						case 'covers':
							document.querySelector(`.item-filter__block--clothes`).classList.remove('_open');
							document.querySelector(`.item-filter__block--dishes`).classList.remove('_open');
							document.querySelector(`.item-filter__block--covers`).classList.add('_open');
							document.querySelector(`.item-filter__block--accessories`).classList.remove('_open');
							document.querySelector(`.item-filter__block--clothes-man`).classList.remove('_open');
							document.querySelector(`.item-filter__block--clothes-wom`).classList.remove('_open');
							document.querySelector(`.item-filter__block--dishes-cups`).classList.remove('_open');
							document.querySelector(`.item-filter__block--covers-smartfon`).classList.remove('_open');
							document.querySelector(`.item-filter__block--accessories-mousepads`).classList.remove('_open');
							firstFilterId++;
							// Открываем кнопку фильтров
							filtersButton.classList.add('_open');
							break;
						case 'accessories':
							document.querySelector(`.item-filter__block--clothes`).classList.remove('_open');
							document.querySelector(`.item-filter__block--dishes`).classList.remove('_open');
							document.querySelector(`.item-filter__block--covers`).classList.remove('_open');
							document.querySelector(`.item-filter__block--accessories`).classList.add('_open');
							document.querySelector(`.item-filter__block--clothes-man`).classList.remove('_open');
							document.querySelector(`.item-filter__block--clothes-wom`).classList.remove('_open');
							document.querySelector(`.item-filter__block--dishes-cups`).classList.remove('_open');
							document.querySelector(`.item-filter__block--covers-smartfon`).classList.remove('_open');
							document.querySelector(`.item-filter__block--accessories-mousepads`).classList.remove('_open');
							firstFilterId++;
							// Открываем кнопку фильтров
							filtersButton.classList.add('_open');
							break;

						case 'clothes-man':
							document.querySelector(`.item-filter__block--clothes-man`).classList.add('_open');
							document.querySelector(`.item-filter__block--clothes-wom`).classList.remove('_open');
							break;

						case 'clothes-wom':
							document.querySelector(`.item-filter__block--clothes-man`).classList.remove('_open');
							document.querySelector(`.item-filter__block--clothes-wom`).classList.add('_open');
							break;

						case 'dishes-cups':
							document.querySelector(`.item-filter__block--dishes-cups`).classList.add('_open');
							break;

						case 'covers-smartfon':
							document.querySelector(`.item-filter__block--covers-smartfon`).classList.add('_open');
							break;

						case 'accessories-mousepads':
							document.querySelector(`.item-filter__block--accessories-mousepads`).classList.add('_open');
							break;

						default:
							break;
					}

					// Закрываем выбранный фильтр тело и хедер
					filterBody.classList.remove('_active');
					filterHeader.classList.remove('_active');

				});
			});

		});
	});


};

itemFilter();


let asideMenu = function () {

	let startCheckInnerWidth = window.innerWidth;

	//============ функции прослушки ============

	//====== основное меню ======
	let listener_mainMenu_touch = function (e) {
		if (!this.classList.contains('_active')) {
			event.preventDefault();
			this.classList.add('_active');
		} else {
			this.classList.remove('_active');
		}
	}

	let listener_mainMenu_mouse_mOver = function (e) {
		this.classList.add('_active');
	};

	let listener_mainMenu_mouse_mOut = function (e) {
		this.classList.remove('_active');
	};

	//====== основное меню (родитель) ======

	let listener_mainMenuParent_touch = function (e) {

		let allLi = this.parentElement.children;
		for (let i = 0; i < allLi.length; i++) {
			const li = allLi[i];
			if (this != li) {
				if (li.classList.contains('_active')) {
					li.classList.remove('_active');
					li.querySelector('.sub-menu-categories--1').classList.remove('_active');
				};
			};
		}

		let currentSubMenu_1 = this.querySelector('.sub-menu-categories--1');
		currentSubMenu_1.classList.add('_active');
	};

	let listener_mainMenuParent_mouse_mOver = function (e) {
		let currentSubMenu_1 = this.querySelector('.sub-menu-categories--1');
		currentSubMenu_1.classList.add('_active');
	};

	let listener_mainMenuParent_mouse_mOut = function (e) {
		let currentSubMenu_1 = this.querySelector('.sub-menu-categories--1');
		currentSubMenu_1.classList.remove('_active');
	};

	//====== сабменю 1 уровень ======

	let listener_subMenu1_touch = function (e) {

		let allLi = this.parentElement.children;
		for (let i = 0; i < allLi.length; i++) {
			const li = allLi[i];
			if (this != li) {
				if (li.classList.contains('_active')) {
					li.classList.remove('_active');
					li.querySelector('.sub-menu-categories--2').classList.remove('_active');
				};
			};
		}

		let currentSubMenu_2 = this.querySelector('.sub-menu-categories--2');
		if (!this.classList.contains('_active')) {
			event.preventDefault();
			event.stopPropagation();
			currentSubMenu_2.classList.add('_active');
			this.classList.add('_active');
		} else {
			currentSubMenu_2.classList.remove('_active');
			this.classList.remove('_active');
		}
	};

	let listener_subMenu1_mouse_mOut = function (e) {
		let currentSubMenu_2 = this.querySelector('.sub-menu-categories--2');
		currentSubMenu_2.classList.remove('_active');
		this.classList.remove('_active');
	};

	let listener_subMenu1_mouse_mOver = function (e) {
		let currentSubMenu_2 = this.querySelector('.sub-menu-categories--2');
		currentSubMenu_2.classList.add('_active');
		this.classList.add('_active');
	};

	//====== сабменю 2 уровня ======

	let listener_subMenu2_touch = function (e) {

		let allLi = this.parentElement.children;
		for (let i = 0; i < allLi.length; i++) {
			const li = allLi[i];
			if (this != li) {
				if (li.classList.contains('_active')) {
					li.classList.remove('_active');
					li.querySelector('.sub-menu-categories--3').classList.remove('_active');
				};
			};
		}

		let currentSubMenu_3 = this.querySelector('.sub-menu-categories--3');
		if (!this.classList.contains('_active')) {
			event.preventDefault();
			event.stopPropagation();
			currentSubMenu_3.classList.add('_active');
			this.classList.add('_active');
		} else {
			currentSubMenu_3.classList.remove('_active');
			this.classList.remove('_active');
		}
	};

	let listener_subMenu2_mouse_mOver = function (e) {
		let currentSubMenu_3 = this.querySelector('.sub-menu-categories--3');
		currentSubMenu_3.classList.add('_active');
		this.classList.add('_active');
	};

	let listener_subMenu2_mouse_mOut = function (e) {
		let currentSubMenu_3 = this.querySelector('.sub-menu-categories--3');
		currentSubMenu_3.classList.remove('_active');
		this.classList.remove('_active');
	};

	//============

	//============ функции основные ============

	let asideMenu_touch = function () {

		// Нашли все пункты меню основного
		let menuLi = document.querySelectorAll('.menu-categories__li');
		// console.log(menuLi);

		//Каждому пункту меню основного 
		for (let i = 0; i < menuLi.length; i++) {
			const currentMenuLi = menuLi[i];

			// Убрали просулшку на каждый пункт меню основного (при наведении)
			currentMenuLi.removeEventListener('mouseover', listener_mainMenu_mouse_mOver);

			// Убрали просулшку на каждый пункт меню основного (при убирании)
			currentMenuLi.removeEventListener('mouseout', listener_mainMenu_mouse_mOut);

			// Повесили просулшку на каждый пункт меню основного (при нажатии)
			currentMenuLi.addEventListener('click', listener_mainMenu_touch);

		};


		// Нашли все пункты-родители меню основного
		let menuLiParent = document.querySelectorAll('.menu-categories__li--parent');
		// console.log(menuLiParent);


		//Каждому пункту-родителю меню основного 
		for (let i = 0; i < menuLiParent.length; i++) {
			const currentMenuLiParent = menuLiParent[i];

			// Нашли субменю 1 уровня
			let currentSubMenu_1 = currentMenuLiParent.querySelector('.sub-menu-categories--1');


			// Нашли все пункты субменю 1 уровня
			let subMenu_1_Li = currentSubMenu_1.querySelectorAll('.sub-menu-categories__li--1');


			//Каждому пункту субменю 1 уровня 
			for (let k = 0; k < subMenu_1_Li.length; k++) {
				const currentSubMenu_1_Li = subMenu_1_Li[k];

				// Нашли субменю 2 уровня
				let currentSubMenu_2 = currentSubMenu_1_Li.querySelector('.sub-menu-categories--2');


				// Нашли все пункты субменю 2 уровня
				let subMenu_2_Li = currentSubMenu_2.querySelectorAll('.sub-menu-categories__li--2');
				// console.log('Нашли все пункты субменю 2 уровня');
				// console.log(subMenu_2_Li);


				for (let j = 0; j < subMenu_2_Li.length; j++) {
					const currentSubMenu_2_Li = subMenu_2_Li[j];

					// Нашли субменю 3 уровня
					let currentSubMenu_3 = currentSubMenu_2_Li.querySelector('.sub-menu-categories--3');
					// console.log('Нашли субменю 3 уровня');
					// console.log(currentSubMenu_3);

					// Нашли все пункты субменю 3 уровня
					let subMenu_3_Li = currentSubMenu_3.querySelectorAll('.sub-menu-categories__li--3');
					// console.log('Нашли все пункты субменю 3 уровня');
					// console.log(subMenu_3_Li);

					// Повесили просулшку на каждый пункт субменю 2 уровня (при наведении)


					currentSubMenu_2_Li.removeEventListener('mouseover', listener_subMenu2_mouse_mOver);
					currentSubMenu_2_Li.removeEventListener('mouseout', listener_subMenu2_mouse_mOut);
					currentSubMenu_2_Li.addEventListener('click', listener_subMenu2_touch);

				}


				currentSubMenu_1_Li.removeEventListener('mouseover', listener_subMenu1_mouse_mOver);
				currentSubMenu_1_Li.removeEventListener('mouseout', listener_subMenu1_mouse_mOut);
				currentSubMenu_1_Li.addEventListener('click', listener_subMenu1_touch);

			};

			currentMenuLiParent.removeEventListener('mouseover', listener_mainMenuParent_mouse_mOver);
			currentMenuLiParent.removeEventListener('mouseout', listener_mainMenuParent_mouse_mOut);
			currentMenuLiParent.addEventListener('click', listener_mainMenuParent_touch);

		};

	};

	let asideMenu_mouse = function () {



		// Нашли все пункты меню основного
		let menuLi = document.querySelectorAll('.menu-categories__li');
		// console.log(menuLi);

		//Каждому пункту меню основного 
		for (let i = 0; i < menuLi.length; i++) {
			const currentMenuLi = menuLi[i];

			// Убрали просулшку на каждый пункт меню основного (при нажатии)
			currentMenuLi.removeEventListener('click', listener_mainMenu_touch);

			// Убрали просулшку на каждый пункт меню основного (при наведении)
			currentMenuLi.addEventListener('mouseover', listener_mainMenu_mouse_mOver);

			// Убрали просулшку на каждый пункт меню основного (при убирании)
			currentMenuLi.addEventListener('mouseout', listener_mainMenu_mouse_mOut);

		};


		// Нашли все пункты-родители меню основного
		let menuLiParent = document.querySelectorAll('.menu-categories__li--parent');
		// console.log(menuLiParent);


		//Каждому пункту-родителю меню основного 
		for (let i = 0; i < menuLiParent.length; i++) {
			const currentMenuLiParent = menuLiParent[i];

			// Нашли субменю 1 уровня
			let currentSubMenu_1 = currentMenuLiParent.querySelector('.sub-menu-categories--1');


			// Нашли все пункты субменю 1 уровня
			let subMenu_1_Li = currentSubMenu_1.querySelectorAll('.sub-menu-categories__li--1');


			//Каждому пункту субменю 1 уровня 
			for (let k = 0; k < subMenu_1_Li.length; k++) {
				const currentSubMenu_1_Li = subMenu_1_Li[k];

				// Нашли субменю 2 уровня
				let currentSubMenu_2 = currentSubMenu_1_Li.querySelector('.sub-menu-categories--2');


				// Нашли все пункты субменю 2 уровня
				let subMenu_2_Li = currentSubMenu_2.querySelectorAll('.sub-menu-categories__li--2');
				// console.log('Нашли все пункты субменю 2 уровня');
				// console.log(subMenu_2_Li);


				for (let j = 0; j < subMenu_2_Li.length; j++) {
					const currentSubMenu_2_Li = subMenu_2_Li[j];

					// Нашли субменю 3 уровня
					let currentSubMenu_3 = currentSubMenu_2_Li.querySelector('.sub-menu-categories--3');
					// console.log('Нашли субменю 3 уровня');
					// console.log(currentSubMenu_3);

					// Нашли все пункты субменю 3 уровня
					let subMenu_3_Li = currentSubMenu_3.querySelectorAll('.sub-menu-categories__li--3');
					// console.log('Нашли все пункты субменю 3 уровня');
					// console.log(subMenu_3_Li);

					currentSubMenu_2_Li.removeEventListener('click', listener_subMenu2_touch);
					currentSubMenu_2_Li.addEventListener('mouseover', listener_subMenu2_mouse_mOver);
					currentSubMenu_2_Li.addEventListener('mouseout', listener_subMenu2_mouse_mOut);

				}

				currentSubMenu_1_Li.removeEventListener('click', listener_subMenu1_touch);
				currentSubMenu_1_Li.addEventListener('mouseover', listener_subMenu1_mouse_mOver);
				currentSubMenu_1_Li.addEventListener('mouseout', listener_subMenu1_mouse_mOut);

			};

			currentMenuLiParent.removeEventListener('click', listener_mainMenuParent_touch);
			currentMenuLiParent.addEventListener('mouseover', listener_mainMenuParent_mouse_mOver);
			currentMenuLiParent.addEventListener('mouseout', listener_mainMenuParent_mouse_mOut);

		};

	};

	//============


	if (startCheckInnerWidth > 850) {
		asideMenu_mouse();
	} else {
		asideMenu_touch();
	};


	let сheckWindowInnerWidthSimple = function () {
		let InnerWidth = window.innerWidth;

		if (InnerWidth > 850) {
			asideMenu_mouse();
		} else {
			asideMenu_touch();
		};
	}

	window.addEventListener('resize', сheckWindowInnerWidthSimple);
};


asideMenu();



let popup = function () {
	const popupLinks = document.querySelectorAll('.popup-link');
	const popupCloseLinks = document.querySelectorAll('.close-popup');

	const body = document.querySelector('body');
	const wrapper = document.querySelector('.wrapper');


	if (popupLinks.length > 0) {
		popupLinks.forEach(popupLink => {
			popupLink.addEventListener('click', function (e) {
				let popupName = popupLink.getAttribute('href').replace('#', '');
				let currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
				e.preventDefault();
			});
		});
	}

	let popupOpen = function (currentPopup) {
		currentPopup.classList.add('_active');
		body.classList.add('_lock');


		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	};

	if (popupCloseLinks.length > 0) {
		popupCloseLinks.forEach(popupCloseLink => {
			popupCloseLink.addEventListener('click', function (e) {
				let currentPopup = popupCloseLink.closest('.popup');
				popupClose(currentPopup);
				e.preventDefault();
			});
		});
	};

	let popupClose = function (currentPopup) {
		currentPopup.classList.remove('_active');
		body.classList.remove('_lock');
		wrapper.classList.remove('_lock');
	};

}

popup();
let like_productCard = function () {
	let productCards = document.querySelectorAll('.indicators-box');

	if (productCards.length > 0) {
		for (let i = 0; i < productCards.length; i++) {
			const currentProductCard = productCards[i];
			const currentLikeLink = currentProductCard.querySelector('.likes');
			const currentLikeImg = currentLikeLink.querySelector('.like-img');
			const currentLikeValue = currentLikeLink.querySelector('.like-value');
			let count = 0;

			currentLikeLink.addEventListener('click', function (e) {
				e.preventDefault();
				if (count == 0) {
					count++;
					currentLikeValue.innerHTML = +currentLikeValue.innerHTML + 1;
					currentLikeLink.classList.add('_liked');
					currentLikeImg.classList.add('_liked');
					currentLikeValue.classList.add('_liked');
				} else {
					count--;
					currentLikeValue.innerHTML = +currentLikeValue.innerHTML - 1;
					currentLikeLink.classList.remove('_liked');
					currentLikeImg.classList.remove('_liked');
					currentLikeValue.classList.remove('_liked');
				}
			});
		}
	}

};

like_productCard();
let show_more = function () {
	let productsCard_hidden = document.querySelectorAll('.product-card._hidden');
	const button_showMore = document.querySelector('.pagination__btn');

	if (button_showMore) {

		if (productsCard_hidden.length == 0) {
			button_showMore.classList.add('_inactive');
		}

		button_showMore.addEventListener('click', function (e) {
			e.preventDefault();

			let windowInnerWidth = window.innerWidth;
			let numberOfCards = undefined;

			if (windowInnerWidth > 1120) {
				numberOfCards = 3;
			} else if (windowInnerWidth > 570) {
				numberOfCards = 2;
			} else {
				numberOfCards = 1;
			}


			if (productsCard_hidden.length > numberOfCards) {

				for (let i = 0; i < numberOfCards; i++) {
					const current_productCard_hidden = productsCard_hidden[i];
					current_productCard_hidden.classList.remove('_hidden');
					current_productCard_hidden.classList.add('_open');
					window.scrollBy({
						top: 300,
						left: 0,
						behavior: 'smooth'
					});
				}

				productsCard_hidden = document.querySelectorAll('.product-card._hidden');

				if (productsCard_hidden.length <= 0) {
					button_showMore.classList.add('_inactive');
				}


			} else if (productsCard_hidden.length > 0) {

				for (let i = 0; i < productsCard_hidden.length; i++) {
					const current_productCard_hidden = productsCard_hidden[i];
					current_productCard_hidden.classList.remove('_hidden');
					current_productCard_hidden.classList.add('_open');
					window.scrollBy({
						top: 300,
						left: 0,
						behavior: 'smooth'
					});
				}

				productsCard_hidden = document.querySelectorAll('.product-card._hidden');

				if (productsCard_hidden.length == 0) {
					button_showMore.classList.add('_inactive');

				}

			} else {
				button_showMore.classList.add('_inactive');

			};

		});

	}

};

show_more();

let hint_asideMenu = 'visibile';

let side_category_menu = function () {
	const btn = document.querySelector('.category-filter__btn');
	const sitePage = document.querySelector(".page");
	const body = document.querySelector('body');
	const wrapper = document.querySelector('.wrapper');
	const overlay = document.querySelector('.page-content__overlay--menu-categories');
	const menu = document.querySelector('.menu-categories');
	const menuCloser = document.querySelector('.menu-categories__body-closer');
	const hintCloser = document.querySelector('.menu-categories__hint-closer');



	if (btn) {

		btn.addEventListener('click', function (e) {
			e.preventDefault();
			overlay.classList.toggle('_open');
			if (hint_asideMenu == 'visibile') {
				menu.classList.toggle('_open');
				menu.classList.toggle('_hint');
			} else {
				menu.classList.toggle('_open');
			}
			sitePage.classList.toggle('_shifted');
			sitePage.classList.remove('_unshifted');
			body.classList.toggle('_lock');
			wrapper.classList.toggle('_lock');
			menuCloser.classList.toggle('_open');

			overlay.addEventListener('click', function (e) {
				if (!e.target.closest('.menu-categories')) {
					closeMenu();
				}
			});

			menuCloser.addEventListener('click', closeMenu);

			hintCloser.addEventListener('click', function (e) {
				e.preventDefault();
				hint_asideMenu = 'hide';
				menu.classList.remove('_hint');
			});
		});

		let closeMenu = function () {
			overlay.classList.remove('_open');
			menu.classList.remove('_open');
			menu.classList.remove('_hint');
			sitePage.classList.remove('_shifted');
			sitePage.classList.add('_unshifted');
			body.classList.remove('_lock');
			wrapper.classList.remove('_lock');
			menuCloser.classList.remove('_open');
		}
	}
}
side_category_menu();

let side_filters_menu = function () {
	const btn = document.querySelector('.page-header__filter-button');
	const sitePage = document.querySelector(".page");
	const body = document.querySelector('body');
	const wrapper = document.querySelector('.wrapper');
	const overlay = document.querySelector('.page-content__overlay--filters');
	const menu = document.querySelector('.page-content__filters');
	const menuCloser = document.querySelector('.page-content__filters-closer');

	if (btn) {

		btn.addEventListener('click', function (e) {
			e.preventDefault();
			overlay.classList.add('_open');
			menu.classList.toggle('_open');
			sitePage.classList.toggle('_shifted');
			sitePage.classList.remove('_unshifted');
			body.classList.toggle('_lock');
			wrapper.classList.toggle('_lock');
			menuCloser.classList.toggle('_open');

			overlay.addEventListener('click', function (e) {
				if (!e.target.closest('.page-content__filters')) {
					closeMenu();
				}
			});
			menuCloser.addEventListener('click', closeMenu);
		});

		let closeMenu = function () {
			overlay.classList.remove('_open');
			menu.classList.remove('_open');
			menu.classList.remove('_hint');
			sitePage.classList.remove('_shifted');
			sitePage.classList.add('_unshifted');
			body.classList.remove('_lock');
			wrapper.classList.remove('_lock');
			menuCloser.classList.remove('_open');
		}
	}

};

side_filters_menu();
let initSwipers = function () {
	let swipers = document.querySelectorAll('.swiper');

	if (swipers.length > 0) {
		swipers.forEach(function (elem) {

			if (elem.classList.contains('foto-block-swiper')) {

				new Swiper(elem, {

					direction: 'horizontal',
					loop: true,
					simulateTouch: true,
					slidesPerView: 1,
					watchOverFlow: true,
					slidesPerGroup: 1,
					spaceBetween: 0,

					observer: true,
					observeParents: true,
					observeSlideChildren: true,

					// Navigation arrows
					navigation: {
						nextEl: elem.nextElementSibling.nextElementSibling,
						prevEl: elem.nextElementSibling,
					},
				});
			}

			if (elem.classList.contains('items-menu-swiper')) {

				new Swiper(elem, {

					direction: 'horizontal',
					loop: false,
					simulateTouch: true,
					slidesPerView: 5,


					breakpoints: {
						// when window width is >
						0: {
							slidesPerView: 2,
							spaceBetween: 40
						},
						// when window width is >
						480: {
							slidesPerView: 3,
							spaceBetween: 40
						},
						// when window width is >
						640: {
							slidesPerView: 4,
							spaceBetween: 40
						},
						850: {
							slidesPerView: 3,
							spaceBetween: 40
						},
						// when window width is >
						990: {
							slidesPerView: 4,
							spaceBetween: 40
						},
						// when window width is >
						1120: {
							slidesPerView: 5,
							spaceBetween: 40
						}
					},


					watchOverFlow: true,
					slidesPerGroup: 1,


					observer: true,
					observeParents: true,
					observeSlideChildren: true,

					// Navigation arrows
					navigation: {
						nextEl: elem.nextElementSibling.nextElementSibling,
						prevEl: elem.nextElementSibling,
					},
					mousewheel: {
						sensitivity: 1,
					}

				});
			}

			if (elem.classList.contains('printSlider-swiper')) {

				new Swiper(elem, {

					direction: 'horizontal',
					loop: true,
					simulateTouch: true,
					// slidesPerView: 5,
					watchOverFlow: true,
					slidesPerGroup: 1,
					// spaceBetween: 10,

					breakpoints: {
						// when window width is >
						0: {
							slidesPerView: 1,
							spaceBetween: 10
						},
						// when window width is >
						530: {
							slidesPerView: 2,
							spaceBetween: 10
						},
						// when window width is >
						730: {
							slidesPerView: 3,
							spaceBetween: 10
						},
						850: {
							slidesPerView: 4,
							spaceBetween: 10
						},
						// when window width is >
						// 990: {
						// 	slidesPerView: 4,
						// 	spaceBetween: 10
						// },
						// when window width is >
						1120: {
							slidesPerView: 5,
							spaceBetween: 10
						}
					},



					observer: true,
					observeParents: true,
					observeSlideChildren: true,

					// Navigation arrows
					navigation: {
						nextEl: elem.nextElementSibling.nextElementSibling,
						prevEl: elem.nextElementSibling,
					},
				});
			}

			if (elem.classList.contains('slider-infoProduct__swiper')) {

				new Swiper(elem, {

					direction: 'horizontal',
					loop: true,
					simulateTouch: true,
					// slidesPerView: 5,
					watchOverFlow: true,
					slidesPerGroup: 1,
					// spaceBetween: 10,

					breakpoints: {
						// when window width is >
						0: {
							slidesPerView: 1,
							spaceBetween: 0
						},
						// when window width is >
						530: {
							slidesPerView: 1,
							spaceBetween: 0
						},
						// when window width is >
						730: {
							slidesPerView: 1,
							spaceBetween: 0
						},
						850: {
							slidesPerView: 1,
							spaceBetween: 0
						},
						1120: {
							slidesPerView: 1,
							spaceBetween: 0
						}
					},



					observer: true,
					observeParents: true,
					observeSlideChildren: true,

					// Navigation arrows
					navigation: {
						nextEl: elem.nextElementSibling.nextElementSibling,
						prevEl: elem.nextElementSibling,
					},
				});
			}

		});
	}


}

initSwipers();


let productItemMenu = function () {
	const groupTitles = document.querySelectorAll('.items-menu__item-group-title');
	const groupBodies = document.querySelectorAll('.items-menu__item-group-items');
	const groupSwiperButtonsPrev = document.querySelectorAll('.swiper-button-prev');
	const groupSwiperButtonsNext = document.querySelectorAll('.swiper-button-next');



	if (groupTitles.length > 0 && groupBodies.length > 0) {
		groupTitles.forEach(currentTitle => {

			currentTitle.addEventListener('click', function (e) {

				e.preventDefault();
				groupTitles.forEach(title => {
					title.classList.remove('_active')
				});
				currentTitle.classList.add('_active');

				let currentBodyName = currentTitle.getAttribute('href').replace('#', '');
				let currentBody = document.getElementById(currentBodyName);
				groupBodies.forEach(body => {
					body.classList.remove('_active')
				});
				currentBody.classList.add('_active');

				let currentSwiperButtonPrev = currentBody.nextElementSibling;
				groupSwiperButtonsPrev.forEach(button => {
					button.classList.remove('_active')
				});
				currentSwiperButtonPrev.classList.add('_active');

				let currentSwiperButtonNext = currentBody.nextElementSibling.nextElementSibling;
				groupSwiperButtonsNext.forEach(button => {
					button.classList.remove('_active')
				});
				currentSwiperButtonNext.classList.add('_active');
			});
		});
	}
}

productItemMenu();
const productValueCount = function () {
	const button = document.querySelector('.value-button');
	const btnMinus = button.querySelector('.value-button__minus');
	const btnPlus = button.querySelector('.value-button__plus');
	const quantity = button.querySelector('.value-button__quantity');
	const priceDefaultValue = document.querySelector('.item-price-block__price span').innerHTML;
	const price = document.querySelector('.item-price-block__price span');
	let count = button.querySelector('.value-button__quantity').innerHTML;

	btnMinus.addEventListener('click', function (e) {
		e.preventDefault();
		if (count > 1) {
			count--;
		}
		quantity.innerHTML = count;
		priceChange();
	});

	btnPlus.addEventListener('click', function (e) {
		e.preventDefault();
		count++;
		quantity.innerHTML = count;
		priceChange();
	});

	const priceChange = function () {
		price.innerHTML = count * priceDefaultValue;
	}

}

productValueCount();
const addToCardBtn = function () {

	const btn = document.querySelector('.item-price-block__button');
	const colorInputs = document.querySelectorAll('.item-color-block__input');
	const sizeInputs = document.querySelectorAll('.item-size-block__input');
	let checkedInputColor;
	let checkedInputSize;
	let successValue;

	if (btn) {

		btn.addEventListener('click', function (e) {
			e.preventDefault();

			if (colorInputs.length > 0) {
				colorInputs.forEach(function (inputBlock) {
					if (inputBlock.querySelector('input:checked')) {
						checkedInputColor = inputBlock.querySelector('input:checked');
					}
				})
			}

			if (sizeInputs.length > 0) {
				sizeInputs.forEach(function (inputBlock) {
					if (inputBlock.querySelector('input:checked')) {
						checkedInputSize = inputBlock.querySelector('input:checked');
					}
				})
			}

			if (checkedInputColor && checkedInputSize) {
				successValue = '_success';
				doublePopup(successValue);
				btn.classList.add('_success');
				btn.innerHTML = 'Товар в корзине'

			} else {
				successValue = '_error';
				doublePopup(successValue);
			}

		})

	}

}

addToCardBtn();
let doublePopup = function (value) {

	const popupLinks = document.querySelectorAll('.double-popup-link');
	const popupCloseLinks = document.querySelectorAll('.close-popup');
	const body = document.querySelector('body');
	const wrapper = document.querySelector('.wrapper');


	if (popupLinks.length > 0) {
		popupLinks.forEach(popupLink => {
			let popupName = popupLink.getAttribute('href').replace('#', '') + value;
			let currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		});
	}

	if (popupCloseLinks.length > 0) {
		popupCloseLinks.forEach(popupCloseLink => {
			popupCloseLink.addEventListener('click', function (e) {
				let currentPopup = popupCloseLink.closest('.popup');
				popupClose(currentPopup);
				e.preventDefault();
			});
		});
	};

	function popupOpen(currentPopup) {
		currentPopup.classList.add('_active');
		body.classList.add('_lock');
	}

	function popupClose(currentPopup) {
		currentPopup.classList.remove('_active');
		body.classList.remove('_lock');
		wrapper.classList.remove('_lock');
	};

}
let productTabsBottom = function () {
	const groupTitles = document.querySelectorAll('.bottomTabs__title');
	const groupBodies = document.querySelectorAll('.bottomTabs__body');

	if (groupTitles.length > 0 && groupBodies.length > 0) {
		groupTitles.forEach(currentTitle => {

			currentTitle.addEventListener('click', function (e) {

				e.preventDefault();
				groupTitles.forEach(title => {
					title.classList.remove('_active')
				});
				currentTitle.classList.add('_active');

				let currentBodyName = currentTitle.getAttribute('href').replace('#', '');
				let currentBody = document.getElementById(currentBodyName);
				groupBodies.forEach(body => {
					body.classList.remove('_active')
				});
				currentBody.classList.add('_active');

			});

		});
	}
}

productTabsBottom();

