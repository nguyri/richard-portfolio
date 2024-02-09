import React from 'react';
import { Component, useEffect } from 'react';
import * as THREE from 'three';
// demo from https://medium.com/@colesayershapiro/using-three-js-in-react-6cb71e87bdf4
// import {ThreeMFLoader} from './3MFLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import {getImage} from '../entry/data'

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
    let [modelIndex, setModelIndex] = React.useState(1);
    let [modelShown, setModelShown] = React.useState();
    let [modelList, setModelList] = React.useState([]);
    let [zoom, setZoom] = React.useState(15);
    let [scene, setScene] = React.useState(new THREE.Scene());
    let myRef = React.useRef();
    let [camera, setCamera] = React.useState(); 
    let [brightness, setBrightness] = React.useState(2);
    let [rimLight] = React.useState(new THREE.PointLight(0xffffff));
    let [dirLight] = React.useState(new THREE.DirectionalLight( 0xffffff ));
    let [ambientLight] = React.useState(new THREE.AmbientLight( 0xffffff, 2 ));
    let lights = [rimLight, dirLight];
    let controls;

    const models = {};
    importAll(require.context('../../models/', false, /\.(glb)$/));

    function importAll(r) {
      r.keys().forEach((key) => models[key] = r(key));
    }

    // console.log(models);
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
    
        rimLight.position.set(-180, 100, 200);
        dirLight.position.set(200, -90, 200);
        scene.add(dirLight);
        scene.add(rimLight);
        scene.add(ambientLight);
        THREE.ColorManagement.enabled = true;
        // scene.add(new THREE.AmbientLight(0xffffff, 2.0));
        // let [material] = React.useState(new THREE.MeshPhongMaterial({ flatShading: 'false', color: new THREE.Color(0xafafaf) }))
        let materials = loadTextures(modelData, modelIndex);

        // const sphereRadius = 30;
        // const sphereWidthDivisions = 32;
        // const sphereHeightDivisions = 16;
        // const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        // const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
        // const mesh = new THREE.Mesh(sphereGeo, materialClothes);
        // mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
        // scene.add(mesh);

        
        let renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor('#000000', 0) //#F9F7F0
        renderer.setSize(width, height)
        myRef.current.appendChild(renderer.domElement)
        
        const composer = new EffectComposer(renderer);
        composer.setSize(window.innerWidth, window.innerHeight);
        const renderPass = new RenderPass(scene, cameraInit);
        composer.addPass(renderPass);
        // const outlinePass = configureOutlinePass(window, scene, cameraInit, 18, 2, "#ffffff");
        // composer.addPass(outlinePass);
        const darkOutlinePass = configureOutlinePass(window, scene, cameraInit, 4, 7, 0, modelData[modelIndex].outlineColor);
        composer.addPass( darkOutlinePass);
        let passes = [ darkOutlinePass];
        const outputPass = new OutputPass();
				composer.addPass( outputPass );
				const effectFXAA = new ShaderPass( FXAAShader );
				effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
				composer.addPass( effectFXAA );
        // let outlinePass;
        // let composer;

        loadGLTF(models, modelData, modelList, modelIndex, scene, materials, passes);

        const render = () => {     
          renderer.render(scene, cameraInit);
        }

        const axesHelper = new THREE.AxesHelper(20);
        scene.add(axesHelper);
        // scene.add(cube);
        
        controls = new OrbitControls(cameraInit, renderer.domElement);
        controls.addEventListener('change', render);
        controls.target.set(0, 0, 55);
        controls.minPolarAngle = Math.PI / 3;
        controls.maxPolarAngle = Math.PI ;
        controls.minAzimuthAngle = - Math.PI / 4;
        controls.maxAzimuthAngle = Math.PI * 7 / 8;
        controls.maxZoom = 25;
        controls.minZoom = 10;
        // controls.enablePan = true;
        // controls.panSpeed = 1.0;
	      controls.screenSpacePanning = true; 
        
        controls.enableZoom = true;
        
        // controls.autoRotate = true;
        
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
          composer && composer.render();
        }
        
        animate();
        return () => myRef.current && myRef.current.removeChild(renderer.domElement);
      }, []);
      
    React.useEffect(() => {
      // console.log(pointLight);

      lights.forEach((elem) =>(updateLight(elem, brightness)));
    }, [brightness])

    const updateLight = (light, brightness) => {
      light.intensity = brightness;
      light.updateMatrix();
      light.updateMatrixWorld();
    }

    const loadTextures = (modelData, modelIndex) => {
      let texturePaths = modelData[modelIndex].textures;
      let texLoader = new THREE.TextureLoader();
      let materials = [];

      texturePaths.forEach((texPath) => {
        let texture = texLoader.load(getImage(`./${texPath}`));
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        materials.push(new THREE.MeshStandardMaterial({map: texture, metalness:0, specular:0}));
        texture.dispose();
      });
      return materials;
    }

    const configureOutlinePass = (window, scene, cameraInit, edgeThickness, edgeStrength, edgeGlow, color) => {
      const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, cameraInit);
      outlinePass.enabled = true; // not enough to disable because the other passes will make a normal looking render
      outlinePass.edgeThickness = edgeThickness ? edgeThickness : 10;
      outlinePass.edgeStrength = edgeStrength ? edgeStrength : 1;//150
      outlinePass.visibleEdgeColor.set(color ? color : "#ffffff");//"#661a23");//"#30090e"); 
      outlinePass.edgeGlow = edgeGlow ? edgeGlow: 0;
      return outlinePass;
    }

    // React.useEffect(() => {
    //   // setZoom(zoom);
    //   if(camera) {
    //     camera.updateProjectionMatrix();
    //     camera.zoom = zoom;
    //     console.log(camera);
    //   }
    // }, [zoom])

    // React.useEffect(() => {
    // // setZoom(zoom);
    // console.log(controls);
    // console.log(target);
    // console.log(targetVec);
    // setTargetVec(new THREE.Vector3(0,0,target));
    // }, [target])
    const setZPosition = (num) => {
      // console.log(model)
      modelShown.position.z = num;
      camera.updateProjectionMatrix();
    };

    function findBody(list) {
      for (var i in list) {
        if(list[i].name.includes('body'))
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
    const loadGLTF = (models, modelData, list, modelIndex, scene, materials, passes) => {
      const path = `./${modelData[modelIndex].files}`
      console.log(path);
      let loader = new GLTFLoader();
      // console.log(modelData[0])
      loader.load( models[path].default , function ( loadedGLTF ) {
      // loader.load( models["./urban-10-new-export.loadedGLTF"].default , function ( loadedGLTF ) {
        loadedGLTF.name = path
        let fullModel = loadedGLTF.scene.children[0];
        console.log('in full model');
        console.log(fullModel);
        setModelShown(fullModel);
        let body = findBody(loadedGLTF.scene.children);

        console.log(body);
        materials.forEach((material, index) => {
          if(body.isGroup)
            body.children[index].material = material;
          else
            body.material = material;
        });

        // console.log(fullModel);
        // console.log(body);
        // body.material.metalness = 0;
        // body.children[0].material.metalness = 0;
        // body.children[1].material.metalness = 0;
        if(passes)
          passes.forEach((pass) => pass.selectedObjects.push(fullModel));
        // secondOutline.selectedObjects.push(fullModel);
        fullModel.traverse((child) =>  {
          if (child.isMesh) {
            // child.material.emissive = 1;
            // child.material.roughness = 1;
            child.material.specular = 1;
            child.material.metalness = 0;
            // child.scale.set(20,20,20);
          }
        })
        // body.scale.set(20,20,20);
        // fullModel.scale.set(20,20,20);

        let scale = 40
        fullModel.scale.set(scale, scale, scale);
        fullModel.position.set(...modelData[0].position);
        fullModel.rotation.set(...modelData[0].rotation);

        // loadedGLTF.scene.children[0].children[3].children[0].material = material;
        scene.add( loadedGLTF.scene );
        return fullModel;
      }, undefined, function ( error ) {
        console.error( error );
      } );
    }

    const loadFBX = (loader, models, modelData, list, modelIndex, material, scene) => {
      const path = `./${modelData[0].files}`
      // console.log(path);
      // console.log(models);
      // console.log(models[path].default)
      
      loader.load( models["./urban-10-new-export.fbx"].default , function ( fbx ) {
      // loader.load( models["./urban-10-new-export.fbx"].default , function ( fbx ) {
        fbx.name = path
        // console.log(fbx);
        // fbx.rotation.set(...modelData[0].rotations);
        // fbx.position.set(...modelData[0].positions);
        fbx.scale.set(0.1, 0.1, 0.1);
        fbx.children[0].material = material;
        scene.add( fbx );
      }, undefined, function ( error ) {
        console.error( error );
      } );
    }
    const trackStyle={ height: 10 }
    const  handleStyle={
          // borderColor: 'blue',
          height: 28,
          width: 28,
          marginLeft: 0,
          marginTop: -10,
          // backgroundColor: 'black',
        }
    const railStyle={ height: 10 }

    const changeModelIndex = (num) => {
      setModelIndex(num);
      // console.log('in model shown', modelIndex,modelList.length, num);
      modelList.forEach((modelGroup, index) => {
          modelGroup.forEach((model) => {
          if (index == num) {
              scene.add(model)
            } else {
              scene.remove(model)
            }
      })})
    }
      return (
        <div className='threegallery'>
        <div className='threegallery--slider-grid'>
        <h1 className='threegallery--title'>{modelData[modelIndex].name}</h1>
        <div style={{display:'flex', flexDirection:'column'}}>
        <div className='threegallery--desc'> <b>scroll</b> to zoom</div>
        <div className='threegallery--desc'> <b>drag</b> to orbit</div>
        </div>
        <div className='threegallery--slider-div' style={{gridRow:'1 / span 1'}}>
        <div className='threegallery--slider-title' >Brightness</div>
        <Slider trackStyle={trackStyle} handleStyle={handleStyle} railStyle={railStyle} onChange={setBrightness} defaultValue={2} min={1} max={4} step={0.25} />
        </div>
        <div className='threegallery--slider-div' style={{gridRow:'2 / span 1'}}>
        <div className='threegallery--slider-title' >Position</div>
          <Slider trackStyle={trackStyle} handleStyle={handleStyle} railStyle={railStyle} onChange={setZPosition} defaultValue = {0} min={-5} max={45} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button disabled className={'threegallery--button'} onClick={() =>
            modelIndex > 0 && changeModelIndex(modelIndex - 1)}>Prev</button> {' '}
          <button disabled className={'threegallery--button'} onClick={() => 
            modelIndex < modelList.length - 1 && changeModelIndex(modelIndex + 1)}>Next Model</button>
        </div>
        </div>
        <MediaQuery minWidth={1224}>
          {(smallWidth) => (
            <div style={smallWidth ? 
              { width: '50vw', height: '30vw' } : 
              { width: '100vw', height: '100vw' }} 
              ref={myRef} />
          )}
        </MediaQuery>
      </div>
    );
}
export default ModelViewer;