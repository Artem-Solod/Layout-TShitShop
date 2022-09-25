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