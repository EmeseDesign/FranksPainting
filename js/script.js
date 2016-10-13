$(function () {//Same as document.addEventListener("DOMContentLoaded")

//Same as document.querySelector("navbarToggle").addEventListener("blur
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $ ("#collapsable-nav").collapse('hide');
      }
  });
});

function (global) {
  var dc = {};
  var homeHTML = "snoppets/home-snippet.html";
  var allCategoriesUrl=
    "http://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html"
    var menuItemsUrl =
        "http://davids-restaurant.herokuapp.com/categories.json?category=";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";

  //Convinience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(select);
    targetElem.innerHTML = html;
  };

  //Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='img/ajax-loader.gif'></div>";
    insertHtml(selectorn, html);
  };
}

//Return substitute of '{{propName}}'
//with propVaLue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

  //On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {

  //On first load, show home view
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    homeHTML,
    function(responseText) {
      document.querySelector("main-content")
      .innerHTML = responseText;
    },
  false);
});
//Load the menu categories view
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};

//Builds HTML for the categories page based on the data
//from the server
function buildAndShowCategoriesHTML (categories) {
  //Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      //Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          var categoriesViewHtml =
          buildCategoriesViewHtml(categories,
                                  categoriesTitleHtml,
                                  categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        }
        false);
    }
    false);
}
//Using categories data and snippets html
//Using categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                categoriesTitleHtml,
                                categoryHtml) {
    var finalHtml = categoriesTitleHtml;
    finalHtml += "<section class='row'>";

    //Loop over categories
    for (var i = 0; i < categories.length; i++) {
      //insert category values
      var html = categoryHtml;
      var name = "" + categories[i].name;
      var short_name = categories[i].short_name;
      html =
        insertProperty(html, "name", name);
      html =
        insertProperty(html,
                      "short_name",
                      short_name);
      finalHtml += html;
    }
    finalHtml += "</section>";
    return finalHtml;
  }

global.$dc = dc;
})(window);
}
