import React from 'react';
import { Component, useEffect } from 'react';
import * as THREE from 'three';
// demo from https://medium.com/@colesayershapiro/using-three-js-in-react-6cb71e87bdf4
// import {ThreeMFLoader} from './3MFLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import modelData from './modelData'
// import Button from 'react-bootstrap/Button'
import './ThreeScene.css'
import MediaQuery from 'react-responsive'

// import {ThreeMFLoader} from './3MFLoader2'
import model from '../../models/lamp-base-1.3mf'

//https://github.com/technohippy/3MFLoader/blob/master/app/index.html

const models = {};

function importAll(r) {
  r.keys().forEach((key) => models[key] = r(key));
}

importAll(require.context('../../models/', false, /\.(3mf)$/));

const ThreeFunc = (props) => {
    let [modelShown, setModelShown] = React.useState(0);
    let [zoom, setZoom] = React.useState(props.zoom);
    let [modelList, setModelList] = React.useState([]);
    let [scene, setScene] = React.useState();
    let myRef = React.useRef();
    let [camera, setCamera] = React.useState(); 
    let [material] = React.useState(new THREE.MeshPhongMaterial({ flatShading: false, color: new THREE.Color(0xafafaf), specular: 0x555555, shininess: 30 }))
    let [controls, setControls] = React.useState();
    let [pointLight, setPointLight] = React.useState();
    let [ambientLight] = React.useState(new THREE.AmbientLight(0xffffff, 1));
    let [renderer] = React.useState(new THREE.WebGLRenderer({ antialias: true }));
    let [brightness, setBrightness] = React.useState(1);

    //demo box
    let [geometry] = React.useState(new THREE.BoxGeometry(20, 20, 20));
    let [cubeMaterial] = React.useState(new THREE.MeshPhongMaterial({ color: 0x00ff00 }));
    let [cube] = React.useState(new THREE.Mesh(geometry, cubeMaterial));

    React.useEffect(() => {
        const width = myRef.current.clientWidth
        const height = myRef.current.clientHeight
        let cameraInit = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 2000);//( 10, width / height, 50, 800)
        // let cameraInit = new THREE.PerspectiveCameraInit( 5, width / height, 50, 2000)
        cameraInit.zoom = zoom;
        cameraInit.up.set(0, 0, 1);
        cameraInit.position.set(200, 200, 200);
        cameraInit.lookAt(0, 0, 0)
        cameraInit.updateProjectionMatrix();

        setCamera(cameraInit);
        
        
        // demo box
        let sceneInit = new THREE.Scene();
        sceneInit.add(cube);
        
        // this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
        
        let pointLightInit = new THREE.PointLight(0xffffff, 1);
        pointLightInit.position.set(80, 90, 200);
        pointLightInit.castShadow = true;
        cube.castShadow = true;
        pointLightInit.updateMatrix();
        cube.position.set(0,0,0);
        setPointLight(pointLightInit);
        sceneInit.add(pointLightInit);
        sceneInit.add(ambientLight);
        
        renderer.setClearColor('#FFFFFF', 0) //#F9F7F0
        renderer.setSize(width, height)
        myRef.current.appendChild(renderer.domElement)
        
        let loader = new ThreeMFLoader();
        // loadThreeMF(loader, modelData, modelList, modelShown, sceneInit, material, setModelList)
        
        const render = () => {
          renderer.render(sceneInit, cameraInit);
        }
        
        
        let initControls = new OrbitControls(cameraInit, renderer.domElement);
        initControls.addEventListener('change', render);
        initControls.target.set(20, 0, 0);
        initControls.minPolarAngle = Math.PI / 3;
        initControls.maxPolarAngle = initControls.minPolarAngle;
        initControls.minAzimuthAngle = Math.PI / 8;
        initControls.maxAzimuthAngle = Math.PI * 7 / 8;
        initControls.enablePan = false;
        initControls.enableZoom = false;
        initControls.autoRotate = true;
        initControls.update();
        setControls(initControls);
        setScene(sceneInit);

        let onWindowResize = function () {
            cameraInit.aspect = window.innerWidth / window.innerHeight;
            cameraInit.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
          }
      
        window.addEventListener("resize", onWindowResize, false);

        const animate = () => {
            requestAnimationFrame( animate );
            render();
        }

        animate();
        return () => myRef.current && myRef.current.removeChild(renderer.domElement);
    }, []);

    React.useEffect(() => {
      // console.log(pointLight);
      pointLight && updateLight(pointLight, brightness);
    }, [brightness])
  

    const updateLight = (light, brightness) => {
      light.intensity = brightness;
      light.updateMatrix();
      light.updateMatrixWorld();
    }

    const loadThreeMF = (loader, modelData, list, modelShown, scene, material, setModelList) => {
        // loader.addExtension( ThreeMFLoader.MaterialsAndPropertiesExtension );
        modelData.forEach((modelGroup, modelIndex) => {
          let loadedGroup = []
          modelGroup.files.forEach((path, index) => {
            loader.load(models[path].default, (object3mf) => {
              object3mf.name = path
              loadedGroup[index]=(object3mf);
              object3mf.position.set(...modelGroup.positions[index]);
              object3mf.rotation.set(...modelGroup.rotations[index]);
              object3mf.traverse((child) => {
                if (child.isMesh) {
                  child.material = material;
                  // child.geometry.computeVertexNormals();
                }
              })
              console.log(object3mf);
              if (modelIndex == modelShown) {
                scene.add(object3mf);
              }
            }, undefined, function (error) {
              console.error("loader error" + error);
            }); // loader.load
          }); //modelGroup.files.forEach
          list.push(loadedGroup);
        })
        setModelList(list);
      }

      const changeModelShown = (num) => {
        setModelShown(num);
        // console.log('in model shown', modelShown,modelList.length, num);
        modelList.forEach((modelGroup, index) => {
            modelGroup.forEach((model) => {
            if (index == num) {
                scene.add(model)
              } else {
                scene.remove(model)
              }
        })})
    }
    const setTranslation = (num) => {
        let unitArray = []
        for (var i = modelList[modelShown].length - 1; i >= 0; i--) {
          let step = 2 / (modelList[modelShown].length - 1)
          unitArray.push(step * i - 1)
        }
        modelList[modelShown].forEach((model, index) => {
          model.position.z = modelData[modelShown].positions[index][2] + num * unitArray[index]
          // if(index == 0)
          //   console.log(model.position.z)
        })
        camera.zoom = props.zoom - num / 20;
        camera.updateProjectionMatrix();
      }
    return (
        <div className='threescene--div'>
        <h1 className='threescene--title'>{modelData[modelShown].name}</h1>
        <div className='threescene--slider-div'>
          <Slider onChange={setTranslation} min={1} max={30} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className={'threescene--button'} onClick={() =>
            modelShown > 0 && changeModelShown(modelShown - 1)}>Prev</button> {' '}
          <button className={'threescene--button'} onClick={() => 
            modelShown < modelList.length - 1 && changeModelShown(modelShown + 1)}>Next Model</button>
        </div>
        <MediaQuery minWidth={1224}>
          {(smallWidth) => (
            <div style={smallWidth ? 
              { width: '30vw', height: '30vw' } : 
              { width: '100vw', height: '100vw' }} 
              ref={myRef} />
          )}
        </MediaQuery>
      </div>
    );
}
export default ThreeFunc;