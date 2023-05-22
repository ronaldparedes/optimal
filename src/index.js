import React from "react";
import ReactDOM from "react-dom";
import ReactReviews from "./components/Reviews";
import GoogleReviews from "./components/GoogleReviews";
import smoothscroll from "smoothscroll-polyfill";
const domContainer = document.querySelector("#react-container");
ReactDOM.render(<ReactReviews />, domContainer);
ReactDOM.render(
  <GoogleReviews />,
  document.querySelector("#google-review-container")
);

import LazyLoad from "vanilla-lazyload";

smoothscroll.polyfill();
const heroSmall = require("./assets/hero/hero-540.mp4");
const heroLarge = require("./assets/hero/hero-960.mp4");
const heroXL = require("./assets/hero/hero-1260.mp4");

$(document).ready(function () {
  function weStandWithUkraine() {
    const el = document.createElement("div");
    el.title = "We stand with Ukraine";
    el.style.position = "fixed";
    el.style.left = "-85px";
    el.style.bottom = "15px";
    el.style.width = "300px";
    el.style.height = "84px";
    el.style.transform = "rotate(45deg)";
    el.style.zIndex = "999";
    el.style.background = "linear-gradient(-180deg, #005BBB 50%, #FFD500 50%)";
    el.style.textAlign = "center";
    el.style.opacity = "0.9";
    el.style.fontSize = "1.05rem";
    el.style.fontFamily = "salsa";
    el.style.textShadow = "0px 1px 1px rgb(0 0 0 / 50%)";
    el.style.boxShadow = "0px 1px 3px rgb(0 0 0 / 60%)";
    document.body.appendChild(el);
    const sp = document.createElement("span");
    const sp2 = document.createElement("span");
    sp.style.marginTop = "0.5rem";
    sp.textContent = "We Stand With";
    sp.style.display = "inline-block";
    sp.style.color = "#FFD500";
    el.appendChild(sp);
    sp2.style.display = "block";
    sp2.style.marginTop = "0.9rem";
    sp2.textContent = "UKRAINE";
    sp2.style.color = "#005BBB";
    el.appendChild(sp2);
  }
  weStandWithUkraine();

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
    // lazyLoad: "ondemand",
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
