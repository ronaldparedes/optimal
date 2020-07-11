$(document).ready(function () {
  $(".carousel").slick({
    autoplay: false,
    fade: true,
    dots: true,
  });

  // $("body").scrollspy({ offset: "300px" });

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
});
