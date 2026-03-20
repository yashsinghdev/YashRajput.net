(function () {
  // Wait until everything is loaded, then hide loader and reveal content with smoothness
  window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("mainContent");

    // minimal delay to enjoy animation, but smooth
    setTimeout(() => {
      loader.classList.add("hidden");
      mainContent.style.opacity = "1";
    }, 1800); // 1.8s loader experience
  });

  // fallback if load already (rare, but okay)
  if (document.readyState === "complete") {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("mainContent");
    if (loader && mainContent) {
      setTimeout(() => {
        loader.classList.add("hidden");
        mainContent.style.opacity = "1";
      }, 300);
    }
  }
})();
