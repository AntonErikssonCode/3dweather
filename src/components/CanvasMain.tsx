import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { OrbitControls, Plane, Shadow, useHelper } from "@react-three/drei";
import { PerspectiveCamera, Euler, Vector3 } from "three";
import weatherConfig from "../weatherConfig";
import * as THREE from "three"; // Add this import statement
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import { wait } from "@testing-library/user-event/dist/utils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
/* import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
 */ /* import { OBJLoader as LoadersGLOBJLoader } from '@loaders.gl/obj';
 import { Loader } from '@loaders.gl/core'; */
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Mesh } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Console } from "console";

interface Props {
  sunData: any;
  weatherData: any;
  currentHour: number;
  selectedWeather: number;
  handleClose: () => void;
}

interface SpotlightProps {
  sunAndMoon: { type: string; position: number; dayTime: string };
}
const Spotlight: React.FC<SpotlightProps> = ({ sunAndMoon }) => {
  const spotlightGroupRef = useRef<THREE.Group>(null);
  const scale = 12;

  const colors = {
    sunColors: [
      "rgb(255, 0, 0)",
      "rgb(255, 60, 0)",
      "rgb(255, 149, 0)",
      "rgb(255, 234, 0)",
      "rgb(221, 255, 0)",
    ],
    dawn: [
      "rgb(239, 115, 26)", // Light Orange
      "rgb(244, 161, 66)", // Light Orange-Yellow
      "rgb(249, 208, 106)", // Light Yellow
      "rgb(255, 156, 103)", // Light Yellow-Red
      "rgb(255, 51, 51)", // Light Red
    ],
    sunrise: [
      "rgb(255, 0, 0)",
      "rgb(255, 60, 0)",
      "rgb(255, 149, 0)",
      "rgb(255, 234, 0)",
      "rgb(221, 255, 0)",
    ],
    sunset: [
      "rgb(239, 115, 26)", // Light Orange
      "rgb(244, 161, 66)", // Light Orange-Yellow
      "rgb(249, 208, 106)", // Light Yellow
      "rgb(255, 156, 103)", // Light Yellow-Red
      "rgb(255, 51, 51)", // Light Red
    ],
    dusk: [
      "rgb(239, 115, 26)", // Light Orange
      "rgb(244, 161, 66)", // Light Orange-Yellow
      "rgb(249, 208, 106)", // Light Yellow
      "rgb(255, 156, 103)", // Light Yellow-Red
      "rgb(255, 51, 51)", // Light Red
    ],
    moonColors: [
      "rgb(255, 255, 255)",
      "rgb(230, 230, 230)",
      "rgb(200, 200, 200)",
      "rgb(170, 170, 170)",
      "rgb(140, 140, 140)",
    ],
  };

  const [sphereColor, setSphereColor] = useState(colors.sunColors);
  const [lightColor, setLightColor] = useState("rgba(235, 235, 235, 0.554)");
  const [intensity, setIntensity] = useState(0.8);

  const updateSpotlightPosition = (degree: number) => {
    const radius = 20 * scale;

    const posX = Math.cos((degree * Math.PI) / 180) * radius;
    const posY = Math.sin((degree * Math.PI) / 180) * radius;

    if (spotlightGroupRef.current) {
      spotlightGroupRef.current.position.set(posX, posY, 0);
    }
  };

  useEffect(() => {
    updateSpotlightPosition(sunAndMoon.position);
    if (sunAndMoon.type === "sun") {
      setIntensity(0.8);
      setLightColor("rgba(235, 235, 235, 0.554)");
      switch (sunAndMoon.dayTime) {
        case "dawn":
          setSphereColor(colors.dawn);
          setLightColor("#d125f0");
          break;

        case "sunrise":
          setSphereColor(colors.sunColors);
          setLightColor("rgba(235, 235, 235, 0.554)");

          break;

        case "sunset":
          setSphereColor(colors.sunset);
          setLightColor("#ff9500");
          setLightColor("rgba(235, 235, 235, 0.554)");

          break;

        case "dusk":
          setSphereColor(colors.dusk);
          setLightColor("#d125f0");

          break;

        default:
          setSphereColor(colors.dusk);
      }
    } else if (sunAndMoon.type === "moon") {
      setIntensity(0.4);
      setLightColor("rgba(255, 255, 255, 0.542)");
      setSphereColor(colors.moonColors);
    }
  }, [sunAndMoon]);

  return (
    <group ref={spotlightGroupRef}>
      <spotLight
        angle={Math.PI / 3}
        penumbra={0.5}
        castShadow
        position={[0, 0, 0]}
        visible
        intensity={intensity}
        color={lightColor}
      />
      <spotLight
        angle={Math.PI / 3}
        penumbra={0.5}
        castShadow
        position={[0, 60, 0]}
        visible
        intensity={intensity}
        color={lightColor}
      />
      <spotLight
        angle={Math.PI / 3}
        penumbra={0.5}
        castShadow
        position={[0, -60, 0]}
        visible
        intensity={intensity}
        color={lightColor}
      />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1 * scale, 20, 20]} />
        <meshPhysicalMaterial
          color={sphereColor[0]}
          metalness={0.5}
          roughness={0.5}
          emissive={sphereColor[0]}
          emissiveIntensity={1}
          opacity={1}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2 * scale, 20, 20]} />
        <meshPhysicalMaterial
          color={sphereColor[1]}
          metalness={0.5}
          roughness={0.5}
          emissive={sphereColor[1]}
          emissiveIntensity={1}
          opacity={0.7}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3 * scale, 20, 20]} />
        <meshPhysicalMaterial
          color={sphereColor[2]}
          metalness={0.5}
          roughness={0.5}
          emissive={sphereColor[2]}
          emissiveIntensity={1}
          opacity={0.6}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4 * scale, 20, 20]} />
        <meshPhysicalMaterial
          color={sphereColor[3]}
          metalness={0.5}
          roughness={0.5}
          emissive={sphereColor[3]}
          emissiveIntensity={1}
          opacity={0.4}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[5 * scale, 20, 20]} />
        <meshPhysicalMaterial
          color={sphereColor[4]}
          metalness={0.5}
          roughness={0.5}
          emissive={sphereColor[4]}
          emissiveIntensity={1}
          opacity={0.3}
          transparent
        />
      </mesh>
    </group>
  );
};

