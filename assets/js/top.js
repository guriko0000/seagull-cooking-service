jQuery(function ($) {

// swiper
// ________________________________________________________

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	loop: true,
  effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: true
	},
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});




// ヘッダー背景色変化
// ________________________________________________________

function scrollFunction() {
  var mvHeight = document.querySelector("#mv").offsetHeight - 100;
  var this_y = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;

  var header = document.querySelector(".l-header--transparent"); // 修正箇所

  if (this_y > mvHeight) {
    header.classList.add("bg");
  } else {
    header.classList.remove("bg");
  }
}

document.addEventListener("DOMContentLoaded", scrollFunction);
window.addEventListener("load", scrollFunction);

scrollFunction();

window.addEventListener("scroll", scrollFunction);



  
});