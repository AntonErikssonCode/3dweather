import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { OrbitControls, Plane, Shadow, useHelper } from "@react-three/drei";
import { PerspectiveCamera, Euler, Vector3 } from "three";
import weatherConfig from "../weatherConfig";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three"; // Add this import statement
import { wait } from "@testing-library/user-event/dist/utils";

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
  const scale = 3;
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
    const radius = 30 * scale;

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
}
function getRandomInt(min: number, max: number): number {
  // Add 1 to the difference between max and min
  // Multiply it by Math.random()
  // Floor the result to get an integer within the range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Cloud(props: CloudProps) {
  const weather = props.weather;
  // Cloud intensity 0.6
  // Cloud true
  const cloudColor = "#fff";
  const cloudScale = getRandomInt(2,6);;
  const xPos = getRandomInt(-10,10);
  const yPos = getRandomInt(50,65);
  const zPos = getRandomInt(-10,10);
  const position = new Vector3(xPos, yPos, zPos);
  return (
    <group>
      <mesh position={position}>
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
      <mesh position={position}>
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
    </group>
  );
}

function CloudCluster(props: CloudProps) {
  const weather = props.weather;
  const numberOfClouds  = getRandomInt(1,20);
  const xPos = getRandomInt(-80,80);
  const yPos = getRandomInt(0,0);
  const zPos = getRandomInt(-80,80);
  const position = new Vector3(xPos, yPos, zPos);

  const clouds = Array.from({ length: numberOfClouds }, (_, index) => (
    <Cloud key={index} weather={weather} />
  ));
  return <group position={position}>{clouds}</group>;
}


const CanvasMain: React.FC<Props> = (props: Props) => {
  const sun = props.sunData;
  const weather = props.weatherData;
  const currentHour = props.currentHour;
  console.dir(sun);
  console.dir(weather);
  console.dir(currentHour);
  const weatherSymbol = weather.symbol as keyof typeof weatherConfig;

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
    console.dir(moonMoveDegreeTotal);

    if (currentHour >= sun.sunrise && currentHour <= sun.dusk) {
      setSunAndMoon({ type: "sun", position: sunMoveDegreeTotal });
      setDay(true);
    } else {
      setSunAndMoon({ type: "moon", position: moonMoveDegreeTotal });
      setDay(false);
    }
  }, [currentHour, sun, weather]);

  console.dir(weatherConfig[weatherSymbol].cloudIntensity)
  return (
    <Canvas
      style={
        day
          ? { background: weatherConfig[weatherSymbol].dayColor }
          : { background: weatherConfig[weatherSymbol].nightColor }
      } // Sky Color
      shadows
      shadow-map={2048}
      camera={{
        position: cameraConfig.position,
        rotation: cameraConfig.rotation,
        fov: cameraFov,
      }}
    >
      {/*       <fog attach="fog" args={["rgba(80, 80, 80, 1)", 25, 75]} />
       */}{" "}
      <ambientLight intensity={0.2} />
      <Spotlight sunAndMoon={sunAndMoon} />
  
      <mesh castShadow position={[1, 10, 1]}>
        <sphereGeometry args={[10, 20, 20]} />
        <meshPhysicalMaterial color="white" metalness={0.5} roughness={0.5} />
      </mesh>
      
      <mesh
   
        position={[0, -200.5, 1]}
        receiveShadow
      >
        <sphereGeometry args={[200, 50, 50]} />
        <meshStandardMaterial
          color={
            "grey"
            /*  day
              ? weatherConfig[weatherSymbol].dayColor
              : weatherConfig[weatherSymbol].nightColor */
          }
          side={THREE.DoubleSide}
        />
      </mesh>
<CloudCluster weather={weather}/>



      <Shadow />
      <OrbitControls
        target={new Vector3(0, 30, 0)}
        minDistance={80} // Set the minimum distance the camera can be zoomed out
        maxDistance={140} // Set the maximum distance the camera can be zoomed in
        minPolarAngle={Math.PI / 3} // Set the minimum polar angle (vertical rotation) in radians
        maxPolarAngle={Math.PI / 2} // Set the maximum polar angle (vertical rotation) in radians
      />
    </Canvas>
  );
};

export default CanvasMain;