interface CloudProps {
  weather: any;
  currentWeather: any;
  color: string;
}
interface PrecipitationProps {
  weather: any;
  currentWeather: any;
}
function getRandomInt(min: number, max: number): number {
  // Add 1 to the difference between max and min
  // Multiply it by Math.random()
  // Floor the result to get an integer within the range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomIntNotFloor(min: number, max: number): number {
  // Add 1 to the difference between max and min
  // Multiply it by Math.random()
  // Floor the result to get an integer within the range
  return Math.random() * (max - min) + min;
}

function triangleWave(t: number, period: number) {
  const normalizedTime = t / period;
  const fractionalPart = normalizedTime - Math.floor(normalizedTime);
  return fractionalPart < 0.5
    ? fractionalPart * 4 - 1
    : (1 - fractionalPart) * 4 - 1;
}

interface LightningProps {}

const Lightning: React.FC<LightningProps> = () => {
  const xPos = 0;
  const initialYPos = 0;
  const zPos = 0;
  const meshRef = useRef<THREE.Mesh>(null);
  const yPosition = useRef(initialYPos);
  const delayTime = getRandomInt(0, 7000);
  const speed = 2;
  const rnd = getRandomIntNotFloor(0, 1); //0.3
  const spawnLightning = rnd > 0.97 ? true : false;

  useEffect(() => {
    // Delay the initial update of the precipitation's position
    const delay = delayTime;
    const timer = setTimeout(() => {
      yPosition.current = initialYPos;
    }, delay);

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, []);
  useFrame(() => {
    // Animate the Y position of the precipitation
    yPosition.current -= speed; // Adjust the animation speed as needed

    if (meshRef.current) {
      meshRef.current.position.set(
        5 * triangleWave(yPosition.current / 4, 10),
        yPosition.current,
        zPos
      );
      if (yPosition.current <= -70) {
        // Adjust the threshold as needed
        yPosition.current = initialYPos;
      }
    }
  });
  if (spawnLightning) {
    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 4, 1]} />
        <meshPhysicalMaterial
          color="yellow"
          metalness={0.5}
          roughness={0.5}
          emissive="yellow"
          emissiveIntensity={1}
          opacity={1}
          transparent
        />
      </mesh>
    );
  }
  return null;
};

