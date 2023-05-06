let searchBar = document.getElementById("search-bar");

const weather = {
  apiKey: "7880f7604815c7b8ccc2b953fd5c704c",

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
    const { name} = data;
    const { country} = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.getElementById("city").innerText = "Weather in " + name+ ", " + country;

    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    document.getElementById("description").innerText = description;

    document.getElementById("temp").innerText = temp + "°C";

    document.getElementById("humidity").innerText =
      "Humidity is " + humidity + " %";

    document.getElementById("wind").innerText =
      "Wind speed is " + speed + " km/h";

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
