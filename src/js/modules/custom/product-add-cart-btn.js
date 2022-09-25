const addToCardBtn = function () {

	const btn = document.querySelector('.item-price-block__button');
	const colorInputs = document.querySelectorAll('.item-color-block__input');
	const sizeInputs = document.querySelectorAll('.item-size-block__input');
	let checkedInputColor;
	let checkedInputSize;
	let successValue;

	if (btn) {

		btn.addEventListener('click', function (e) {
			e.preventDefault();

			if (colorInputs.length > 0) {
				colorInputs.forEach(function (inputBlock) {
					if (inputBlock.querySelector('input:checked')) {
						checkedInputColor = inputBlock.querySelector('input:checked');
					}
				})
			}

			if (sizeInputs.length > 0) {
				sizeInputs.forEach(function (inputBlock) {
					if (inputBlock.querySelector('input:checked')) {
						checkedInputSize = inputBlock.querySelector('input:checked');
					}
				})
			}

			if (checkedInputColor && checkedInputSize) {
				successValue = '_success';
				doublePopup(successValue);
				btn.classList.add('_success');
				btn.innerHTML = 'Товар в корзине'

			} else {
				successValue = '_error';
				doublePopup(successValue);
			}

		})

	}

}

addToCardBtn();