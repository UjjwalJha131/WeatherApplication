let searchBar = document.getElementById("search-bar");
var myKey = keys.myApi;

const weather = {
  apiKey: myKey,

  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    document.getElementById("city").innerText = "Weather in " + name + " , " + country;

    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    document.getElementById("description").innerText = description;

    document.getElementById("temp").innerText = temp + "°C";

    document.getElementById("humidity").innerText =
      "Humidity = " + humidity + " %";

    document.getElementById("wind").innerText =
      "Wind speed = " + speed + " km/h";

      document.querySelector(".weather").classList.remove("loading");
  },

  
  search: () => {
    weather.fetchWeather(document.getElementById("search-bar").value);
  }

};

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

searchBar.addEventListener("keyup" , (event)=> {
    if(event.key == "Enter") {
      weather.search();
    }
});

weather.fetchWeather("Goa")
