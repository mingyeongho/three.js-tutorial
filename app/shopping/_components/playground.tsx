"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import SceneGraph from "./SceneGraph";
import {
  EffectComposer,
  N8AO,
  Outline,
  Selection,
  TiltShift2,
  ToneMapping,
} from "@react-three/postprocessing";
import { Bvh, Sky } from "@react-three/drei";

const PLayground = () => {
  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{
        fov: 25,
        near: 1,
        far: 20,
        position: [0, 1, 6],
      }}
    >
      <ambientLight intensity={1.5 * Math.PI} />
      <Sky />
      <Bvh firstHitOnly>
        <Selection>
          <Effects />
          <SceneGraph />
        </Selection>
      </Bvh>
    </Canvas>
  );
};

const Effects = () => {
  const { size } = useThree();

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        state.pointer.x,
        1 + state.pointer.y / 2,
        8 + Math.atan(state.pointer.x * 2),
      ],
      0.3,
      delta
    );
    state.camera.lookAt(state.camera.position.x * 0.9, 0, -4);
  });

  return (
    <EffectComposer
      stencilBuffer
      enableNormalPass={false}
      autoClear={false}
      multisampling={4}
    >
      <N8AO
        halfRes
        aoSamples={5}
        aoRadius={0.4}
        distanceFalloff={0.75}
        intensity={1}
      />
      <Outline
        visibleEdgeColor={0xffffff}
        hiddenEdgeColor={0xffffff}
        blur
        width={size.width * 1.25}
        edgeStrength={10}
      />
      <TiltShift2 samples={5} blur={0.1} />
      <ToneMapping />
    </EffectComposer>
  );
};

export default PLayground;
