import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { OrbitControls, Plane, Shadow, useHelper } from "@react-three/drei";
import { PerspectiveCamera, Euler, Vector3 } from "three";
import weatherConfig from "../weatherConfig";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three"; // Add this import statement

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
  const scale = 1.4;
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
    const radius = 40;

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
        angle={0.5}
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

const MyObjModel = () => {
  const objRef = useRef();

  const obj = useLoader(OBJLoader, "../../assets/cat.obj");
  useEffect(() => {
    console.log("File path:", "../../assets/cat.obj");
    console.log(obj); // Log the loaded object to the console
  }, [obj]);
  return (
    <group>
      <primitive object={obj} scale={[2, 2, 2]} />
    </group>
  );
};

const CanvasMain: React.FC<Props> = (props: Props) => {
  const sun = props.sunData;
  const weather = props.weatherData;
  const currentHour = props.currentHour;
  const weatherValue = 11;
  console.dir(sun);
  console.dir(weather.symbol);
  console.dir(currentHour);
  const weatherSymbol = weather.symbol as keyof typeof weatherConfig;

  const [sunAndMoon, setSunAndMoon] = useState({ type: "sun", position: 0 });
  const [day, setDay] = useState(true);
  const [bg, setBg] = useState("white");

  const cameraConfig = {
    position: new Vector3(5, 1, 0), // Set the camera position
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
      }}
    >
      <fog attach="fog" args={["rgba(80, 80, 80, 1)", 75, 150]} />
      <ambientLight intensity={0.2} />
      <Spotlight sunAndMoon={sunAndMoon} />
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="red" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh castShadow position={[1, 0, 1]}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshPhysicalMaterial color="blue" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0, -2]}>
        <coneGeometry args={[0.5, 1, 30]} />
        <meshPhysicalMaterial color="green" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[-2, 0, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1]} />
        <meshPhysicalMaterial color="yellow" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 1]}
        receiveShadow
      >
        <circleGeometry args={[200, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh
      /*  rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 1]}
        receiveShadow */
      >
        <sphereGeometry args={[100, 100, 100]} />
        <meshStandardMaterial
          color={
            day
              ? weatherConfig[weatherSymbol].dayColor
              : weatherConfig[weatherSymbol].nightColor
          }
          side={THREE.DoubleSide}
        />
      </mesh>
      <MyObjModel />
      <Shadow />
      <OrbitControls
      /*   minDistance={5} // Set the minimum distance the camera can be zoomed out
        maxDistance={20} // Set the maximum distance the camera can be zoomed in
        minPolarAngle={Math.PI / 4} // Set the minimum polar angle (vertical rotation) in radians
        maxPolarAngle={Math.PI / 2} // Set the maximum polar angle (vertical rotation) in radians
       *//>
    </Canvas>
  );
};

export default CanvasMain;
