import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Plane, Shadow, useHelper } from "@react-three/drei";
import { Scale } from "tone";

interface Props {
  sunData: any;
  weatherData: any;
}

const Spotlight: React.FC = () => {
  const spotlightGroupRef = useRef<THREE.Group>(null);
  const scale = 1;
  const [sunColor, setSunColor] = useState("rgba(235, 235, 235, 0.354)");
  const updateSpotlightPosition = (degree: number) => {
    const radius = 25;
   
    const posX = Math.cos((degree * Math.PI) / 180) * radius;
    const posY = Math.sin((degree * Math.PI) / 180) * radius;

    if (spotlightGroupRef.current) {
      spotlightGroupRef.current.position.set(posX, posY, 0);
    }
  };

  useFrame(() => {
    updateSpotlightPosition(45 ); // Example: 90 degrees
  });
  
  return (
    <group ref={spotlightGroupRef}>
      <spotLight angle={0.4} penumbra={1} castShadow position={[0, 0, 0]}  visible color={sunColor}/>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1*scale, 20, 20]} />
        <meshPhysicalMaterial
      color="rgb(255, 0, 0)"
      metalness={0.5}
      roughness={0.5}
      emissive="rgb(255, 0, 0)"
          emissiveIntensity={1}
          opacity={1}
       
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2*scale, 20, 20]} />
        <meshPhysicalMaterial
          color="rgb(255, 60, 0)"
          metalness={0.5}
          roughness={0.5}
          emissive="rgb(255, 60, 0)"
          emissiveIntensity={1}
          opacity={0.7}
       transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3*scale, 20, 20]} />
        <meshPhysicalMaterial
          color="rgb(255, 149, 0)"
          metalness={0.5}
          roughness={0.5}
          emissive="rgb(255, 149, 0)"
          emissiveIntensity={1}
          opacity={0.6}
       transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4*scale, 20, 20]} />
        <meshPhysicalMaterial
          color="rgb(255, 234, 0)"
          metalness={0.5}
          roughness={0.5}
          emissive="rgb(255, 234, 0)"
          emissiveIntensity={1}
          opacity={0.4}
       transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[5*scale, 20, 20]} />
        <meshPhysicalMaterial
          color="rgb(221, 255, 0)"
          metalness={0.5}
          roughness={0.5}
          emissive="rgb(221, 255, 0)"
          emissiveIntensity={1}
          opacity={0.3}
       transparent
        />
      </mesh>
    </group>
  );
};



const CanvasMain: React.FC<Props> = (props: Props) => {
  const sun = props.sunData;
  const weather = props.weatherData;
  console.dir(sun);
  console.dir(weather);
  return (
    <Canvas style={{ background: "black" }} shadows shadow-map={2048}>
            <fog attach="fog" args={["black", 25, 100]} />
      <ambientLight intensity={0.1} />
      <Spotlight />
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="white" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 1]}
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <Shadow />
      <OrbitControls />
    </Canvas>
  );
};

export default CanvasMain;
