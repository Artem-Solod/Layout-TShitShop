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
