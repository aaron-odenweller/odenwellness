// NOTE on the function syntax below.  $(function () {...}) is called the "ready method in jQuery".  It is simply syntax that tells the browser
//that when the page is finished loading function is forthcoming and to run the code inside of the braces.  Sometimes you'll see it written
// as: $(document).ready.(function()...; however, that's outdated syntax. You DON'T need one of these function blocks for every script in order
// to initialize them.  You can embed more than one disparate script inside of a single function block
$(function () {
  var cardToDelete = {};
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

  //BEGIN: Recipe Page
  $("#recipeButton").click(function () {
    $("#recipeModal").modal("show");
  });

  function logSubmit(event) {
    event.preventDefault();

    console.log("addRecipe");
    console.log(event.target);

    let title = $(event.target).find("#recipeTitle")[0].value;
    let steps = $(event.target).find("#recipeSteps")[0].value;

    var cardContainer = document.getElementById("card-container");
    createRecipeCard({ title: title, steps: steps }, cardContainer);
    $("#recipeModal").modal("toggle");
    return false;
  }

  const form = document.getElementById("recipeForm");
  form?.addEventListener("submit", logSubmit);

  let createRecipeCard = (values, container) => {
    let col = document.createElement("div");
    col.className = "col mb-4 parent";

    let close = document.createElement("a");
    close.href = "#";
    close.className = "close p-1 btn btn-secondary";
    close.innerText = "remove";
    close.type = "button";

    let image = document.createElement("img");
    image.src = "../img/path.png";
    image.alt = "../img/path.png";
    image.className = "card-img-top img-responsive";

    let card = document.createElement("div");
    card.className = "card shadow pointer";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("h5");
    title.innerText = values.title;
    title.className = "card-title";

    let text = document.createElement("div");
    text.innerText = values.steps;
    text.className = "text-truncate";

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    card.appendChild(close);
    card.appendChild(image);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);

    //END: RECIPE FORM

    //Remove Recipe Card
    $(".close").click(function () {
      cardToDelete = $(this).closest("div .parent");
      $("#confirmDeleteRecipe").modal("show");
    });

    $("#confirmDeleteRecipe").on("show.bs.modal", function (event) {
      console.log("event");
      console.log($(event.relatedTarget));
      var button = $(event.relatedTarget); // Button that triggered the modal
      document.getElementById("deleteYesBtn").addEventListener("click", removeCard);
    });
    $("#confirmDeleteRecipe").on("hidden.bs.modal", function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      document.getElementById("deleteYesBtn").removeEventListener("click", removeCard);
    });

    function removeCard() {
      cardToDelete.remove();

      $("#confirmDeleteRecipe").modal("hide"); //Write condition to only hide if shown
    }
  };

  //END: Recipe Page
});
