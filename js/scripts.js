// NOTE on the function syntax below.  $(function () {...}) is called the "ready method in jQuery".  It is simply syntax that tells the browser
//that when the page is finished loading function is forthcoming and to run the code inside of the braces.  Sometimes you'll see it written
// as: $(document).ready.(function()...; however, that's outdated syntax. You DON'T need one of these function blocks for every script in order
// to initialize them.  You can embed more than one disparate script inside of a single function block
$(function () {
  var header = $(".navbar");

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
      if ($("#hamburger-btn").attr("aria-expanded") == "false") {
        header.removeClass("navbar-clean");
        header.addClass("navbar-default");
      }
    } else {
      if ($("#hamburger-btn").attr("aria-expanded") == "false") {
        header.removeClass("navbar-default");
        header.addClass("navbar-clean");
      }
    }
  });

  $(window).on("resize", function () {
    var win = $(this); //this = window
    if ($("#hamburger-btn").attr("aria-expanded") == "true" && win.width() >= 576) {
      $("#hamburger-btn").click();
    }
  });

  $("#loginButton").click(function () {
    $("#loginModal").modal("show");
  });

  $("#odenwellnessNavbar").on("show.bs.collapse	", function () {
    $(".navbar").addClass("navbar-default");
  });

  $("#odenwellnessNavbar").on("hide.bs.collapse", function () {
    $(".navbar").removeClass("navbar-default");
  });
});
