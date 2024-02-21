function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  let city = response.data.city;
  cityElement.innerHTML = city;

  let descriptionElement = document.querySelector("#description");
  description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  let humidityElement = document.querySelector("#humidity");
  humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let speedElement = document.querySelector("#speed");
  speed = response.data.wind.speed;
  speedElement.innerHTML = `${speed}km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  let icon = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${icon}" class="weather-app-icon" />`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = `${day} ${hours}:${minutes}`;
  return time;
}

function searchCity(city) {
  let apiKey = "cb4440cc8b49o2e10d5a63f3ecftcafe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
