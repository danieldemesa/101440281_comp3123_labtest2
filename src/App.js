import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("Jamaica");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "0e7b1d83cf17ce9f1db97996bb9d77bd";

  // map weather conditions to icons
  const weatherIcons = {
    rain: "/rainy.png",
    snow: "/snowy.png",
    clear: "/sunny.png",
    clouds: "/cloudy.png",
  };

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // function to get the appropriate weather icon
  const getWeatherIcon = (condition) => {
    if (condition.includes("rain")) return weatherIcons.rain;
    if (condition.includes("snow")) return weatherIcons.snow;
    if (condition.includes("clear")) return weatherIcons.clear;
    if (condition.includes("cloud")) return weatherIcons.clouds;
    return null; 
  };

  return (

    //I had to add the wallapaper within .js as i was getting wallpaper errors within css...
    <div
      className="App"
      style={{
        backgroundImage: `url("/wallpaper.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="weather-container">
        <header className="weather-header">
          <h1>Weather Forecast</h1>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="city-input"
          />
          <button onClick={fetchWeather} className="search-button">
            Search
          </button>
        </header>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <p>{new Date().toLocaleDateString()}</p>
            <p className="temperature">{weather.main.temp} °C</p>
            <p>{weather.weather[0].description}</p>
            {/* display the weather icon */}
            {getWeatherIcon(weather.weather[0].description) && (
              <img
                src={getWeatherIcon(weather.weather[0].description)}
                alt="Weather Icon"
                className="weather-icon"
              />
            )}
            <div className="weather-details">
              <div className="weather-detail-box">
                Humidity: {weather.main.humidity}%
              </div>
              <div className="weather-detail-box">
                Visibility: {weather.visibility / 1000} km
              </div>
              <div className="weather-detail-box">
                Sunrise:{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </div>
              <div className="weather-detail-box">
                Sunset:{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
