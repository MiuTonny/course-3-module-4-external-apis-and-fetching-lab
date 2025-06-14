// index.js

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
// - Use fetch() to retrieve data from the OpenWeather API
// - Handle the API response and parse the JSON
// - Log the data to the console for testing

// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
// - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
// - Ensure the function can handle the data format provided by the API

// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
// - Retrieve the value from the input field
// - Call `fetchWeatherData(city)` with the user-provided city name

// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page

// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named

// BONUS: Loading Indicator
// - Optionally, add a loading spinner or text while the API request is in progress

// BONUS: Additional Features
// - Explore adding more features, such as displaying additional weather details (e.g., wind speed, sunrise/sunset)
// - Handle edge cases, such as empty input or API rate limits

// Event Listener for Fetch Button
// - Attach the main event listener to the button to start the process

const { fetchWeatherData } = require("./weather");

document.getElementById("fetch-weather").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  fetchWeatherData(city);
});

