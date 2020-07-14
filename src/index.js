import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

$(document).ready(function () {
  $(".carousel").slick({
    autoplay: true,
    fade: true,
    dots: true,
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
  });

  // SCROLL TO TOP functionality
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      // $("#back-to-top").fadeIn();
      $("#back-to-top").addClass("show");
    } else {
      // $("#back-to-top").fadeOut();
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
    duration: 800,
    once: false,
    easing: "ease-in-out",
  });
});
