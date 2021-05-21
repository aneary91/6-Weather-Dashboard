$(document).ready(function () {
  var apiKey = "285b694a07fb7ee5601483eddbb06432";

  $("#goButton").on("click", function () {
    // grabbing the search values of the city
    var searchedCity = $("#yoCity").val();
    // empties search input after search is intiated
    $("#yoCity").val("");
    console.log(searchedCity);
    currentForecast(searchedCity);
  });

  function currentForecast(city) {
    $.ajax({
      type: "GET",
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=imperial",
      dataType: "json",
      success: function (response) {
        const yoCityTitle = $('<h3>').addClass('card-title').text(response.name)
          console.log(yoCityTitle)
      },
    });
  }
});
