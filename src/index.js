import React from "react";
import ReactDOM from "react-dom";
import ReactReviews from "./components/Reviews";
import smoothscroll from "smoothscroll-polyfill";
const domContainer = document.querySelector("#react-container");
ReactDOM.render(<ReactReviews />, domContainer);

import LazyLoad from "vanilla-lazyload";

// (function () {
//   function logElementEvent(eventName, element) {
//     console.log(Date.now(), eventName, element.getAttribute("data-src"));
//   }

//   var callback_enter = function (element) {
//     logElementEvent("🔑 ENTERED", element);
//   };
//   var callback_exit = function (element) {
//     logElementEvent("🚪 EXITED", element);
//   };
//   var callback_loading = function (element) {
//     logElementEvent("⌚ LOADING", element);
//   };
//   var callback_loaded = function (element) {
//     logElementEvent("👍 LOADED", element);
//   };
//   var callback_error = function (element) {
//     logElementEvent("💀 ERROR", element);
//     element.src = "https://via.placeholder.com/440x560/?text=Error+Placeholder";
//   };
//   var callback_cancel = function (element) {
//     logElementEvent("🔥 CANCEL", element);
//   };
//   var callback_finish = function () {
//     logElementEvent("✔️ FINISHED", document.documentElement);
//   };

// const ll = new LazyLoad(
//   {
//   // Assign the callbacks defined above
//   callback_enter: callback_enter,
//   callback_exit: callback_exit,
//   callback_cancel: callback_cancel,
//   callback_loading: callback_loading,
//   callback_loaded: callback_loaded,
//   callback_error: callback_error,
//   callback_finish: callback_finish,
// });
// }
// )();

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
  $(".carousel-action").on("touchstart", (e) => {
    $(".carousel-action").slick("slickPlay");
  });

  $(".carousel-action").slick({
    autoplaySpeed: 4000,
    speed: 1000,
    autoplay: true,
    centerMode: true,
    variableWidth: true,
    slidesToShow: 1,
    dots: true,
    lazyLoad: "ondemand",
  });

  /* ScrollSpy scroll-to functionality */

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
  const ll = new LazyLoad({
    // callback_load: function () {
    //   AOS.refresh();
    // },
  });
  document
    .querySelectorAll("img")
    .forEach((img) => img.addEventListener("load", () => AOS.refresh()));

  $("#noticeModal").modal();
  $("#noticeModal").on("hidden.bs.modal", (e) => {
    $(".carousel").slick("slickPlay");
  });
});
