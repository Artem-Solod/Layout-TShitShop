

let asideMenu = function () {

	let startCheckInnerWidth = window.innerWidth;

	//============ функции прослушки ============

	//====== основное меню ======
	let listener_mainMenu_touch = function (e) {
		if (!this.classList.contains('_active')) {
			event.preventDefault();
			this.classList.add('_active');
		} else {
			this.classList.remove('_active');
		}
	}

	let listener_mainMenu_mouse_mOver = function (e) {
		this.classList.add('_active');
	};

	let listener_mainMenu_mouse_mOut = function (e) {
		this.classList.remove('_active');
	};

	//====== основное меню (родитель) ======

	let listener_mainMenuParent_touch = function (e) {

		let allLi = this.parentElement.children;
		for (let i = 0; i < allLi.length; i++) {
			const li = allLi[i];
			if (this != li) {
				if (li.classList.contains('_active')) {
					li.classList.remove('_active');
					li.querySelector('.sub-menu-categories--1').classList.remove('_active');
				};
			};
		}

		let currentSubMenu_1 = this.querySelector('.sub-menu-categories--1');
		currentSubMenu_1.classList.add('_active');
	};

	let listener_mainMenuParent_mouse_mOver = function (e) {
		let currentSubMenu_1 = this.querySelector('.sub-menu-categories--1');
		currentSubMenu_1.classList.add('_active');
	};

	let listener_mainMenuParent_mouse_mOut = function (e) {
		let currentSubMenu_1 = this.querySelector('.sub-menu-categories--1');
		currentSubMenu_1.classList.remove('_active');
	};

	//====== сабменю 1 уровень ======

	let listener_subMenu1_touch = function (e) {

		let allLi = this.parentElement.children;
		for (let i = 0; i < allLi.length; i++) {
			const li = allLi[i];
			if (this != li) {
				if (li.classList.contains('_active')) {
					li.classList.remove('_active');
					li.querySelector('.sub-menu-categories--2').classList.remove('_active');
				};
			};
		}

		let currentSubMenu_2 = this.querySelector('.sub-menu-categories--2');
		if (!this.classList.contains('_active')) {
			event.preventDefault();
			event.stopPropagation();
			currentSubMenu_2.classList.add('_active');
			this.classList.add('_active');
		} else {
			currentSubMenu_2.classList.remove('_active');
			this.classList.remove('_active');
		}
	};

	let listener_subMenu1_mouse_mOut = function (e) {
		let currentSubMenu_2 = this.querySelector('.sub-menu-categories--2');
		currentSubMenu_2.classList.remove('_active');
		this.classList.remove('_active');
	};

	let listener_subMenu1_mouse_mOver = function (e) {
		let currentSubMenu_2 = this.querySelector('.sub-menu-categories--2');
		currentSubMenu_2.classList.add('_active');
		this.classList.add('_active');
	};

	//====== сабменю 2 уровня ======

	let listener_subMenu2_touch = function (e) {

		let allLi = this.parentElement.children;
		for (let i = 0; i < allLi.length; i++) {
			const li = allLi[i];
			if (this != li) {
				if (li.classList.contains('_active')) {
					li.classList.remove('_active');
					li.querySelector('.sub-menu-categories--3').classList.remove('_active');
				};
			};
		}

		let currentSubMenu_3 = this.querySelector('.sub-menu-categories--3');
		if (!this.classList.contains('_active')) {
			event.preventDefault();
			event.stopPropagation();
			currentSubMenu_3.classList.add('_active');
			this.classList.add('_active');
		} else {
			currentSubMenu_3.classList.remove('_active');
			this.classList.remove('_active');
		}
	};

	let listener_subMenu2_mouse_mOver = function (e) {
		let currentSubMenu_3 = this.querySelector('.sub-menu-categories--3');
		currentSubMenu_3.classList.add('_active');
		this.classList.add('_active');
	};

	let listener_subMenu2_mouse_mOut = function (e) {
		let currentSubMenu_3 = this.querySelector('.sub-menu-categories--3');
		currentSubMenu_3.classList.remove('_active');
		this.classList.remove('_active');
	};

	//============

	//============ функции основные ============

	let asideMenu_touch = function () {

		// Нашли все пункты меню основного
		let menuLi = document.querySelectorAll('.menu-categories__li');
		// console.log(menuLi);

		//Каждому пункту меню основного 
		for (let i = 0; i < menuLi.length; i++) {
			const currentMenuLi = menuLi[i];

			// Убрали просулшку на каждый пункт меню основного (при наведении)
			currentMenuLi.removeEventListener('mouseover', listener_mainMenu_mouse_mOver);

			// Убрали просулшку на каждый пункт меню основного (при убирании)
			currentMenuLi.removeEventListener('mouseout', listener_mainMenu_mouse_mOut);

			// Повесили просулшку на каждый пункт меню основного (при нажатии)
			currentMenuLi.addEventListener('click', listener_mainMenu_touch);

		};


		// Нашли все пункты-родители меню основного
		let menuLiParent = document.querySelectorAll('.menu-categories__li--parent');
		// console.log(menuLiParent);


		//Каждому пункту-родителю меню основного 
		for (let i = 0; i < menuLiParent.length; i++) {
			const currentMenuLiParent = menuLiParent[i];

			// Нашли субменю 1 уровня
			let currentSubMenu_1 = currentMenuLiParent.querySelector('.sub-menu-categories--1');


			// Нашли все пункты субменю 1 уровня
			let subMenu_1_Li = currentSubMenu_1.querySelectorAll('.sub-menu-categories__li--1');


			//Каждому пункту субменю 1 уровня 
			for (let k = 0; k < subMenu_1_Li.length; k++) {
				const currentSubMenu_1_Li = subMenu_1_Li[k];

				// Нашли субменю 2 уровня
				let currentSubMenu_2 = currentSubMenu_1_Li.querySelector('.sub-menu-categories--2');


				// Нашли все пункты субменю 2 уровня
				let subMenu_2_Li = currentSubMenu_2.querySelectorAll('.sub-menu-categories__li--2');
				// console.log('Нашли все пункты субменю 2 уровня');
				// console.log(subMenu_2_Li);


				for (let j = 0; j < subMenu_2_Li.length; j++) {
					const currentSubMenu_2_Li = subMenu_2_Li[j];

					// Нашли субменю 3 уровня
					let currentSubMenu_3 = currentSubMenu_2_Li.querySelector('.sub-menu-categories--3');
					// console.log('Нашли субменю 3 уровня');
					// console.log(currentSubMenu_3);

					// Нашли все пункты субменю 3 уровня
					let subMenu_3_Li = currentSubMenu_3.querySelectorAll('.sub-menu-categories__li--3');
					// console.log('Нашли все пункты субменю 3 уровня');
					// console.log(subMenu_3_Li);

					// Повесили просулшку на каждый пункт субменю 2 уровня (при наведении)


					currentSubMenu_2_Li.removeEventListener('mouseover', listener_subMenu2_mouse_mOver);
					currentSubMenu_2_Li.removeEventListener('mouseout', listener_subMenu2_mouse_mOut);
					currentSubMenu_2_Li.addEventListener('click', listener_subMenu2_touch);

				}


				currentSubMenu_1_Li.removeEventListener('mouseover', listener_subMenu1_mouse_mOver);
				currentSubMenu_1_Li.removeEventListener('mouseout', listener_subMenu1_mouse_mOut);
				currentSubMenu_1_Li.addEventListener('click', listener_subMenu1_touch);

			};

			currentMenuLiParent.removeEventListener('mouseover', listener_mainMenuParent_mouse_mOver);
			currentMenuLiParent.removeEventListener('mouseout', listener_mainMenuParent_mouse_mOut);
			currentMenuLiParent.addEventListener('click', listener_mainMenuParent_touch);

		};

	};

	let asideMenu_mouse = function () {



		// Нашли все пункты меню основного
		let menuLi = document.querySelectorAll('.menu-categories__li');
		// console.log(menuLi);

		//Каждому пункту меню основного 
		for (let i = 0; i < menuLi.length; i++) {
			const currentMenuLi = menuLi[i];

			// Убрали просулшку на каждый пункт меню основного (при нажатии)
			currentMenuLi.removeEventListener('click', listener_mainMenu_touch);

			// Убрали просулшку на каждый пункт меню основного (при наведении)
			currentMenuLi.addEventListener('mouseover', listener_mainMenu_mouse_mOver);

			// Убрали просулшку на каждый пункт меню основного (при убирании)
			currentMenuLi.addEventListener('mouseout', listener_mainMenu_mouse_mOut);

		};


		// Нашли все пункты-родители меню основного
		let menuLiParent = document.querySelectorAll('.menu-categories__li--parent');
		// console.log(menuLiParent);


		//Каждому пункту-родителю меню основного 
		for (let i = 0; i < menuLiParent.length; i++) {
			const currentMenuLiParent = menuLiParent[i];

			// Нашли субменю 1 уровня
			let currentSubMenu_1 = currentMenuLiParent.querySelector('.sub-menu-categories--1');


			// Нашли все пункты субменю 1 уровня
			let subMenu_1_Li = currentSubMenu_1.querySelectorAll('.sub-menu-categories__li--1');


			//Каждому пункту субменю 1 уровня 
			for (let k = 0; k < subMenu_1_Li.length; k++) {
				const currentSubMenu_1_Li = subMenu_1_Li[k];

				// Нашли субменю 2 уровня
				let currentSubMenu_2 = currentSubMenu_1_Li.querySelector('.sub-menu-categories--2');


				// Нашли все пункты субменю 2 уровня
				let subMenu_2_Li = currentSubMenu_2.querySelectorAll('.sub-menu-categories__li--2');
				// console.log('Нашли все пункты субменю 2 уровня');
				// console.log(subMenu_2_Li);


				for (let j = 0; j < subMenu_2_Li.length; j++) {
					const currentSubMenu_2_Li = subMenu_2_Li[j];

					// Нашли субменю 3 уровня
					let currentSubMenu_3 = currentSubMenu_2_Li.querySelector('.sub-menu-categories--3');
					// console.log('Нашли субменю 3 уровня');
					// console.log(currentSubMenu_3);

					// Нашли все пункты субменю 3 уровня
					let subMenu_3_Li = currentSubMenu_3.querySelectorAll('.sub-menu-categories__li--3');
					// console.log('Нашли все пункты субменю 3 уровня');
					// console.log(subMenu_3_Li);

					currentSubMenu_2_Li.removeEventListener('click', listener_subMenu2_touch);
					currentSubMenu_2_Li.addEventListener('mouseover', listener_subMenu2_mouse_mOver);
					currentSubMenu_2_Li.addEventListener('mouseout', listener_subMenu2_mouse_mOut);

				}

				currentSubMenu_1_Li.removeEventListener('click', listener_subMenu1_touch);
				currentSubMenu_1_Li.addEventListener('mouseover', listener_subMenu1_mouse_mOver);
				currentSubMenu_1_Li.addEventListener('mouseout', listener_subMenu1_mouse_mOut);

			};

			currentMenuLiParent.removeEventListener('click', listener_mainMenuParent_touch);
			currentMenuLiParent.addEventListener('mouseover', listener_mainMenuParent_mouse_mOver);
			currentMenuLiParent.addEventListener('mouseout', listener_mainMenuParent_mouse_mOut);

		};

	};

	//============


	if (startCheckInnerWidth > 850) {
		asideMenu_mouse();
	} else {
		asideMenu_touch();
	};


	let сheckWindowInnerWidthSimple = function () {
		let InnerWidth = window.innerWidth;

		if (InnerWidth > 850) {
			asideMenu_mouse();
		} else {
			asideMenu_touch();
		};
	}

	window.addEventListener('resize', сheckWindowInnerWidthSimple);
};


asideMenu();


