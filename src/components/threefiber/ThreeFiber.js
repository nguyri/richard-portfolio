import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Physics, useSphere, Canvas, useFrame, extend } from '@react-three/fiber'
import {Plane, Text, shaderMaterial} from '@react-three/drei'
import './ThreeFiber.css'
import MyMaterial from './MyMaterial'
import MovingPlane from './MovingPlane'

extend({ MyMaterial});

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [time, setTime] = useState(0);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  useFrame((state, delta) => (setTime(time + 0.01)))
  // console.log(time);
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <myMaterial color="blue" time={time}/>
    </mesh>
  )
}

const Fragment = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const [time, setTime] = useState(0);

  useFrame((state, delta) => (setTime(time + 0.01)))
  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={props.scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <myMaterial u_color="blue" u_time={time} />
    </mesh>
  );
};

const ThreeFiber = () => {
  return (
    <div className="threefiber--div">
    <Canvas camera={{ fov: 45, position: [1.0, 1.8, 1.0] }}>
      {/* <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <myMaterial/> */}
      <axesHelper />
      <MovingPlane />
    </Canvas>
    </div>
  )};

export default ThreeFiber;

// createRoot(document.getElementById('root')).render(
//   <Canvas>
//     <ambientLight />
//     <pointLight position={[10, 10, 10]} />
//     <Box position={[-1.2, 0, 0]} />
//     <Box position={[1.2, 0, 0]} />
//   </Canvas>,
// )