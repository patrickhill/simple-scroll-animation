let ticking = false;
let activationPoint = window.innerHeight * 0.5;
const animatedElems = document.getElementsByClassName('animate-onscroll');

function initAnimations() {
  for (let i = 0; i < animatedElems.length; i++) {
    // add can-animate so browsers that don't support rAF won't show unfinished animation states
    animatedElems[i].classList.add('can-animate-onscroll');
  }
}
function update() {
  for (let i = 0; i < animatedElems.length; i++) {
    const eleY = animatedElems[i].getBoundingClientRect().y;
    const elemClass = animatedElems[i].classList;
    if (eleY < activationPoint) {
      elemClass.add('animate-onscroll-running');
      elemClass.remove('animate-onscroll-paused');
    } else if (elemClass && elemClass.contains('animate-onscroll-running')) {
      elemClass.remove('animate-onscroll-running');
      elemClass.add('animate-onscroll-paused');
    }
  }
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}
function onResize() {
  activationPoint = window.innerHeight * 0.5;
}

if (animatedElems.length > 0) {
  requestAnimationFrame(initAnimations);
  window.addEventListener('scroll', onScroll, false);
  window.addEventListener('resize', onResize, false);
}
