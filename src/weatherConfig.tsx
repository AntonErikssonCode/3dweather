/* const weatherConfig = {
  "1": {
    name: "Clear sky",
    dayColor: "#6494ED",
    nightColor: "#2C679B",
    cloudColor: "#FFFFFF",
    cloudy: false,
    cloudIntensity: 0,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
    ,groundColor: "#00bb00", // Green
    
  },
  "2": {
    name: "Nearly clear sky",
    dayColor: "#82B5FF",
    nightColor: "#416A99",
    cloudColor: "#FFFFFF",
    cloudy: false,
    cloudIntensity: 0.2,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false ,groundColor: "#00bb00", // Green
  },
  "3": {
    name: "Variable cloudiness",
    dayColor: "#A4CCEB",
    nightColor: "#5E91B9",
    cloudColor: "#FFFFFF",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
    ,groundColor: "#00bb00", // Green
  },
  "4": {
    name: "Halfclear sky",
    dayColor: "#96B5D8",
    nightColor: "#537A9B",
    cloudColor:"#FFFFFF",
    cloudy: false,
    cloudIntensity: 0.3,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
    ,groundColor: "#00bb00", // Green
  },
  "5": {
    name: "Cloudy sky",
    dayColor: "#88A4B7",
    nightColor: "#465D72",
    cloudColor: "#FFFFFF",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false
    ,groundColor: "#00bb00", // Green
  },
  "6": {
    name: "Overcast",
    dayColor: "#9CA6B0",
    nightColor: "#4C5259",
    cloudColor:"#EEEEEE",
    cloudy: true,
    cloudIntensity: 1,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "7": {
    name: "Fog",
    dayColor: "#8C8F93",
    nightColor: "#45484B",
    cloudColor: "#EEEEEE",
    cloudy: false,
    cloudIntensity: 0,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: true
    ,groundColor: "#00bb00", // Green
  },
  "8": {
    name: "Light rain showers",
    dayColor: "#8CAFC6",
    nightColor: "#3D5F7C",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: true,
    rainIntensity: 0.2,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "9": {
    name: "Moderate rain showers",
    dayColor: "#8CAFC6",
    nightColor: "#3D5F7C",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "10": {
    name: "Heavy rain showers",
    dayColor: "#8CAFC6",
    nightColor: "#3D5F7C",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "11": {
    name: "Thunderstorm",
    dayColor: "#70789B",
    nightColor: "#353B50",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: false,
    snowIntensity: 0,
    thunder: true,
    fog: false,
    groundColor: "#006400",
  },
  "12": {
    name: "Light sleet showers",
    dayColor: "#96B5D8",
    nightColor: "#537A9B",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: true,
    rainIntensity: 0.2,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "13": {
    name: "Moderate sleet showers",
    dayColor: "#96B5D8",
    nightColor: "#537A9B",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: true,
    rainIntensity: 0.5,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "14": {
    name: "Heavy sleet showers",
    dayColor: "#96B5D8",
    nightColor: "#537A9B",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: true,
    snowIntensity: 1,
    thunder: false,
    fog: false    ,groundColor: "#ffffff", // white
  },
  "15": {
    name: "Light snow showers",
    dayColor: "#FFFFFF",
    nightColor: "#D3D3D3",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "16": {
    name: "Moderate snow showers",
    dayColor: "#FFFFFF",
    nightColor: "#D3D3D3",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false    ,groundColor: "#ffffff", // white
  },
  "17": {
    name: "Heavy snow showers",
    dayColor: "#FFFFFF",
    nightColor: "#D3D3D3",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 1,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 1,
    thunder: false,
    fog: false    ,groundColor: "#ffffff", // white
  },
  "18": {
    name: "Light rain",
    dayColor: "#8CAFC6",
    nightColor: "#3D5F7C",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: true,
    rainIntensity: 0.2,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "19": {
    name: "Moderate rain",
    dayColor: "#8CAFC6",
    nightColor: "#3D5F7C",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "20": {
    name: "Heavy rain",
    dayColor: "#8CAFC6",
    nightColor: "#3D5F7C",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "21": {
    name: "Thunder",
    dayColor: "#70789B",
    nightColor: "#353B50",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: false,
    snowIntensity: 0,
    thunder: true,
    fog: false,
    groundColor: "#006400",
  },
  "22": {
    name: "Light sleet",
    dayColor: "#96B5D8",
    nightColor: "#537A9B",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: true,
    rainIntensity: 0.2,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "23": {
    name: "Moderate sleet",
    dayColor: "#96B5D8",
    nightColor: "#537A9B",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: true,
    rainIntensity: 0.5,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  "24": {
    name: "Heavy sleet",
    dayColor: "#96B5D8",
    nightColor: "#537A9B",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: true,
    snowIntensity: 1,
    thunder: false,
    fog: false    ,groundColor: "#ffffff", // white
  },
  "25": {
    name: "Light snowfall",
    dayColor: "#FFFFFF",
    nightColor: "#D3D3D3",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false    ,groundColor: "#ffffff", // white
  },
  "26": {
    name: "Moderate snowfall",
    dayColor: "#FFFFFF",
    nightColor: "#D3D3D3",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false
    ,groundColor: "#ffffff", // white
  },
  "27": {
    name: "Heavy snowfall",
    dayColor: "#FFFFFF",
    nightColor: "#D3D3D3",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 1,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 1,
    thunder: false,
    fog: false
    ,groundColor: "#ffffff", // white
  }
};
export default weatherConfig; */
const weatherConfig = [
  {
    name: "Clear sky",
    dayColor: "#6494ED",
    nightColor: "#18375F",
    cloudColor: "#FFFFFF",
    cloudy: false,
    cloudIntensity: 0,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#007700", // Green
  },
  {
    name: "Nearly clear sky",
    dayColor: "#82B5FF",
    nightColor: "#1D3C62",
    cloudColor: "#FFFFFF",
    cloudy: false,
    cloudIntensity: 0.2,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#007700", // Green
  },
  {
    name: "Variable cloudiness",
    dayColor: "#A4CCEB",
    nightColor: "#2C4B67",
    cloudColor: "#FFFFFF",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#007700", // Green
  },
  {
    name: "Halfclear sky",
    dayColor: "#96B5D8",
    nightColor: "#263B4E",
    cloudColor: "#FFFFFF",
    cloudy: false,
    cloudIntensity: 0.3,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#007700", // Green
  },
  {
    name: "Cloudy sky",
    dayColor: "#88A4B7",
    nightColor: "#1D2D3A",
    cloudColor: "#FFFFFF",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#007700", // Green
  },
  {
    name: "Overcast",
    dayColor: "#9CA6B0",
    nightColor: "#353B43",
    cloudColor: "#999999",
    cloudy: true,
    cloudIntensity: 1,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006600",
  },
  {
    name: "Fog",
    dayColor: "#8C8F93",
    nightColor: "#2E3134",
    cloudColor: "#EEEEEE",
    cloudy: false,
    cloudIntensity: 0,
    rain: false,
    rainIntensity: 0,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: true,
    groundColor: "#004400", // Green
  },
  {
    name: "Light rain showers",
    dayColor: "#8CAFC6",
    nightColor: "#2A4259",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: true,
    rainIntensity: 0.2,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#004400", // Green
  },
  {
    name: "Moderate rain showers",
    dayColor: "#7C9AB1",
    nightColor: "#203140",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#004400", // Green
  },
  {
    name: "Heavy rain showers",
    dayColor: "#6489A6",
    nightColor: "#183036",
    cloudColor: "#888888",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 0.8,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#004400", // Green
  },
  {
    name: "Thunderstorm",
    dayColor: "#4D7A96",
    nightColor: "#12212B",
    cloudColor: "#888888",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: false,
    snowIntensity: 0,
    thunder: true,
    fog: false,
    groundColor: "#003300", // Green
  },
  {
    name: "Light sleet showers",
    dayColor: "#A0BFD2",
    nightColor: "#2D4252",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: true,
    rainIntensity: 0.2,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false,
    groundColor: "#004400", // Green
  },
  {
    name: "Moderate sleet showers",
    dayColor: "#92AAC3",
    nightColor: "#233240",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false,
    groundColor: "#004400", // Green
  },
  {
    name: "Heavy sleet showers",
    dayColor: "#82A0AD",
    nightColor: "#1D2D37",
    cloudColor: "#888888",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 0.8,
    snow: true,
    snowIntensity: 0.8,
    thunder: false,
    fog: false,
    groundColor: "#004400", // Green
  },
  {
    name: "Light snow showers",
    dayColor: "#D3E1F0",
    nightColor: "#46546C",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 0.6,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false,
    groundColor: "#004400", // Green
  },
  {
    name: "Moderate snow showers",
    dayColor: "#C1D6E6",
    nightColor: "#3C4E60",
    cloudColor: "#AAAAAA",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false,
    groundColor: "#ffffff", // Green
  },
  {
    name: "Heavy snow showers",
    dayColor: "#B0CBE1",
    nightColor: "#354551",
    cloudColor: "#888888",
    cloudy: true,
    cloudIntensity: 1,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.8,
    thunder: false,
    fog: false,
    groundColor: "#ffffff", // Green
  },
  {
    name: "Light rain",
    dayColor: "#D3E1F0",
    nightColor: "#46546C",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: true,
    rainIntensity: 0.2,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
   {
    name: "Moderate rain",
    dayColor: "#7C9AB1",
    nightColor: "#203140",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.8,
    rain: true,
    rainIntensity: 0.5,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
{
    name: "Heavy rain",
    dayColor: "#8CAFC6",
    nightColor: "#183036",
    cloudColor: "#888888",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: false,
    snowIntensity: 0,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
  {
    name: "Thunder",
    dayColor: "#4D7A96",
    nightColor: "#12212B",
    cloudColor: "#888888",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: false,
    snowIntensity: 0,
    thunder: true,
    fog: false,
    groundColor: "#003300",
  },
 {
    name: "Light sleet",
    dayColor: "#D3E1F0",
    nightColor: "#46546C",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: true,
    rainIntensity: 0.2,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false,
    groundColor: "#006400",
  },
 {
    name: "Moderate sleet",
    dayColor: "#7C9AB1",
    nightColor: "#203140",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: true,
    rainIntensity: 0.5,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false,
    groundColor: "#ffffff",
  },
 {
    name: "Heavy sleet",
    dayColor: "#8CAFC6",
    nightColor: "#183036",
    cloudColor: "#888888",
    cloudy: true,
    cloudIntensity: 1,
    rain: true,
    rainIntensity: 1,
    snow: true,
    snowIntensity: 1,
    thunder: false,
    fog: false    ,groundColor: "#ffffff", // white
  },
 {
    name: "Light snowfall",
    dayColor: "#D3E1F0",
    nightColor: "#46546C",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.5,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.2,
    thunder: false,
    fog: false    ,groundColor: "#ffffff", // white
  },
 {
    name: "Moderate snowfall",
    dayColor: "#7C9AB1",
    nightColor: "#203140",
    cloudColor: "#EEEEEE",
    cloudy: true,
    cloudIntensity: 0.7,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 0.5,
    thunder: false,
    fog: false
    ,groundColor: "#ffffff", // white
  },
{
    name: "Heavy snowfall",
    dayColor: "#8CAFC6",
    nightColor: "#183036",
    cloudColor: "#888888",
    cloudy: true,
    cloudIntensity: 1,
    rain: false,
    rainIntensity: 0,
    snow: true,
    snowIntensity: 1,
    thunder: false,
    fog: false
    ,groundColor: "#ffffff", // white
  }
 
];

export default weatherConfig;