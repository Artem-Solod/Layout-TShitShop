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