const weatherConfig = {
  "1": {
    name: "Clear sky",
    dayColor: "#87CEEB",
    nightColor: "#3C8DC5",
    cloudy: false,
    cloudIntensity: 0,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "2": {
    name: "Nearly clear sky",
    dayColor: "#B0E2FF",
    nightColor: "#5C9BC9",
    cloudy: false,
    cloudIntensity: 0.2,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "3": {
    name: "Variable cloudiness",
    dayColor: "#D3E8FF",
    nightColor: "#6CADC2",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "4": {
    name: "Halfclear sky",
    dayColor: "#C0D9E8",
    nightColor: "#5F90A4",
    cloudy: false,
    cloudIntensity: 0.3,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "5": {
    name: "Cloudy sky",
    dayColor: "#AFC9D6",
    nightColor: "#537B8C",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "6": {
    name: "Overcast",
    dayColor: "#B1B9C0",
    nightColor: "#5B636A",
    cloudy: true,
    cloudIntensity: 1,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "7": {
    name: "Fog",
    dayColor: "#A5A8AC",
    nightColor: "#54585B",
    cloudy: false,
    cloudIntensity: 0,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: true
  },
  "8": {
    name: "Light rain showers",
    dayColor: "#A9C6DB",
    nightColor: "#516A83",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: true,
    rainIntensity: 0.2,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "9": {
    name: "Moderate rain showers",
    dayColor: "#8FAFC7",
    nightColor: "#405568",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "10": {
    name: "Heavy rain showers",
    dayColor: "#7494B0",
    nightColor: "#314051",
    cloudy: true,
    cloudIntensity: 0.9,
    rain: true,
    rainIntensity: 0.8,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "11": {
    name: "Thunderstorm",
    dayColor: "#656873",
    nightColor: "#2D3137",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: false,
    snowIntensity: 0,
    thunder: true,
    fog: false
  },
  "12": {
    name: "Light sleet showers",
    dayColor: "#A2B8C8",
    nightColor: "#4D6579",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: true,
    rainIntensity: 0.2,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false
  },
  "13": {
    name: "Moderate sleet showers",
    dayColor: "#8CA2B3",
    nightColor: "#3E4D58",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false
  },
  "14": {
    name: "Heavy sleet showers",
    dayColor: "#768798",
    nightColor: "#364356",
    cloudy: true,
    cloudIntensity: 0.9,
    rain: true,
    rainIntensity: 0.8,
    snow: true,
    snowIntensity: 0.8,
    thunder: false,
    fog: false
  },
  "15": {
    name: "Light snow showers",
    dayColor: "#D9E6F1",
    nightColor: "#6B87A3",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false
  },
  "16": {
    name: "Moderate snow showers",
    dayColor: "#BFD1E2",
    nightColor: "#617B95",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false
  },
  "17": {
    name: "Heavy snow showers",
    dayColor: "#A6BBCD",
    nightColor: "#546A7D",
    cloudy: true,
    cloudIntensity: 0.9,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.8,
    thunder: false,
    fog: false
  },
  "18": {
    name: "Light rain",
    dayColor: "#A9C6DB",
    nightColor: "#516A83",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: true,
    rainIntensity: 0.2,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "19": {
    name: "Moderate rain",
    dayColor: "#8FAFC7",
    nightColor: "#405568",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "20": {
    name: "Heavy rain",
    dayColor: "#7494B0",
    nightColor: "#314051",
    cloudy: true,
    cloudIntensity: 0.9,
    rain: true,
    rainIntensity: 0.8,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
  },
  "21": {
    name: "Thunder",
    dayColor: "#656873",
    nightColor: "#2D3137",
    cloudy: true,
    cloudIntensity: 1,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: true,
    fog: false
  },
  "22": {
    name: "Light sleet",
    dayColor: "#A2B8C8",
    nightColor: "#4D6579",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: true,
    rainIntensity: 0.2,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false
  },
  "23": {
    name: "Moderate sleet",
    dayColor: "#8CA2B3",
    nightColor: "#3E4D58",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false
  },
  "24": {
    name: "Heavy sleet",
    dayColor: "#768798",
    nightColor: "#364356",
    cloudy: true,
    cloudIntensity: 0.9,
    rain: true,
    rainIntensity: 0.8,
    snow: true,
    snowIntensity: 0.8,
    thunder: false,
    fog: false
  },
  "25": {
    name: "Light snowfall",
    dayColor: "#D9E6F1",
    nightColor: "#6B87A3",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false
  },
  "26": {
    name: "Moderate snowfall",
    dayColor: "#BFD1E2",
    nightColor: "#617B95",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false
  },
  "27": {
    name: "Heavy snowfall",
    dayColor: "#A6BBCD",
    nightColor: "#546A7D",
    cloudy: true,
    cloudIntensity: 0.9,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.8,
    thunder: false,
    fog: false
  }
};

export default weatherConfig;