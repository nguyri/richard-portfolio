import {shaderMaterial} from "@react-three/drei"

const vertexShader = /*glsl*/`
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /*glsl*/`
void main() {
  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
`;

const uniforms = {
  u_resolution: { value: { x: null, y: null } },
  u_time: { value: 0.0 },
  u_mouse: { value: { x: null, y: null } },
}

const MyMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },
  vertexShader,
  fragmentShader,
);


export default MyMaterial;