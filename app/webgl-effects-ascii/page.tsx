"use client";

import {
  AsciiRenderer,
  PerspectiveCamera,
  Plane,
  Sphere,
  TrackballControls,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, MeshBasicMaterial, MeshPhongMaterial } from "three";

const Page = () => {
  return (
    <div className="w-full h-svh">
      <Canvas resize={{ scroll: false, debounce: 0 }}>
        <Renderer />
        <Camera />
        <pointLight args={[0xffffff, 3, 0, 0]} position={[500, 500, 500]} />
        <pointLight args={[0xffffff, 1, 0, 0]} position={[-500, -500, -500]} />
        <SphereMesh />
        <PlaneMesh />
        <TrackballControls />
      </Canvas>
    </div>
  );
};

const start = Date.now();
const SphereMesh = () => {
  const sphereRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!sphereRef.current) {
      return;
    }
    const timer = Date.now() - start;
    sphereRef.current.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
    sphereRef.current.rotation.x = timer * 0.0003;
    sphereRef.current.rotation.y = timer * 0.0002;
  });

  return (
    <Sphere
      ref={sphereRef}
      args={[200, 20, 10]}
      material={new MeshPhongMaterial({ flatShading: true })}
    />
  );
};

const PlaneMesh = () => {
  return (
    <Plane
      args={[400, 400]}
      position={[0, -200, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={new MeshBasicMaterial({ color: 0xe0e0e0 })}
    />
  );
};

const Camera = () => {
  const { viewport } = useThree();

  return (
    <PerspectiveCamera
      makeDefault
      args={[70, viewport.width / viewport.height, 1, 1_000]}
      position={[0, 150, 500]}
    />
  );
};

const Renderer = () => {
  return <AsciiRenderer invert={false} characters=" .:-+*=%@#" />;
};

export default Page;
