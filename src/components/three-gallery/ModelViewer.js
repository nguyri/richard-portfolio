import React from 'react';
import { Component, useEffect } from 'react';
import * as THREE from 'three';
// demo from https://medium.com/@colesayershapiro/using-three-js-in-react-6cb71e87bdf4
// import {ThreeMFLoader} from './3MFLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import modelData from './fbxData'
// import Button from 'react-bootstrap/Button'
import './ThreeScene.css'
import MediaQuery from 'react-responsive'

// import {ThreeMFLoader} from './3MFLoader2'
import model from '../../models/lamp-base-1.3mf'

//https://github.com/technohippy/3MFLoader/blob/master/app/index.html

const ModelViewer = (props) => {
    let [modelShown, setModelShown] = React.useState(0);
    let [zoom, setZoom] = React.useState(props.zoom, 40);
    let [modelList, setModelList] = React.useState([]);
    let [scene, setScene] = React.useState(new THREE.Scene());
    let myRef = React.useRef();
    let [camera, setCamera] = React.useState(); 
    let [material] = React.useState(new THREE.MeshPhongMaterial({ flatShading: 'false', color: new THREE.Color(0xafafaf) }))
    let [brightness, setBrightness] = React.useState(1);
    let [rimLight] = React.useState(new THREE.PointLight(0xffffff, brightness));
    // let [pointLight] = React.useState(new THREE.HemisphereLight( 0xffffff, 0x444444 ));
    let [pointLight] = React.useState(new THREE.DirectionalLight( 0xffffff ));


    // var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    let controls;

    const models = {};
    importAll(require.context('../../models/', false, /\.(glb|fbx)$/));

    function importAll(r) {
      r.keys().forEach((key) => models[key] = r(key));
    }

    React.useEffect(() => {
        const width = myRef.current.clientWidth
        const height = myRef.current.clientHeight
        let cameraInit = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 2000)//( 10, width / height, 50, 800)
        // this.cameraInit = new THREE.PerspectiveCameraInit( 5, width / height, 50, 2000)
        cameraInit.zoom = zoom;
        cameraInit.up.set(0, 0, 1);
        cameraInit.position.set(50, -200, 100);
        cameraInit.lookAt(0, 0, 0)
        cameraInit.updateProjectionMatrix();

        setCamera(cameraInit);
    
        // this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
    
        rimLight.position.set(-80, 90, 100);
        pointLight.position.set(80, -90, 200);
        scene.add(pointLight);
        scene.add(rimLight);
        // scene.add(new THREE.AmbientLight(0xffffff, 2.0));
        // let [material] = React.useState(new THREE.MeshPhongMaterial({ flatShading: 'false', color: new THREE.Color(0xafafaf) }))
        let material = new THREE.MeshPhongMaterial({ flatShading: 'false', color: new THREE.Color(0xafafaf) });

        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
        scene.add(mesh);

        let renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor('#FFFFFF', 0) //#F9F7F0
        renderer.setSize(width, height)
        myRef.current.appendChild(renderer.domElement)
    
        let loader = new GLTFLoader();
        loadGLTF(loader, models, modelData, modelList, modelShown, scene, material);
        // loadFBX(loader, models, modelData, modelList, modelShown, scene);
        // let loaderThree = new ThreeMFLoader();
        // loadThreeMF(loader, modelData, modelList, modelShown, scene)

        const render = () => {
            renderer.render(scene, cameraInit);
        }
        const axesHelper = new THREE.AxesHelper(20);
        scene.add(axesHelper);
        // scene.add(cube);
    
        controls = new OrbitControls(cameraInit, renderer.domElement);
        controls.addEventListener('change', render);
        controls.target.set(0, 0, 20);
        controls.minPolarAngle = Math.PI / 3;
        controls.maxPolarAngle = Math.PI ;
        controls.minAzimuthAngle = Math.PI / 8;
        controls.maxAzimuthAngle = Math.PI * 7 / 8;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.update();

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
      pointLight.intensity = brightness;
      pointLight.updateMatrix();
      pointLight.updateMatrixWorld();
      rimLight.intensity = brightness;
      rimLight.updateMatrix();
      rimLight.updateMatrixWorld();
    }, [brightness])

    function findBody(list) {
      for (var i in list) {
        if(list[i].name == 'body')
          return list[i];
        if (Object.hasOwn(list[i], "children")) {
          var result = findBody(list[i].children);
          if (result != null) {
            return result;
          }
        }
      }
      return null;
    }
    const loadGLTF = (loader, models, modelData, list, modelShown, scene, material) => {
      const path = `./${modelData[0].files}`
      // console.log(modelData[0])
      loader.load( models[path].default , function ( loadedGLTF ) {
      // loader.load( models["./urban-10-new-export.loadedGLTF"].default , function ( loadedGLTF ) {
        loadedGLTF.name = path
        let fullModel = loadedGLTF.scene.children[0];
        let body = findBody(loadedGLTF.scene.children);

        console.log(fullModel);
        console.log(body);
        // body.material.metalness = 0;
        // body.children[0].material.metalness = 0;
        // body.children[1].material.metalness = 0;
        fullModel.traverse((child) =>  {
          if (child.isMesh) {
            // child.material.emissive = 0;
            // child.material.ambient = 0;
            child.material.specular = 1;
            child.material.metalness = 0;
          }
        })
        // body.scale.set(20,20,20);
        // fullModel.scale.set(20,20,20);

        fullModel.scale.set(20,20,20);
        fullModel.position.set(...modelData[0].position);
        fullModel.rotation.set(...modelData[0].rotation);

        // loadedGLTF.scene.children[0].children[3].children[0].material = material;
        scene.add( loadedGLTF.scene );
      }, undefined, function ( error ) {
        console.error( error );
      } );
    }

    const loadFBX = (loader, models, modelData, list, modelShown, scene) => {
      const path = `./${modelData[0].files}`
      console.log(path);
      console.log(models);
      console.log(models[path].default)
      
      loader.load( models["./urban-10-new-export.fbx"].default , function ( fbx ) {
      // loader.load( models["./urban-10-new-export.fbx"].default , function ( fbx ) {
        fbx.name = path
        console.log(fbx);
        // fbx.rotation.set(...modelData[0].rotations);
        // fbx.position.set(...modelData[0].positions);
        fbx.scale.set(0.1, 0.1, 0.1);
        fbx.children[0].material = material;
        scene.add( fbx );
      }, undefined, function ( error ) {
        console.error( error );
      } );
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
        // for (var i = modelList[modelShown].length - 1; i >= 0; i--) {
        //   let step = 2 / (modelList[modelShown].length - 1)
        //   unitArray.push(step * i - 1)
        // }
        // modelList[modelShown].forEach((model, index) => {
        //   model.position.z = modelData[modelShown].positions[index][2] + num * unitArray[index]
        //   // if(index == 0)
        //   //   console.log(model.position.z)
        // })
        // camera.zoom = props.zoom - num / 20;
        camera.updateProjectionMatrix();
      }
      return (
        <div className='threescene--div'>
        <h1 className='threescene--title'>{modelData[modelShown].name}</h1>
        <div className='threescene--slider-div'>
          <Slider onChange={setBrightness} min={1} max={30} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className={'threescene--button'} onClick={() =>
            modelShown > 0 && changeModelShown(modelShown - 1)}>Prev</button> {' '}
          <button className={'threescene--button'} onClick={() => 
            modelShown < modelList.length - 1 && changeModelShown(modelShown + 1)}>Next Model</button>
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
export default ModelViewer;