import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [endpoint, setEndpoint] = useState(
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json"
  ); // SMHI NORRKÖPING

  const [weatherData, setWeatherData] = useState({});
  const [pos, setPos] = useState({ longitude: 0, latitude: 0 });

  useEffect(() => {
    setEndpoint(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${pos.longitude}/lat/${pos.latitude}/data.json`
    );
  }, [pos]);

  // Get inital position
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setPos({ longitude: longitude, latitude: latitude });

          // Do something with the latitude and longitude values
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
        },
        (error) => {
          // Handle geolocation error
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  useEffect(() => {
    console.log(weatherData)

  }, [weatherData]);

  function getCurrentTime() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:00:00Z`;
  }

  useEffect(() => {
    console.dir(endpoint);
    const apiUrl = fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        // Process and use the data as needed
        const currentTime = getCurrentTime();
        const currentWeather = data.timeSeries.find(
          (obj: any) => obj.validTime === currentTime
        );

        // t = Degree
        // wd = Wind Direction
        // code = Weather Symbol
        const temp = currentWeather.parameters.find(
          (obj: any) => obj.name === "t"
        );
        const windDirection = currentWeather.parameters.find(
          (obj: any) => obj.name === "wd"
        );
        const symbol = currentWeather.parameters.find(
          (obj: any) => obj.name === "Wsymb2"
        );

        console.log(temp, windDirection);

        setWeatherData({
          temp: temp.values[0],
          windDirection: windDirection.values[0],
          symbol: symbol.values[0],
        });

        console.log(currentWeather.parameters);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [endpoint]);

  return (
    <div className="App">
      <p>dasd</p>
    </div>
  );
}

export default App;
