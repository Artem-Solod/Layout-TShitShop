const productValueCount = function () {
	const button = document.querySelector('.value-button');
	const btnMinus = button.querySelector('.value-button__minus');
	const btnPlus = button.querySelector('.value-button__plus');
	const quantity = button.querySelector('.value-button__quantity');
	const priceDefaultValue = document.querySelector('.item-price-block__price span').innerHTML;
	const price = document.querySelector('.item-price-block__price span');
	let count = button.querySelector('.value-button__quantity').innerHTML;

	btnMinus.addEventListener('click', function (e) {
		e.preventDefault();
		if (count > 1) {
			count--;
		}
		quantity.innerHTML = count;
		priceChange();
	});

	btnPlus.addEventListener('click', function (e) {
		e.preventDefault();
		count++;
		quantity.innerHTML = count;
		priceChange();
	});

	const priceChange = function () {
		price.innerHTML = count * priceDefaultValue;
	}

}

productValueCount();