function Precipitation(props: PrecipitationProps) {
  const xPos = 0;
  const initialYPos = 0;
  const zPos = 0;
  const meshRef = useRef<THREE.Mesh>(null);
  const yPosition = useRef(initialYPos);
  const delayTime = getRandomInt(0, 7000);

  const rainIntensity = props.currentWeather.rainIntensity; //0.8
  const snowIntensity = props.currentWeather.snowIntensity; //0.8
  const total = rainIntensity + snowIntensity; // 1.6
  const rnd = getRandomIntNotFloor(0, total); //0.3
  const precipitationType = rnd <= rainIntensity ? "rain" : "snow";

  const precipitationConfig = {
    rain: {
      speed: 0.6,
      color: "#618cdb",
      opacity: rainIntensity * 2,
      intensity: rainIntensity,
    },
    snow: {
      speed: 0.2,
      color: "white",
      opacity: snowIntensity * 2,
      intensity: snowIntensity,
    },
  };

  const spawnPerciption =
    getRandomIntNotFloor(0, 1) >=
    precipitationConfig[precipitationType].intensity * 0.8
      ? true
      : false;

  useEffect(() => {
    // Delay the initial update of the precipitation's position
    const delay = delayTime;
    const timer = setTimeout(() => {
      yPosition.current = initialYPos;
    }, delay);

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, []);

  useFrame(() => {
    if (spawnPerciption) {
      // Animate the Y position of the precipitation
      yPosition.current -= precipitationConfig[precipitationType].speed; // Adjust the animation speed as needed

      if (meshRef.current) {
        meshRef.current.position.set(xPos, yPosition.current, zPos);
        if (yPosition.current <= -70) {
          // Adjust the threshold as needed
          yPosition.current = initialYPos;
        }
      }
    }
  });

  if (spawnPerciption) {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 5, 5]} />
        <meshPhysicalMaterial
          color={precipitationConfig[precipitationType].color}
          /* metalness={0.5}
          roughness={0.5} */
          emissive={precipitationConfig[precipitationType].color}
          emissiveIntensity={1}
          opacity={precipitationConfig[precipitationType].opacity}
          transparent
        />
      </mesh>
    );
  }
  return null;
}

function Cloud(props: CloudProps) {
  const weather = props.weather;
  const currentWeather = props.currentWeather;

  const cloudColor = currentWeather.cloudColor;
  const cloudScale = getRandomInt(5, 13);
  const xPos = getRandomInt(-10, 10);
  const yPos = getRandomInt(80, 95);
  const zPos = getRandomInt(-10, 10);
  const position = new Vector3(xPos, yPos, zPos);

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[1 * cloudScale, 20, 20]} />
        <meshPhysicalMaterial
          color={cloudColor}
          metalness={0.5}
          roughness={0.5}
          emissive={cloudColor}
          emissiveIntensity={1}
          opacity={1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2 * cloudScale, 20, 20]} />
        <meshPhysicalMaterial
          color={cloudColor}
          metalness={0.5}
          roughness={0.5}
          emissive={cloudColor}
          emissiveIntensity={1}
          opacity={0.5}
          transparent
        />
      </mesh>
      <Precipitation weather={weather} currentWeather={props.currentWeather} />
      {currentWeather.thunder ? <Lightning /> : null}
    </group>
  );
}

