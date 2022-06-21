const container = document.querySelector(".container");
const inputValue = document.querySelector(".city-input");

const getCityWeatherData = async (city) => {
  container.querySelector(".weather-results").remove();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city || "amman"
      }&appid=86b78b748956567ca49bac9290126416&units=metric`
    );

    const data = await response.json();
    const html = `
    <div class="weather-results">
    <div class="results-top">
      <div class="city-temp">
        <p class="city"> ${data.name}</p>
        <p class="temp">${data.main.temp}°C</p>
      </div>
      <div class="desc">
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        <p class="desc-title">${data.weather[0].description}</p>
      </div>
    </div>
  
    <div class="other-infos">
      <div class="humidity">
        <p class="humidity-value">${data.main.humidity} %</p>
        <p class="humidity-title">Humidity</p>
      </div>
      <div class="wind">
        <p class="wind-value">${data.wind.speed} km/h</p>
        <p class="wind-title">Wind</p>
      </div>
      <div class="feels-like">
        <p class="feels-like-value">${data.main.feels_like}°C</p>
        <p class="feels-like-title">Feels like</p>
      </div>
    </div>
    </div>`;

    container.insertAdjacentHTML("beforeend", html);
  } catch (err) {
    const error = `
    <div class="weather-results">
      <div class="error">Ooops .. Location not found.</div>
    </div>
    
    `;
    container.insertAdjacentHTML("beforeend", error);
  }
};

getCityWeatherData();
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getCityWeatherData(inputValue.value);
  }
});
