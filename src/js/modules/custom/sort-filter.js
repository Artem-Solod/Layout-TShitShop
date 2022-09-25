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



