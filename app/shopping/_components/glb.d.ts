import { GLTF } from "three-stdlib";
import * as THREE from "three";

export type GLTFResult = GLTF & {
  nodes: {
    vase: THREE.Mesh;
    vase1: THREE.Mesh;
    bottle: THREE.Mesh;
    walls_1: THREE.Mesh;
    walls_2: THREE.Mesh;
    plant_1: THREE.Mesh;
    plant_2: THREE.Mesh;
    cuttingboard: THREE.Mesh;
    bowl: THREE.Mesh;
    carpet: THREE.Mesh;
    table: THREE.Mesh;
    chairs_1: THREE.Mesh;
    chairs_2: THREE.Mesh;
    lamp: THREE.Mesh;
    kitchen: THREE.Mesh;
    sink: THREE.Mesh;
  };
  materials: {
    gray: THREE.Material;
    floor: THREE.Material;
    walls: THREE.Material;
    potted_plant_01_leaves: THREE.Material;
    potted_plant_01_pot: THREE.Material;
  };
};
