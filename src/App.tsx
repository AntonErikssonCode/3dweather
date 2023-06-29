import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import CanvasMain from "./components/CanvasMain";
import { setInterval } from "timers/promises";


function App() {
  console.dir("run")
  const [weatherEndpoint, setWeatherEndpoint] = useState(
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json"
  ); // SMHI NORRKÖPING
  const [sunEndpoint, setSunEndpoint] = useState(
    "https://api.sunrise-sunset.org/json?lat=58.5812&lng=16.158/&date=today"
  ); // SMHI NORRKÖPING

  const [weatherData, setWeatherData] = useState({
    temp: 1,
    windDirection: 1,
    symbol: 1,
  });
  const [sunData, setSunData] = useState<any>({});
  const [pos, setPos] = useState({ longitude: "0", latitude: "0" });
  const weatherSymbols = {
    1: "Clear sky",
    2: "Nearly clear sky",
    3: "Variable cloudiness",
    4: "Halfclear sky",
    5: "Cloudy sky",
    6: "Overcast",
    7: "Fog",
    8: "Light rain showers",
    9: "Moderate rain showers",
    10: "Heavy rain showers",
    11: "Thunderstorm",
    12: "Light sleet showers",
    13: "Moderate sleet showers",
    14: "Heavy sleet showers",
    15: "Light snow showers",
    16: "Moderate snow showers",
    17: "Heavy snow showers",
    18: "Light rain",
    19: "Moderate rain",
    20: "Heavy rain",
    21: "Thunder",
    22: "Light sleet",
    23: "Moderate sleet",
    24: "Heavy sleet",
    25: "Light snowfall",
    26: "Moderate snowfall",
    27: "Heavy snowfall",
  };

    useEffect(() => {
    setWeatherEndpoint(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${pos.longitude}/lat/${pos.latitude}/data.json`
    );
    setSunEndpoint(
      `https://api.sunrisesunset.io/json?lat=${pos.latitude}&lng=${pos.longitude}&date=today`
    );
    console.dir(pos)

  }, [pos]);

  // Get inital position
  useEffect(() => {
    updateStates();
    // Run the updateStates function once every minute
    const interval = window.setInterval(() => {
      updateStates();
    }, 60000);

    // Clear the interval when the component is unmounted or the dependencies change
    return () => clearInterval(interval);
  }, []);
  
  function updateStates(){
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toString().slice(0, -1);
          const longitude = position.coords.longitude.toString().slice(0, -1);
          
          const newWeatherEndpoint = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
          const newSunEnpoint = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today`;

          fetchWeatherData(newWeatherEndpoint);
          fetchSunInfo(newSunEnpoint);

          setPos({ longitude: longitude, latitude: latitude });
          setWeatherEndpoint(newWeatherEndpoint);
          setSunEndpoint(newSunEnpoint);
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
  }

 /*  useEffect(() => {
    console.dir(" ")


    console.log(weatherData);
  }, [weatherData]);
 */
  function getCurrentTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Stockholm",
    };

    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const [
      { value: day },
      ,
      { value: month },
      ,
      { value: year },
      ,
      { value: hours },
      ,
      { value: minutes },
      ,
      { value: seconds },
    ] = formatter.formatToParts(now);

    const newString = `${year}-${month}-${day}T${hours}:00:00Z`;
    return newString;
  }

  const fetchWeatherData = async (weatherEndpoint: string) => {
    try {
      const response = await fetch(weatherEndpoint);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();

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

      setWeatherData({
        temp: temp.values[0],
        windDirection: windDirection.values[0],
        symbol: symbol.values[0],
      });
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const fetchSunInfo = async (sunEndpoint: string) => {
    try {
      const response = await fetch(sunEndpoint);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();

      console.dir(data.results);
      setSunData(data.results);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <CanvasMain sunData={sunData} weatherData={weatherData}/>
  </div>
  );
}

export default App;
