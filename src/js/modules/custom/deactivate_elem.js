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