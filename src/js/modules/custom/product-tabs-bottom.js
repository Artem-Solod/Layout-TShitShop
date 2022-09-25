let productTabsBottom = function () {
	const groupTitles = document.querySelectorAll('.bottomTabs__title');
	const groupBodies = document.querySelectorAll('.bottomTabs__body');

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

			});

		});
	}
}

productTabsBottom();