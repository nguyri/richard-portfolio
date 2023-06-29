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
import Button from 'react-bootstrap/Button'
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
    let scene = new THREE.Scene();
    let myRef = React.useRef();
    let [camera, setCamera] = React.useState(); 
    let controls;

    React.useEffect(() => {
        const width = myRef.current.clientWidth
        const height = myRef.current.clientHeight
        let cameraInit = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 2000)//( 10, width / height, 50, 800)
        // this.cameraInit = new THREE.PerspectiveCameraInit( 5, width / height, 50, 2000)
        cameraInit.zoom = zoom;
        cameraInit.up.set(0, 0, 1);
        cameraInit.position.set(200, 200, 200);
        cameraInit.lookAt(0, 0, 0)
        cameraInit.updateProjectionMatrix();

        setCamera(cameraInit);
    
        console.log(camera);
        // this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
    
        let pointLight = new THREE.PointLight(0xffffff, 0.6);
        pointLight.position.set(80, 90, 200);
        scene.add(pointLight);
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    
        let renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor('#FFFFFF', 0) //#F9F7F0
        renderer.setSize(width, height)
        myRef.current.appendChild(renderer.domElement)
    
        let loader = new ThreeMFLoader();
        loadThreeMF(loader, modelData, modelList, modelShown, scene)

        const render = () => {
            renderer.render(scene, cameraInit);
        }
    
        controls = new OrbitControls(cameraInit, renderer.domElement);
        controls.addEventListener('change', render);
        controls.target.set(20, 0, 0);
        controls.minPolarAngle = Math.PI / 3;
        controls.maxPolarAngle = controls.minPolarAngle;
        controls.minAzimuthAngle = Math.PI / 8;
        controls.maxAzimuthAngle = Math.PI * 7 / 8;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.update();

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
          }
      
        window.addEventListener("resize", onWindowResize, false);

        const animate = () => {
            requestAnimationFrame( animate );
            render();
        }

        animate();
        // return () => myRef.current.removeChild(renderer.domElement);
    }, []);

    React.useEffect(() => {

    }, []);

    // React.useEffect(() => {
    //     console.log(camera, zoom);
    //     camera.zoom = zoom;
    // }, [zoom]);

    const loadThreeMF = (loader, modelData, list, modelShown, scene) => {
        // loader.addExtension( ThreeMFLoader.MaterialsAndPropertiesExtension );
        modelData.forEach((modelGroup, modelIndex) => {
          let loadedGroup = []
          modelGroup.files.forEach((path, index) => {
            loader.load(models[path].default, (object3mf) => {
              object3mf.name = path
              loadedGroup[index]=(object3mf);
              object3mf.position.set(...modelGroup.positions[index]);
              object3mf.rotation.set(...modelGroup.rotations[index]);
              const material = new THREE.MeshPhongMaterial({ flatShading: 'false', color: new THREE.Color(0xafafaf) });
              object3mf.children[0].children[0].material = material;
              if (modelIndex == modelShown) {
                scene.add(object3mf);
              }
            }, undefined, function (error) {
              console.error("loader error" + error);
            }); // loader.load
          }); //modelGroup.files.forEach
          console.log(loadedGroup);
          list.push(loadedGroup);
          console.log(list);
        })
        setModelList(list);
      }
      console.log(modelList);

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
          <Button variant="primary" size='lg' className={'threescene--button'} onClick={() =>
            modelShown > 0 && changeModelShown(modelShown - 1)}>Prev</Button> {' '}
          <Button variant="primary" size='lg' className={'threescene--button'} onClick={() => {
            console.log(modelShown, modelList.length);
modelShown < modelList.length - 1 && changeModelShown(modelShown + 1)
          }
            }>Next Model</Button>
        </div>
        <MediaQuery minWidth={1224} >
          {(matches) => 
          matches ? 
          <div
            style = {{ width: '30vw', height: '30vw' }}
            ref={myRef} >
          </div> : 
          <div
            style = {{ width: '100vw', height: '100vw' }}
            ref={myRef} >
          </div>
          } 
        </MediaQuery>
      </div>
    );
}
export default ThreeFunc;