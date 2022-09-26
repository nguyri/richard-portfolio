import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { Color } from "three";
// import './scene.css';

const vertexShader = /*glsl*/`
uniform float u_time;

varying vec2 vUv;
varying float vZ;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 0.5) * 0.2;
  
  // Uncomment the code and hit the refresh button below for a more complex effect 🪄
  modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 0.2) * 0.1;
  // modelPosition.y += sin(modelPosition.z * 5.0 + u_time * 0.2) * 0.1;
  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

const fragmentShader = /*glsl*/`
uniform float u_time;
uniform vec3 u_colorA; 
uniform vec3 u_colorB;
varying float vZ; 

uniform vec2 u_resolution;
void main() {
//   vec2 st = gl_FragCoord.xy/u_resolution;
  // gl_FragColor = vec4(vec3( st.x, st.y, 0.0), 1.0);

//   gl_FragColor = vec4(vec3(abs(sin(u_time)), 0.0, 0.0) + u_color, 1.0);
    vec3 color = mix(u_colorA, u_colorB, floor((vZ * 2.0 + 0.5)*8.0)/8.0);
    gl_FragColor = vec4(color, 1.0);
}
`;

const MovingPlane = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color("#b2eeff") },
      u_colorB: { value: new Color("#b2c8ff") },
    }), []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 0.3, 0]}  rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        // wireframe
      />
    </mesh>
  );
};

export default MovingPlane;
