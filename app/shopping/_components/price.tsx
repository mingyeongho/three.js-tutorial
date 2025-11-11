import { Mask, Text, useMask } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { Group } from "three";

type PriceProps = {
  value: number;
};

const Price = ({ value }: PriceProps) => {
  return (
    <group position={[-2, 0.3, -3.25]}>
      {[...`✨✨✨${value}`.slice(-4)].map((num, index) => (
        <Counter
          index={index}
          value={num === "✨" ? -1 : Number(num)}
          key={index}
          speed={0.1 * (4 - index)}
        />
      ))}
      <Text anchorY="bottom" position={[4 * 1.1, -0.25, 0]} fontSize={1}>
        $
      </Text>
      <Mask id={1}>
        <planeGeometry args={[10, 1.55]} />
      </Mask>
    </group>
  );
};

type CounterProps = {
  index: number;
  value: number;
  speed: number;
};

const Counter = ({ index, value, speed = 0.1 }: CounterProps) => {
  const ref = useRef<Group>(null);
  const stencil = useMask(1);

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }
    easing.damp(ref.current.position, "y", value * -2, speed, delta);
  });

  return (
    <group ref={ref} position-x={index * 1.1}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Text key={number} position={[0, number * 2, 0]} fontSize={2}>
          {number}
          <meshBasicMaterial {...stencil} />
        </Text>
      ))}
    </group>
  );
};

export default Price;
