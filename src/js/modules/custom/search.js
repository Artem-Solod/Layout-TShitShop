let searchButton = document.querySelector(".search__input-button");
let searchBlock = document.querySelector(".search");

searchButton.addEventListener('click', prevDef);
searchButton.addEventListener('click', activeSearch);


function activeSearch() {
	searchButton = document.querySelector(".search__input-button");

	if (searchButton.classList.contains('_closed')) {
		console.log('кслосед - есть');
		searchButton.classList.remove('_closed');
		searchBlock.classList.add('_active');
		searchButton.classList.add('_active');
		searchButton.removeEventListener("click", prevDef);
	} else if (!searchButton.classList.contains('_active')) {
		console.log('актив - нету, кслосед - нету, добавили актив, убрали прев деф кнопке');
		searchBlock.classList.add('_active');
		searchButton.classList.add('_active');

		searchButton.removeEventListener("click", prevDef);
	} else {
		console.log('нету клосед, есть актив');
		searchButton.removeEventListener("click", prevDef);
	}
}
