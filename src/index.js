import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();
const heroSmall = require("./assets/hero/hero-540.mp4");
const heroLarge = require("./assets/hero/hero-960.mp4");
const heroXL = require("./assets/hero/hero-1260.mp4");

$(document).ready(function () {
  /* Hero Video Resolution */
  const heroVideo = $("#hero-video")[0];
  let windowWidth = $(window).width();
  function heroVideoRes() {
    if (windowWidth < 700) {
      heroVideo.src = heroSmall;
      $(heroVideo).addClass("small");
    } else if (windowWidth < 960) {
      heroVideo.src = heroLarge;
      $(heroVideo).addClass("large");
    } else {
      heroVideo.src = heroXL;
      $(heroVideo).addClass("x-large");
    }
  }
  heroVideoRes();
  // Update Hero Video source on resize
  window.onresize = () => {
    if ($(window).width() < 700 && !$(heroVideo).hasClass("small")) {
      heroVideo.src = heroSmall;
      $(heroVideo).addClass("small");
      $(heroVideo).removeClass("large");
      $(heroVideo).removeClass("x-large");
    } else if (
      $(window).width() >= 700 &&
      $(window).width() < 960 &&
      ($(heroVideo).hasClass("small") || $(heroVideo).hasClass("x-large"))
    ) {
      heroVideo.src = heroLarge;
      $(heroVideo).addClass("large");
      $(heroVideo).removeClass("small");
      $(heroVideo).removeClass("x-large");
    } else if ($(window).width() >= 960 && !$(heroVideo).hasClass("x-large")) {
      heroVideo.src = heroXL;
      $(heroVideo).addClass("x-large");
      $(heroVideo).removeClass("small");
      $(heroVideo).removeClass("large");
    }
  };
  /* Carousel Setting */
  $(".carousel").slick({
    autoplay: false,
    autoplaySpeed: 4000,
    fade: true,
    dots: true,
    mobileFirst: false,
    cssEase: "ease-in-out",
  });
  // Fix to allow Mobile to keep swipe and auto-slide
  $(".carousel").on("touchstart", (e) => {
    $(".carousel").slick("slickPlay");
  });

  // ScrollSpy scroll-to functionality

  $(".navbar li a").click((event) => {
    event.preventDefault();
    const offset = 60;
    console.log($($(event.target).attr("href"))[0]);
    const elemPos = $($(event.target).attr("href"))[0].getBoundingClientRect()
      .top;
    console.log(elemPos);
    const offsetPos = elemPos - offset;
    window.scrollBy({
      top: offsetPos,
      behavior: "smooth",
    });
    $(".navbar-collapse").removeClass("show");
    $(".navbar-toggler").addClass("collapsed");
  });

  // SCROLL TO TOP functionality
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      $("#back-to-top").addClass("show");
    } else {
      $("#back-to-top").removeClass("show");
    }
  });
  // On Click, scroll to top
  $("#back-to-top").click(function () {
    $("#back-to-top").tooltip("hide");
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });
  $("#back-to-top").tooltip("show");

  // Initialize Animate On Scroll (AOS)
  AOS.init({
    duration: 700,
    once: true,
    easing: "ease-in-out",
  });
});
