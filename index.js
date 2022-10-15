//animation parallax
const parallaxes = document.querySelectorAll(".parallax");
document.addEventListener("scroll", (event) => {
  parallaxes.forEach((item) => {
    if (item.offsetTop - window.scrollY < 550) {
      item.classList.add("parallax__active");
    }
  });
});

// modal
const modal = document.getElementById("myModal");
const button = document.getElementById("btn-open-modal");
button.onclick = function () {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const span = document.getElementsByClassName("close")[0];

modal.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "unset";
};

// tab
const tab = document.querySelectorAll(".header__tab");

function changeTab() {
  let selection = 0;
  tab.forEach((item, index) => {
    tab[selection].classList.add("tab-active");
    item.addEventListener("click", () => {
      if (selection !== index) {
        item.classList.add("tab-active");
        tab[selection].classList.remove("tab-active");
        selection = index;
        console.log(selection);
      }
    });
  });
}
changeTab();

//questions
const questions = document.querySelectorAll(".questions__item--sentence");
const answers = document.querySelectorAll(".questions__item--content");

function changeQuestion() {
  let selection = 0;
  questions.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (selection !== index) {
        answers[index].classList.add("item-selected");
        item.classList.add("open-active");
        questions[selection].classList.remove("open-active");
        answers[selection].classList.remove("item-selected");
        selection = index;
      }
    });
  });
}
changeQuestion();

// slider
