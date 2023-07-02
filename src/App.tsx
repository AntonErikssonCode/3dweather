import React, { useEffect, useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import CanvasMain from "./components/CanvasMain";
import { setInterval } from "timers/promises";
import weatherConfig from "./weatherConfig";
import SelectWeather from "./components/SelectWeather";

function App() {
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
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [selectedWeather, setSelectedWeather] = useState<any>(27);
  const [expanded, setExpanded] = useState(false);

 
  const handleClick = useCallback(() => {
    setExpanded(true);
  }, []);

  const handleClose = () => {
    setExpanded(false);
  };
  function handleSelectWeather(weatherIndex:number){
    setSelectedWeather(weatherIndex)
  }

  useEffect(() => {
    setWeatherEndpoint(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${pos.longitude}/lat/${pos.latitude}/data.json`
    );
    setSunEndpoint(
      `https://api.sunrisesunset.io/json?lat=${pos.latitude}&lng=${pos.longitude}&date=today`
    );
  }, [pos]);

  // Get inital position
  useEffect(() => {
    updateStates();
    // Run the updateStates function once every minute
    const interval = window.setInterval(() => {
      updateStates();
    }, 60000 * 5 );

    // Clear the interval when the component is unmounted or the dependencies change
    return () => clearInterval(interval);
  }, []);

  function updateStates() {
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
          window.alert("You must allow geolocation for this app to work :/");
        }
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by this browser");
    }
  }


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
    setCurrentHour(parseInt(hours));
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
        temp: parseInt(temp.values[0]),
        windDirection: parseInt(windDirection.values[0]),
        symbol: (symbol.values[0]),
      });
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  function convertToRealTime(text: string): number | null {
    const splitArray = text.split(":");
    let timeValue;
    if (splitArray.length > 0) {
      timeValue = parseInt(splitArray[0]);
      if (text.includes("PM")) {
        timeValue = 12 + timeValue;
      }
      return timeValue;
    }
    return null;
  }

  const fetchSunInfo = async (sunEndpoint: string) => {
    try {
      const response = await fetch(sunEndpoint);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();

      const dawn = convertToRealTime(data.results.dawn);
      const sunrise = convertToRealTime(data.results.sunrise);
      const dayLength = convertToRealTime(data.results.day_length);
      const sunset = convertToRealTime(data.results.sunset);
      const dusk = convertToRealTime(data.results.dusk);

  
      setSunData({
        dawn: dawn,
        sunrise: sunrise,
        dayLength: dayLength,
        sunset: sunset,
        dusk: dusk,
        nightLength: dayLength !== null ? 24 - dayLength : null,
      });
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };






console.dir(weatherData)


  return (
    <div style={{ width: "100vw", height: "100vh", overflow:"hidden" }}>
      <div className="info-container">
      <div className="temp-container">
        
      <h2>{weatherData.temp+1}&deg;C</h2>
      </div>
      <SelectWeather  weatherData={weatherData}handleSelectWeather={handleSelectWeather} selectedWeather={selectedWeather} handleClick={handleClick} expanded={expanded}/>
      </div>

      
       <CanvasMain handleClose={handleClose}  sunData={sunData} weatherData={weatherData} currentHour={currentHour} selectedWeather={selectedWeather}/>
   
   
    </div>
  );
}

export default App;
