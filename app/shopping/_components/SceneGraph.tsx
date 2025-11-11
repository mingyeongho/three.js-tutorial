"use client";

import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { GLTFResult } from "./glb";
import { useState } from "react";
import Price from "./price";
import { Select } from "@react-three/postprocessing";

const SceneGraph = () => {
  const { nodes, materials } = useGLTF(
    "/kitchen-transformed.glb"
  ) as GLTFResult;
  const env = useEnvironment({ preset: "city" });
  const [hovered, setHovered] = useState<string | null>(null);
  const onPointerLeave = () => {
    setHovered(null);
  };

  const price =
    {
      KNOXHULT: 5999,
      BRÖNDEN: 433,
      SKAFTET: 77,
      FANBYN: 255,
      VOXLÖV: 1699,
      LIVSVERK: 44,
    }[hovered ?? "KNOXHULT"] ?? 5_999;

  return (
    <>
      <group rotation={[0, Math.PI / 2, 0]} position={[0, -1, -0.85]}>
        <mesh
          geometry={nodes.vase1.geometry}
          material={materials.gray}
          material-envMap={env}
        />
        <mesh
          geometry={nodes.bottle.geometry}
          material={materials.gray}
          material-envMap={env}
        />
        <mesh geometry={nodes.walls_1.geometry} material={materials.floor} />
        <mesh geometry={nodes.walls_2.geometry} material={materials.walls} />
        <mesh
          geometry={nodes.plant_1.geometry}
          material={materials.potted_plant_01_leaves}
        />
        <mesh
          geometry={nodes.plant_2.geometry}
          material={materials.potted_plant_01_pot}
        />
        <mesh
          geometry={nodes.cuttingboard.geometry}
          material={materials.walls}
        />
        <mesh geometry={nodes.bowl.geometry} material={materials.walls} />
        <Select
          onPointerEnter={() => setHovered("BRÖNDEN")}
          onPointerLeave={onPointerLeave}
        >
          <mesh geometry={nodes.carpet.geometry} material={materials.carpet} />
        </Select>
        <Select
          onPointerEnter={() => setHovered("VOXLÖV")}
          onPointerLeave={onPointerLeave}
        >
          <mesh
            geometry={nodes.table.geometry}
            material={materials.walls}
            material-envMap={env}
            material-envMapIntensity={0.5}
          />
        </Select>
        <Select
          onPointerEnter={() => setHovered("FANBYN")}
          onPointerLeave={onPointerLeave}
        >
          <mesh geometry={nodes.chairs_1.geometry} material={materials.walls} />
          <mesh
            geometry={nodes.chairs_2.geometry}
            material={materials.plastic}
            material-color="#1a1a1a"
            material-envMap={env}
          />
        </Select>
        <Select
          onPointerEnter={() => setHovered("LIVSVERK")}
          onPointerLeave={onPointerLeave}
        >
          <mesh
            geometry={nodes.vase.geometry}
            material={materials.gray}
            material-envMap={env}
          />
        </Select>
        <Select
          onPointerEnter={() => setHovered("SKAFTET")}
          onPointerLeave={onPointerLeave}
        >
          <mesh
            geometry={nodes.lamp_socket.geometry}
            material={materials.gray}
            material-envMap={env}
          />
          <mesh geometry={nodes.lamp.geometry} material={materials.gray} />
          <mesh
            geometry={nodes.lamp_cord.geometry}
            material={materials.gray}
            material-envMap={env}
          />
        </Select>
        <mesh geometry={nodes.kitchen.geometry} material={materials.walls} />
        <mesh
          geometry={nodes.sink.geometry}
          material={materials.chrome}
          material-envMap={env}
        />
      </group>
      <Text
        position={[1, 1.25, 0]}
        color="black"
        fontSize={0.15}
        letterSpacing={-0.05}
      >
        {hovered ? hovered : "KNOXHULT"}
      </Text>
      <Price value={price} />
    </>
  );
};

export default SceneGraph;
