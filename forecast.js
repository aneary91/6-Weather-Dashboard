let submitEl = document.querySelector('#goButton');
  
let weatherDateEl = document.getElementsByClassName("card-title");
let temperatureEl = document.getElementById("temp");
let humidityEl = document.getElementById("humidity");
let selectedCityEl = document.getElementsByClassName("card-body");
let selectedCityTempEl = document.getElementById("temperature__Placeholder");
let selectedCityWindEl = document.getElementById("wind__Placeholder");
let selectedCityUvEl = document.getElementById("UV__Placeholder");
let cityButtons = document.getElementsByClassName("city");
let selectedCityNameEl = document.getElementById("city__Placeholder");
const apiKey = "a2f6fce88cfc4a69918f36922a1be74b";



// api used to get weather information based on the city

async function getWeatherData(city){
  const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey;
  
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let lat = data.city.coord.lat
    let lon = data.city.coord.lon
    
    console.log('weather!!');
    console.log(data);
    
    getWeeklyForecast(lat,lon);
  });
}

// api to get weekly forecast information and uv index 

async function getWeeklyForecast(lat, lon){
  const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;
  
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    
    console.log('weekly forecast');
    console.log(data);
    accessWeatherData(data);
    });
}

// Grabbing the value from the search bar to compare api information with 

  let form = document.getElementById("form");
  form.addEventListener("submit", getSearchBarValue)
  console.log(form)
  
  

  
  function getSearchBarValue(event) {
    event.preventDefault();
    let searchCityItem = document.getElementById("search").value;
    let cityText = document.createTextNode(searchCityItem);
    let searchCityDiv = document.createElement('button');
    let searchCityHeader = document.createElement("h1");
    let cityContainer = document.getElementById("cityBox");
    
    searchCityDiv.id = searchCityItem;
    searchCityHeader.id = "headerId"
    
    cityContainer.appendChild(searchCityDiv);
    searchCityDiv.appendChild(searchCityHeader)
    searchCityHeader.appendChild(cityText)
    
    let city = JSON.parse(localStorage.getItem("city")) || [];
    city.push(searchCityItem);
    localStorage.setItem("city", JSON.stringify(city));
    
    getWeatherData(searchCityItem);
  }
  
  // save cities from search to a list from local storage
  
  let cities = JSON.parse(localStorage.getItem("city")) || [];
  for (let i = 0; i < cities.length; i++) {
    const searchCityItem = cities[i];
    
    let cityText = document.createTextNode(searchCityItem);
    let cityContainer = document.getElementById("cityBox");
    let searchCityDiv = document.createElement('button');
    let searchCityHeader = document.createElement("h1");
    
    searchCityDiv.className = "searchCityItem";
    searchCityHeader.id = "headerId"
    
    searchCityHeader.appendChild(cityText)
    cityContainer.appendChild(searchCityDiv);
    searchCityDiv.appendChild(searchCityHeader)

    // let topCardNameSpot = document.createElement("h1")
    // selectedCityNameEl.appendChild(topCardNameSpot)
    // topCardNameSpot.appendChild(cityText);

    
    
    
    // clear list from local storage
    let clear = document.getElementById("clear")
    clear.addEventListener("click", clearCityList)
    
    function clearCityList() {
      window.localStorage.removeItem("city");
      location.reload(false);
    }
  }
  
  
function accessWeatherData(data) {
    
// getting Temperature data ~for the day~ and display on top card
 let tempValue = data.current.temp 
 let tempText = document.createTextNode(tempValue)
 let addTempToDiv = selectedCityEl[0].appendChild(selectedCityTempEl)

  addTempToDiv.appendChild(tempText)

// getting wind speed ~for the day~ and display on top card
 let windValue = data.current.wind_speed
 let windText = document.createTextNode(windValue)
 let addWindToDiv = selectedCityEl[0].appendChild(selectedCityWindEl)
  
  addWindToDiv.appendChild(windText)

//getting UV Index ~for that day~ and display on top card
 let uv = data.current.uvi;
 let uvText = document.createTextNode(uv)

  selectedCityUvEl.appendChild(uvText);
 
  if(uv <= 2){
    selectedCityUvEl.style.color = "lightgreen";
  } else if (uv >= 3 && uv <= 5){
    selectedCityUvEl.style.color = "darkyellow";
  } else {
    selectedCityUvEl.style.color = "red";
  }



// looping through the api to list and display the current day, time, temperature, and humidity for the weekly forcast 

  for(let i = 0; i < 5; i++) {
    let forecastTempValue = data.daily[i].temp.day;
    let unixTimeStamp = data.daily[i].dt;
    let date = new Date(unixTimeStamp * 1000);
    let humidity = data.daily[i].humidity;

    let cardDate = document.getElementsByClassName("card-title")[i];
    let cardTemp = document.getElementsByClassName("card-temp")[i];
    let cardHumidity = document.getElementsByClassName("card-text")[i];

    cardDate.textContent = date;
    cardTemp.textContent = "Temp(F): " + forecastTempValue;
    cardHumidity.textContent = "Humidity: " + humidity;

  }
 
}

