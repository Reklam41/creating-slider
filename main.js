let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let listItemDom = document.querySelector(".carousel .list");
let thumbnailDom = document.querySelector(".carousel .thumbnails"); // Correct parent for thumbnails

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runAutoRun;

function startAutoRun() {
  runAutoRun = setTimeout(() => {
    nextDom.onclick(); // This will move the slider to the next item
    startAutoRun(); // Restart the auto-run timeout
  }, timeAutoNext);
}

// Initial call to start auto-running
startAutoRun();

function showSlider(type) {
  let itemSlider = document.querySelectorAll(".carousel .list .item");
  let itemThumbnail = document.querySelectorAll(".carousel .thumbnails .item");

  if (type === "next") {
    // Move the first item to the end for both slider and thumbnails
    listItemDom.appendChild(itemSlider[0]);
    thumbnailDom.appendChild(itemThumbnail[0]); // Append to the parent, not the NodeList
    carouselDom.classList.add("next");
  } else {
    let positionLastItem = itemSlider.length - 1;
    listItemDom.prepend(itemSlider[positionLastItem]);
    thumbnailDom.prepend(itemThumbnail[positionLastItem]);
    carouselDom.classList.add("prev");
  }

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runAutoRun); // Stop the previous auto-run timeout to reset
  startAutoRun(); // Restart auto-run after each manual interaction
}
