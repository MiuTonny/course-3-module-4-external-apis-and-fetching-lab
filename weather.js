async function fetchWeatherData(city) {
    displayError("");//clear previous error.
    //city name to lat and Long
    try {
        const { latitude, longitude } = await getCoordinates(city);
        const weatherData = await getWeather(latitude, longitude);
        displayWeather(weatherData);
    } catch (error) {
        displayError(error.message);
        throw error;
    }
}

async function fetchJson(url) { //reusable function 
    const response = await fetch(url); 
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
}

// get lat and long

async function getCoordinates(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    const geoData = await fetchJson(geoUrl);

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found.");
    }

    return geoData.results[0];//array with lat and long
}

async function  getWeather(lat, lon) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    return fetchJson(weatherUrl);
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5 + 32).toFixed(1); // Convert from C to F
}

function displayWeather(data) {
  const weather = data.current_weather;

  if (!weather) {
    document.getElementById("weather-display").innerHTML = "<p>No weather data found.</p>";
    return;
  }

  const html = `
    <h2>Current Weather</h2>
    <p><strong>Temperature:</strong> ${celsiusToFahrenheit(weather.temperature)} °F</p>
    <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
    <p><strong>Wind Direction:</strong> ${weather.winddirection}°</p>
    <p><strong>Time:</strong> ${new Date(weather.time).toLocaleString()}</p>
  `;

  document.getElementById("weather-display").innerHTML = html;
}

function displayError(message) {
    const errorDiv = document.getElementById("error-message");
    
    if (message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove("hidden");
    } else {
        errorDiv.textContent = "";
        errorDiv.classList.add("hidden");
    }
}

module.exports = {
  fetchJson,
  getCoordinates,
  getWeather,
  displayWeather,
  displayError,
  fetchWeatherData,
};