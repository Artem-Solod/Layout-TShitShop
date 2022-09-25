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