


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