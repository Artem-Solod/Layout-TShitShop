let collabBtn = document.querySelector('.menu-collaboration__btn');
let collabMenu = document.querySelector('.menu-collaboration__body');
collabBtn.addEventListener("click", prevDef);
collabBtn.addEventListener('click', function () {
	collabBtn.classList.toggle('_open');
	collabMenu.classList.toggle('_active');
});



