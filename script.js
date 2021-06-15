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


