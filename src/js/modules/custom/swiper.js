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

