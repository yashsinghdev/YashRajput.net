(function () {
  window.addEventListener("load", function () {
    const loader = document.getElementById("loading-wrapper");
    // add fade-out class after a short delay to show animation first
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 600); // let the moon pulse a bit
  });
})();
