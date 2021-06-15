var apiKey = "285b694a07fb7ee5601483eddbb06432";

// we are going to grab the input from the input element on click
document.getElementById('searchButton').onclick = function () {
  var enteredCity = document.getElementById('cityInput').value
  if (enertedCity) {
    // this is to clear the input feail once selected
    document.getElementById('cityInput').value = ''
    seachCity(enertedCity)
  }
}

// instructing searched citied appear underneath search bar as a list from hte local localStorage
function makeList(){
  var savedCity = JSON.parse(localStorage.getItem('cities')) || []
  for (let i = 0; i < savedcities.length; i++) {
    createList(savedcities[i])
  }
}
makeList()

// created a seach city function
async function searchCity(city) {
  var cities = JSON.parse(localStorage.getItem("cities")) || []
  if (cities.indexOf(city) === -1) {
      cities.push(city)
      localStorage.setItem("cities", JSON.stringify(cities))
      createList(city)
  }
// weather url
var urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric';

var time = moment().format('MMMM Do YYYY, h:m:ss a');

// now we are going to fetch this info based on the location entered
fetch(urlWeather).then(response => response.json())
.then(json => {
  console.log(json)
// this is inserting the weather requirements into the HTML 
  document.getElementById("cityTitle").innerHTML = json.name
            document.getElementById("currentDate").innerHTML = "Current Date: " + `${time}`            
            document.getElementById("temperature").innerHTML = "Temperature: " + json.main.temp
            document.getElementById("humidity").innerHTML = "Humidity: " + json.main.humidity
            document.getElementById("wind").innerHTML = "Wind Speed: " + json.wind.speed
            document.getElementById("weatherIcon").src = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png"
 // latitude & longitude to get the UV index 
 var lat = json.coord.lat
 var lon = json.coord.lon
 forecast(city)
 uv(lat, lon)
})
.catch(err => console.log('Request failed', err))
}

// this is going to create a function to insert the 5 day forcast into the HTML
function forecast(city) {
  //5 day forcast fetch 
  var forecastURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric';

  var time = moment().format('MMMM Do YYYY, h:mm:ss a');

  //fetch info based on location entered
  fetch(urlWeather).then(response => response.json())
    .then(json => {
      console.log(json)
      //inserting the weather information inot the HTML document
            document.getElementById("cityTitle").innerHTML = json.name
            document.getElementById("currentDate").innerHTML = "Current Date: " + `${time}`            
            document.getElementById("temperature").innerHTML = "Temperature: " + json.main.temp
            document.getElementById("humidity").innerHTML = "Humidity: " + json.main.humidity
            document.getElementById("wind").innerHTML = "Wind Speed: " + json.wind.speed
            document.getElementById("weatherIcon").src = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png"
    })
}