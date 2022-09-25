let like_productCard = function () {
	let productCards = document.querySelectorAll('.indicators-box');

	if (productCards.length > 0) {
		for (let i = 0; i < productCards.length; i++) {
			const currentProductCard = productCards[i];
			const currentLikeLink = currentProductCard.querySelector('.likes');
			const currentLikeImg = currentLikeLink.querySelector('.like-img');
			const currentLikeValue = currentLikeLink.querySelector('.like-value');
			let count = 0;

			currentLikeLink.addEventListener('click', function (e) {
				e.preventDefault();
				if (count == 0) {
					count++;
					currentLikeValue.innerHTML = +currentLikeValue.innerHTML + 1;
					currentLikeLink.classList.add('_liked');
					currentLikeImg.classList.add('_liked');
					currentLikeValue.classList.add('_liked');
				} else {
					count--;
					currentLikeValue.innerHTML = +currentLikeValue.innerHTML - 1;
					currentLikeLink.classList.remove('_liked');
					currentLikeImg.classList.remove('_liked');
					currentLikeValue.classList.remove('_liked');
				}
			});
		}
	}

};

like_productCard();