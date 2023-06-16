// import {shaderMaterial} from "@react-three/drei"
// import * as THREE from "three"

// const vertexShader = /*glsl*/`
// void main() {
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `;

// const fragmentShader = /*glsl*/`
// uniform float u_time;
// uniform vec3 u_color; 
// uniform vec2 u_resolution;
// void main() {
//   vec2 st = gl_FragCoord.xy/u_resolution;
//   // gl_FragColor = vec4(vec3( st.x, st.y, 0.0), 1.0);
//   gl_FragColor = vec4(vec3(abs(sin(u_time)), 0.0, 0.0) + u_color, 1.0);
// }
// `;

// const uniforms = {
//   u_resolution: new THREE.Vector2(0.0,0.0),
//   u_time: 0,
//   u_color: new THREE.Color(0.0, 0.0, 0.0),
// }

// const MyMaterial = shaderMaterial(
//   uniforms,
//   vertexShader,
//   fragmentShader,
// );


// export default MyMaterial;