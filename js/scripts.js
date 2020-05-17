// NOTE on the function syntax below.  $(function () {...}) is called the "ready method in jQuery".  It is simply syntax that tells the browser
//that when the page is finished loading function is forthcoming and to run the code inside of the braces.  Sometimes you'll see it written
// as: $(document).ready.(function()...; however, that's outdated syntax. You DON'T need one of these function blocks for every script in order
// to initialize them.  You can embed more than one disparate script inside of a single function block
$(function () {
  var cardToDelete = {};
  var cardData = [];
  var rowId = 0;

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

  //BEGIN: RECIPE FORM
  $("#recipeButton").click(function () {
    $("#recipeModal").modal("show");
  });

  function submitRecipe(event) {
    event.preventDefault();

    console.log("addRecipe");
    console.log(event.target);

    let title = $(event.target).find("#recipeTitle")[0].value;
    let steps = $(event.target).find("#recipeSteps")[0].value;
    rowId++;
    cardData.push({ rowId: rowId, title: title, steps: steps, defaultImg: "../img/path.png" });
    var cardContainer = document.getElementById("card-container");
    createRecipeCard(cardData[cardData.length - 1], cardContainer);
    $("#recipeModal").modal("toggle");
    console.log("array");
    console.log(cardData);
    return false;
  }

  // EDIT RECIPE
  function editRecipe(event) {
    event.preventDefault();
    $("#recipeModal").modal("show");

    console.log("editRecipe");
    console.log(event);

    let title = $(event.target).find("#recipeTitle")[0].value;
    let steps = $(event.target).find("#recipeSteps")[0].value;

    var cardContainer = document.getElementById("card-container");

    return false;
  }

  const form = document.getElementById("recipeForm");
  form?.addEventListener("submit", submitRecipe);
  //END: RECIPE FORM

  // BEGIN BUILD RECIPE CARD
  let createRecipeCard = (values, container) => {
    let col = document.createElement("div");
    col.className = "col mt-2 md-4 parent";

    let cardBtnWrapper = document.createElement("div");
    cardBtnWrapper.className = "row mx-1";

    let edit = document.createElement("a");
    edit.href = "#";
    edit.className = "col m-1 btn btn-secondary btn-sm mr-5";
    edit.innerText = "edit";
    edit.type = "button";
    edit.addEventListener("click", editRecipe);

    let close = document.createElement("button");
    close.href = "#";
    close.className = "m-1 btn-sm card-close";
    close.innerHTML = "&times;";
    close.type = "button";

    let image = document.createElement("img");
    image.src = values.defaultImg;
    image.alt = values.defaultImg;
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
    cardBtnWrapper.appendChild(edit);

    cardBtnWrapper.appendChild(close);
    card.appendChild(cardBtnWrapper);
    card.appendChild(image);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
    // BEGIN BUILD RECIPE CARD

    //Remove Recipe Card
    $(".card-close").click(function () {
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
