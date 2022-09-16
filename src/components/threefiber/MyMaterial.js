import {shaderMaterial} from "@react-three/drei"
import * as THREE from "three"

const vertexShader = /*glsl*/`
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /*glsl*/`
uniform float time;
uniform vec3 color; 
void main() {
  gl_FragColor = vec4(vec3(abs(sin(time)), 0.0, 0.0) + color, 1.0);
}
`;

const uniforms = {
  u_resolution: { value: { x: null, y: null } },
  u_time: { value: 0.0 },
  u_mouse: { value: { x: null, y: null } },
}

const MyMaterial = shaderMaterial(
  {time: 0, color: new THREE.Color(0.0, 0.0, 0.0)},
  vertexShader,
  fragmentShader,
);


export default MyMaterial;