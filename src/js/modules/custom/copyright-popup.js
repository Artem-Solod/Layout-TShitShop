let copyrightLink = document.querySelector('.copyright__link');
let copyrightInfo = document.querySelector('.copyright__info');
copyrightLink.addEventListener("click", prevDef);
copyrightLink.addEventListener('click', function () {
	copyrightInfo.classList.toggle('_active');
});

