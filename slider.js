var sliders = document.querySelectorAll(".slider-wrapper");
span;

window.addEventListener("resize", () => {
  for (let i = 0; i < sliders.length; i++) {
    setWrapperWidth(sliders[i]);
  }
});

for (let i = 0; i < sliders.length; i++) {
  let slider = sliders[i].querySelector(".slider");

  setWrapperWidth(sliders[i]);
}

function transition(el, from, to, dir, cb) {
  let inc = from;
  let spd = 20;
  let interval = setInterval(() => {
    if (inc >= to) {
      clearInterval(interval);
      spd = to - inc;
      cb(); // callback
    }
    el.scrollLeft = dir === "right" ? el.scrollLeft + spd : el.scrollLeft - spd;
    inc += spd;
  }, 8);
}

function setWrapperWidth(sliderWrapper) {
  let slider = sliderWrapper.querySelector(".slider");
  let wrapper = slider.querySelector(".wrapper");
  let slides = wrapper.querySelectorAll(".slide");

  wrapper.style.width =
    (slides.length - 1) * (slides[0].clientWidth + 8) +
    slides[slides.length - 1].clientWidth +
    "px";
}

// laptop swipe;
const dots = document.querySelectorAll(".dot");
const listSlider = document.querySelector(".slider-container"),
  slides = Array.from(document.querySelectorAll(".slide__child"));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  indexClick = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelectorAll(".slide__item")[0];
  const slideImage1 = slide.querySelectorAll(".slide__item")[1];
  // disable default image drag
  slideImage.addEventListener("dragstart", (e) => e.preventDefault());
  slideImage1.addEventListener("dragstart", (e) => e.preventDefault());

  // touch events
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);
  // mouse events
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mousemove", touchMove);
  slide.addEventListener("mouseleave", touchEnd);
});

dots.forEach((item, index) => {
  item.addEventListener("click", () => {
    touchStart(index);
    currentTranslate = index * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();

    if (index !== indexClick) {
      dots[indexClick].className = dots[indexClick].className.replace(
        " dot-active",
        ""
      );
      item.classList.add("dot-active");
    }
    indexClick = index;
  });
});

// make responsive to viewport changes
window.addEventListener("resize", setPositionByIndex);

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
  };
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  dots;
  let i = 0;
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }

  dots[currentIndex].className += " dot-active";
  indexClick = currentIndex;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function setSliderPosition() {
  listSlider.style.transform = `translateX(${currentTranslate}px)`;
}
