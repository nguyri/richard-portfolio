import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, OrthographicCamera } from '@react-three/drei'; 
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import modelData from './modelData';
import './ThreeScene.css';
import MediaQuery from 'react-responsive';
import * as THREE from 'three';

// Preload your 3MF models
const models = {};
function importAll(r) {
  r.keys().forEach((key) => (models[key] = r(key)));
}
// importAll(require.context('../../models/', false, /\.(3mf)$/));

// const Box = ({ position, material }) => {
//   const geometry = new THREE.BoxGeometry(20, 20, 20);
//   return <mesh position={position} geometry={geometry} material={material} />;
// };

const Scene = ({ modelShown, setModelList, brightness }) => {
  // Load model based on the index
//   const { nodes } = useGLTF(models[modelData[modelShown].files[0]].default); // Adjust as necessary for multiple files
  return (
    <>
      <Box position={[0, 0, 0]} material={new THREE.MeshPhongMaterial({ color: 0xffff00 })} />
      <pointLight position={[80, 90, 200]} intensity={brightness} castShadow />
      <ambientLight intensity={1} />
      {/* Add your loaded model */}
      {/* {nodes && <primitive object={nodes.model} />} Adjust to your model's structure */}
    </>
  );
};

const ThreeFiber = (props) => {
  const [modelShown, setModelShown] = useState(0);
  const [brightness, setBrightness] = useState(1);

  const changeModelShown = (num) => {
    setModelShown(num);
  };

  const setTranslation = (num) => {
    // Implement translation logic here if needed
  };

  const Box = (props) => {
    const boxRef = useRef();
  
    return (
      <mesh ref={boxRef} {...props}>
        <boxGeometry args={[10, 10, 10]} />
        <meshPhongMaterial attach="material" color={"blue"} castShadow={true}/>
      </mesh>
    );
  };

  return (
    <div className='threescene--div'>
      <h1 className='threescene--title'>{modelData[modelShown].name}</h1>
      <div className='threescene--slider-div'>
        <Slider onChange={setTranslation} min={1} max={30} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          className={'threescene--button'}
          onClick={() => modelShown > 0 && changeModelShown(modelShown - 1)}
        >
          Prev
        </button>
        <button
          className={'threescene--button'}
          onClick={() => modelShown < modelData.length - 1 && changeModelShown(modelShown + 1)}
        >
          Next Model
        </button>
      </div>
      
      <MediaQuery minWidth={1224}>
        {(smallWidth) => (
          <div style={smallWidth ? { width: '30vw', height: '30vw' } : { width: '100vw', height: '100vw' }}>
            <Canvas>
                <OrbitControls />
                {/* <Scene modelShown={modelShown} brightness={brightness} /> */}
                <pointLight position={[100, 100, 100]} intensity={100}  />
                <Box position={[0, 0, 0]} />
                <ambientLight intensity={1}/>
                <OrthographicCamera
                    makeDefault
                    zoom={5}
                    top={200}
                    bottom={-200}
                    left={200}
                    right={-200}
                    near={1}
                    far={2000}
                    position={[200, 200, 200]}
                />
            </Canvas>
          </div>
        )}
      </MediaQuery>
    </div>
  );
};

export default ThreeFiber;
