import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { OrbitControls, Plane, Shadow, useHelper } from "@react-three/drei";
import { PerspectiveCamera, Euler, Vector3 } from "three";
import weatherConfig from "../weatherConfig";
import * as THREE from "three"; // Add this import statement
import { wait } from "@testing-library/user-event/dist/utils";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
/* import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
 *//* import { OBJLoader as LoadersGLOBJLoader } from '@loaders.gl/obj';
 import { Loader } from '@loaders.gl/core'; */
 import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
 import { Mesh } from 'three';

interface Props {
  sunData: any;
  weatherData: any;
  currentHour: number;
}

interface SpotlightProps {
  sunAndMoon: { type: string; position: number };
}
const Spotlight: React.FC<SpotlightProps> = ({ sunAndMoon }) => {
  const spotlightGroupRef = useRef<THREE.Group>(null);
  const scale = 7;
  const colors = {
    sunColors: [
      "rgb(255, 0, 0)",
      "rgb(255, 60, 0)",
      "rgb(255, 149, 0)",
      "rgb(255, 234, 0)",
      "rgb(221, 255, 0)",
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
      setLightColor("rgba(235, 235, 235, 0.554)");
      setSphereColor(colors.sunColors);
    } else if (sunAndMoon.type === "moon") {
      setLightColor("rgba(255, 255, 255, 0.842)");
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
        intensity={0.8}
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

function triangleWave(t:number, period:number) {
  const normalizedTime = t / period;
  const fractionalPart = normalizedTime - Math.floor(normalizedTime);
  return fractionalPart < 0.5 ? fractionalPart * 4 - 1 : (1 - fractionalPart) * 4 - 1;
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
  const spawnLightning = rnd > 0.99? true : false;

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
      meshRef.current.position.set(5* triangleWave(yPosition.current/4, 10), yPosition.current, zPos);
      if (yPosition.current <= -70) {
        // Adjust the threshold as needed
        yPosition.current = initialYPos;
      }
    }
  });
  if(spawnLightning){
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[2,10,10]} />
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
    getRandomIntNotFloor(0, 1) <=
    precipitationConfig[precipitationType].intensity
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
    // Animate the Y position of the precipitation
    yPosition.current -= precipitationConfig[precipitationType].speed; // Adjust the animation speed as needed

    if (meshRef.current) {
      meshRef.current.position.set(xPos, yPosition.current, zPos);
      if (yPosition.current <= -70) {
        // Adjust the threshold as needed
        yPosition.current = initialYPos;
      }
    }
  });
  if (spawnPerciption) {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 5, 5]} />
        <meshPhysicalMaterial
          color={precipitationConfig[precipitationType].color}
          metalness={0.5}
          roughness={0.5}
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
  const cloudScale = getRandomInt(4, 7);
  const xPos = getRandomInt(-10, 10);
  const yPos = getRandomInt(50, 75);
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
      {currentWeather.thunder?<Lightning/>: null}
    </group>
  );
}




function CloudCluster(props: CloudProps) {
  const weather = props.weather;
  const numberOfClouds = getRandomInt(1, 25);
  const xPos = getRandomInt(-80, 80);
  const yPos = getRandomInt(0, 0);
  const zPos = getRandomInt(-80, 80);
  const position = new Vector3(xPos, yPos, zPos);

  const clouds = Array.from({ length: numberOfClouds }, (_, index) => (
    <Cloud
      key={index}
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
  const yPos = getRandomInt(-7.5, 7.5   );
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
    <group position={position}>
     <Fog/>
    </group>
  ));
  return (
    <group position={position}>
     {fogs}
    </group>
  );
}

