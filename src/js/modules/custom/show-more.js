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