function CloudCluster(props: CloudProps) {
  const weather = props.weather;
  const numberOfClouds = getRandomInt(1, 15);
  const xPos = getRandomInt(-100, 100);
  const yPos = getRandomInt(0, 0);
  const zPos = getRandomInt(-100, 100);
  const position = new Vector3(xPos, yPos, zPos);

  const clouds = Array.from({ length: numberOfClouds }, (_, index) => (
    <Cloud
      key={"cloud" + index}
      weather={weather}
      currentWeather={props.currentWeather}
      color={"white"}
    />
  ));
  return <group position={position}>{clouds}</group>;
}
function Fog(props: {}) {
  // Cloud intensity 0.6
  // Cloud true
  const fogColor = "grey";
  const fogScale = getRandomInt(5, 15);
  const xPos = getRandomInt(-80, 80);
  const yPos = getRandomInt(-7.5, 7.5);
  const zPos = getRandomInt(-80, 80);
  const position = new Vector3(xPos, yPos, zPos);

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[2 * fogScale, 20, 20]} />
        <meshPhysicalMaterial
          color={fogColor}
          /*           metalness={0.5}
          roughness={0.5} */
          emissive={fogColor}
          emissiveIntensity={1}
          opacity={0.5}
          transparent
        />
      </mesh>
    </group>
  );
}
function FogCluster(props: {}) {
  const fogScale = getRandomInt(4, 7);

  const numberOfFogs = getRandomInt(30, 70);
  const xPos = getRandomInt(0, 0);
  const yPos = getRandomInt(0, 0);
  const zPos = getRandomInt(0, 0);
  const position = new Vector3(xPos, yPos, zPos);
  const fogColor = "grey";

  const fogs = Array.from({ length: numberOfFogs }, (_, index) => (
    <group position={position} key={"fog" + index}>
      <Fog />
    </group>
  ));
  return <group position={position}>{fogs}</group>;
}
const CatModel: React.FC = () => {
  const materials = useLoader(MTLLoader, "./assets/tree.mtl");
  /*     const obj = useLoader(OBJLoader, './assets/tree.obj');
   */ const obj = useLoader(OBJLoader, "./assets/tree.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  obj.traverse((child: Object) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      /* child.material.color.set('#ff0000'); */
    }
  });
  return <primitive object={obj} scale={1} castShadow />;
};

