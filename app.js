let ticking = false;
let activationPoint = (window.innerHeight * 0.5);
const animatedElems = document.getElementsByClassName("animate-onscroll");

function initAnimations() {
  for (let i = 0; i < animatedElems.length; i++) {
    // add can-animate so browsers that don't support rAF won't show unfinished animation states
    animatedElems[i].classList.add("can-animate-onscroll");
  }
}
function update() {
  for (let i = 0; i < animatedElems.length; i++) {
    const eleY = animatedElems[i].getBoundingClientRect().y;
    const elemClass = animatedElems[i].classList;
    if ( eleY < activationPoint ){
      elemClass.add("animate-onscroll-start");
    } else if ( elemClass.contains("animate-onscroll-start") ) {
      elemClass.remove("animate-onscroll-start");
    }
  }
  // when finished with stuff, reset ticking so new rAF can be started
  ticking = false;
}

function onScroll() {
  // check if rAF is already running
  if(!ticking) {
		requestAnimationFrame(update);
    // set rAF as running so we don't call it again until last one finishes
    ticking = true;
	}
}
function onResize() {
  activationPoint = (window.innerHeight * 0.5);
}

if (animatedElems.length > 0) {
  requestAnimationFrame(initAnimations);
  window.addEventListener('scroll', onScroll, false);
  window.addEventListener('resize', onResize, false);
}
