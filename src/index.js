$(document).ready(function () {
  $(".carousel").slick({
    autoplay: false,
    fade: true,
    dots: true,
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
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
