
let latestKnownScrollY = 0;
let ticking = false;
let windowHeight = window.innerHeight;
const animatedEl = document.getElementsByClassName("animate-onscroll");

function update() {
	ticking = false;
  const activationPoint = latestKnownScrollY + (windowHeight * 0.5);

  for (let i = 0; i < animatedEl.length; i++) {
    // set base animation styles in css with .can-animate-onscroll
    // so browsers that don't support RAF won't show unfinished animation states
    animatedEl[i].classList.add("can-animate-onscroll");
    if (animatedEl[i].offsetTop < (activationPoint) ){
      animatedEl[i].classList.add("animate-onscroll-start");
    } else {
      animatedEl[i].classList.remove("animate-onscroll-start");
    }
  }

}

function requestTick() {
	if(!ticking) {
		requestAnimationFrame(update);
	}
	ticking = true;
}

function onScroll() {
	latestKnownScrollY = window.scrollY;
	requestTick();
}
function onResize() {
	windowHeight = window.innerHeight;
}

window.addEventListener('scroll', onScroll, false);
window.addEventListener('resize', onResize, false);

