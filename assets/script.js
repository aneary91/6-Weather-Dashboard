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
  var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=metric';
    fetch(forecastURL).then(response => response.json()) 
      .then(json => {
        console.log(json) 
        // reset html to ot repeat 5 day forecast over and over again\
        document.getElementById('fiveDay').innerHTML = ''
        for (let i = 0; i < json.list.length; i++) {
          if (json.list[i].dt_txt.indexOf('15:00:00') !== -1) {
            // a card with 5 day forecast 
            let col = `
            <div class="card forecast">
            <div class="card-body">
              <h5 class="card-title">${new Date(
                        json.list[i].dt_txt)
                    .toLocaleDateString()}</h5>
              <img src='${"http://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png"}'/>
              <p class="card-text">${"Temperature: " + json.list[i].main.temp_max +
                        " °C"}</p>
              <p class="card-text">${"Humidity: " + json.list[i].main.humidity + "%"}</p>
            </div>
          </div> `
          document.getElementById('fiveDay').innerHTML += col 
          }
        }
      })
    }

function uv(lat, lon) {
  let uvURL =  'http://api.openweathermap.org/data/2.5/uvi?appid=' + APIkey + '&lat=' + lat + '&lon=' + lon;
  fetch(uvURL).then(response => response.json())
  .then(json => {
    console.log(json)
    document.getElementById('uvin').innerHTML = 'UV Index: ' + json.value
  })
}
// create list of cities searched to be added underneath search 
function createList(city) {
  var cityList = document.getElementById("searchedCities")
  var list = `<button>${city}</button>`
  cityList.innerHTML += list
}

// make the searched cities list clickable
document.getElementById("searchedCities").addEventListener("click", function (event) {
  if (!event.target.classList.contains("something")) {
      searchCity(event.target.textContent)
  }
})