const CanvasMain: React.FC<Props> = (props: Props) => {
  const sun = props.sunData;
  const weather = props.weatherData;
  const currentHour = props.currentHour-5;
  /*   console.dir(sun);
  console.dir(weather);
  console.dir(currentHour); */
      const weatherSymbol = weather.symbol as keyof typeof weatherConfig;
    const currentWeatherConfig = weatherConfig[weatherSymbol];

/*   const currentWeatherConfig = weatherConfig["11"];
 */
  console.dir(currentWeatherConfig);
  const [sunAndMoon, setSunAndMoon] = useState({ type: "sun", position: 0 });
  const [day, setDay] = useState(true);
  const [bg, setBg] = useState("white");
  const [cameraFov, setCameraFov] = useState(45); // Initial FOV value

  // Function to handle FOV change
  const handleFovChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFov = Number(event.target.value);
    setCameraFov(newFov);
  };
  const cameraConfig = {
    position: new Vector3(-100, 0, -100), // Set the camera position
    rotation: new Euler(0, 0, 0), // Set the camera rotation
  };

  useEffect(() => {
    const sunMoveDegree = 180 / sun.dayLength;
    const moonMoveDegree = 180 / sun.nightLength;
    const sunMoveDegreeTotal = sunMoveDegree * (currentHour - sun.sunrise);
    const moonMoveDegreeTotal = moonMoveDegree * (currentHour - sun.dusk);

    if (currentHour >= sun.sunrise && currentHour <= sun.dusk) {
      setSunAndMoon({ type: "sun", position: sunMoveDegreeTotal });
      setDay(true);
    } else {
      setSunAndMoon({ type: "moon", position: moonMoveDegreeTotal });
      setDay(false);
    }
  }, [currentHour, sun, weather]);

  const numberOfCloudCLusters = Math.ceil(
    currentWeatherConfig.cloudIntensity * 20
  );
  console.dir(numberOfCloudCLusters);
  const totalCloudClusters = Array.from(
    { length: numberOfCloudCLusters },
    (_, index) => (
      <CloudCluster
        weather={weather}
        currentWeather={currentWeatherConfig}
        color="white"
      />
    )
  );

  const CatModel: React.FC = () => {
    const obj = useLoader(OBJLoader, './assets/cat.obj');
  
    obj.traverse((child: Object) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return <primitive object={obj} scale={0.4} castShadow />;
  };


  return (
    <Canvas
      style={
        day
          ? { background: currentWeatherConfig.dayColor }
          : { background: currentWeatherConfig.nightColor }
      } // Sky Color
      shadows
      shadow-map={2048}
      camera={{
        position: cameraConfig.position,
        rotation: cameraConfig.rotation,
        fov: cameraFov,
      }}
    >
      
           {currentWeatherConfig.fog ? (
        <><FogCluster />
          
          <fog attach="fog" args={["rgba(80, 80, 80, 0.3)", 100, 300]} />
        </>
      ) : null}
      <ambientLight intensity={0.2} />
      <Spotlight sunAndMoon={sunAndMoon} />
     {/*  <mesh castShadow position={[1, 10, 1]}>
        <sphereGeometry args={[10, 20, 20]} />
        <meshPhysicalMaterial color="white" metalness={0.5} roughness={0.5} />
      </mesh> */}
      <CatModel/>
      <mesh position={[0, -400, 1]} receiveShadow>
        <sphereGeometry args={[400, 50, 50]} />
        <meshStandardMaterial
          color={
            "white"
            /*   day
              ? weatherConfig[weatherSymbol].dayColor
              : weatherConfig[weatherSymbol].nightColor */
          }
          side={THREE.DoubleSide}
        />
      </mesh>
      {totalCloudClusters}
      <Shadow />
      <OrbitControls
        target={new Vector3(0, 30, 0)}
        minDistance={80} // Set the minimum distance the camera can be zoomed out
        maxDistance={140} // Set the maximum distance the camera can be zoomed in
        minPolarAngle={Math.PI / 3} // Set the minimum polar angle (vertical rotation) in radians
        maxPolarAngle={Math.PI / 1.8} // Set the maximum polar angle (vertical rotation) in radians
      />
    </Canvas>
  );
};

export default CanvasMain;