const CanvasMain: React.FC<Props> = (props: Props) => {
  const sun = props.sunData;

  const weather = props.weatherData;

  const currentHour = props.currentHour;

  let currentWeatherConfig = weatherConfig[props.selectedWeather];
  if (props.selectedWeather == 27) {
    currentWeatherConfig = weatherConfig[weather.symbol];
  } else {
    currentWeatherConfig = weatherConfig[props.selectedWeather];
  }

  const [sunAndMoon, setSunAndMoon] = useState({
    type: "sun",
    position: 0,
    dayTime: "dawn",
  });
  const [day, setDay] = useState(true);
  const [bg, setBg] = useState("white");
  const [cameraFov, setCameraFov] = useState(45); // Initial FOV value
  const [dayTime, setDayTime] = useState("dawn");
  const [skyColor, setSkyColor] = useState("black");

  // Function to handle FOV change
  const handleFovChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFov = Number(event.target.value);
    setCameraFov(newFov);
  };
  const cameraConfig = {
    position: new Vector3(-100, 0, -100), // Set the camera position
    rotation: new Euler(0, 0, 0), // Set the camera rotation
  };

  function updateDayTime() {
    let time = "time";
    if (currentHour >= sun.dawn && currentHour < sun.sunrise + 2) {
      time = "dawn";
      setSkyColor("pink");
      setDayTime("dawn");
      return time;
    }
    if (currentHour >= sun.sunrise && currentHour < sun.sunset - 1) {
      time = "sunrise";
      setDayTime("sunrise");
      setSkyColor(currentWeatherConfig.dayColor);
      return time;
    }
    if (currentHour >= sun.sunset - 1 && currentHour < sun.dusk - 1) {
      time = "sunset";
      setDayTime("sunset");
      setSkyColor(currentWeatherConfig.dayColor);
      return time;
    }
    if (currentHour == sun.dusk - 1) {
      time = "dusk";
      setSkyColor("pink");
      setDayTime("dusk");
      return time;
    } else {
      time = "night";
      setDayTime("night");
      setSkyColor(currentWeatherConfig.nightColor);
      return time;
    }
  }
  useEffect(() => {
    console.dir("render2")
    const sunMoveDegree = 180 / sun.dayLength;
    const moonMoveDegree = 180 / sun.nightLength;
    const sunMoveDegreeTotal = sunMoveDegree * (currentHour - sun.sunrise);
    const moonMoveDegreeTotal = moonMoveDegree * (currentHour - sun.dusk);

    let updateTime = updateDayTime();

    if (currentHour >= sun.dawn && currentHour <= sun.dusk) {
      setSunAndMoon({
        type: "sun",
        position: sunMoveDegreeTotal,
        dayTime: updateTime,
      });
      setDay(true);
    } else {
      setSunAndMoon({
        type: "moon",
        position: moonMoveDegreeTotal,
        dayTime: updateTime,
      });
      setDay(false);
    }
  }, [
    props.currentHour,
    props.sunData,
   
  ]);

  const [totalCloudClusters, setTotalCloudClusters] = useState(0);

  useEffect(() => {
    console.dir("render")
    const numberOfCloudClusters = Math.ceil(
      currentWeatherConfig.cloudIntensity * 20
    );
    setTotalCloudClusters(numberOfCloudClusters);
  }, [props.weatherData, props.selectedWeather]);
  
  

  return (
    <Canvas
      onClick={props.handleClose}
      style={{ background: skyColor }} // Sky Color
      shadows
      shadow-map={2048}
      camera={{
        position: cameraConfig.position,
        rotation: cameraConfig.rotation,
        fov: cameraFov,
      }}
    >
      {currentWeatherConfig.fog ? (
        <>
          <FogCluster />

          <fog attach="fog" args={["rgba(80, 80, 80, 0.3)", 100, 300]} />
        </>
      ) : null}
      <ambientLight intensity={0.2} />
      <Spotlight sunAndMoon={sunAndMoon} />
      <CatModel />
      <mesh position={[0, -400, 1]} receiveShadow>
        <sphereGeometry args={[400, 50, 50]} />
        <meshStandardMaterial
          color={
            currentWeatherConfig.groundColor
            /*   day
              ? weatherConfig[weatherSymbol].dayColor
              : weatherConfig[weatherSymbol].nightColor */
          }
          side={THREE.DoubleSide}
        />
      </mesh>
      {Array.from({ length: totalCloudClusters }, (_, index) => (
      <CloudCluster
        weather={weather}
        currentWeather={currentWeatherConfig}
        color="white"
        key={index}
      />
    ))}
      <Shadow />
      <OrbitControls
        target={new Vector3(0, 50, 0)}
        minDistance={80} // Set the minimum distance the camera can be zoomed out 80
        maxDistance={140} // Set the maximum distance the camera can be zoomed in 140
        minPolarAngle={Math.PI / 2} // Set the minimum polar angle (vertical rotation) in radians
        maxPolarAngle={Math.PI / 1.55} // Set the maximum polar angle (vertical rotation) in radians
      />
    </Canvas>
  );
};

export default CanvasMain;
