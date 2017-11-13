
let latestKnownScrollY = 0;
let ticking = false;
let windowHeight = window.innerHeight;
const animatedEl = document.getElementsByClassName("animate-onscroll");

function update() {
	ticking = false;
  // where to activate .5 = 50%, .2 = 20% of screen
  const offsetAmount = .5;
  const activationPoint = latestKnownScrollY + (windowHeight * offsetAmount);

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

// run update once to initialize css animations
update();

window.addEventListener('scroll', onScroll, false);
window.addEventListener('resize', onResize, false);
