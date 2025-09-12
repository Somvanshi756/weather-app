// Switch from Home to Weather Screen
document.getElementById("getStartBtn").addEventListener("click", () => {
  document.getElementById("homeScreen").classList.add("hidden");
  document.getElementById("weatherScreen").classList.remove("hidden");
});

// Fetch weather data
async function getWeather(city) {
  try {
    let geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    let geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found!");
      return;
    }

    let { latitude, longitude, name, country } = geoData.results[0];

    let weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    let weatherData = await weatherResponse.json();

    let weather = weatherData.current_weather;
    let temperature = weather.temperature;
    let code = weather.weathercode;

    document.getElementById("weatherResult").innerHTML = `
      <h2>${name}, ${country}</h2>
      <p>🌡️ Temperature: ${temperature}°C</p>
      <p>🌤️ Condition Code: ${code}</p>
    `;

    // Change weather screen background
    let bgImage = getBackgroundImage(code);
    const screen = document.getElementById("weatherScreen");
    screen.style.backgroundImage = `url('${bgImage}')`;

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Background based on weather
function getBackgroundImage(code) {
  if (code === 0) return "images/storm.jpg";
  if ([1, 2, 3].includes(code)) return "images/cloudy.jpg";
  if ([45, 48].includes(code)) return "images/fog.jpg";
  if ([51, 53, 55, 56, 57].includes(code)) return "images/rainy.jpg";
  if ([61, 63, 65, 66, 67].includes(code)) return "images/  OIP2.png";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "images/snow.jpg";
  if ([95, 96, 99].includes(code)) return "images/storm.jpg";
  return "images/sunny.jpg"; 
}

// Event listener for search
document.getElementById("searchBtn").addEventListener("click", () => {
  let city = document.getElementById("cityInput").value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});
