
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