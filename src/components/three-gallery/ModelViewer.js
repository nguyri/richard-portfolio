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

import { getImage } from '../entry/data'

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
  let [modelIndex, setModelIndex] = React.useState(0);
  let [modelShown, setModelShown] = React.useState();
  let [loadedModel, setLoadedModel] = React.useState();
  let [modelList, setModelList] = React.useState([]);
  let [zoom, setZoom] = React.useState(15);
  let [scene, setScene] = React.useState(new THREE.Scene());
  let myRef = React.useRef();
  let [camera, setCamera] = React.useState();
  let [brightness, setBrightness] = React.useState(2);
  let [rimLight] = React.useState(new THREE.PointLight(0xffffff));
  let [dirLight] = React.useState(new THREE.DirectionalLight(0xffffff));
  let [ambientLight] = React.useState(new THREE.AmbientLight(0xffffff, 2));
  let lights = [rimLight, dirLight];
  let controls;
  let [outlinePass, setOutlinePass] = React.useState();
  // let [mixer, setMixer] = React.useState();
  let clock = new THREE.Clock(true);
  let mixer;
  let action;

  const models = {};
  importAll(require.context('../../models/', false, /\.(glb|fbx)$/));

  function importAll(r) {
    r.keys().forEach((key) => models[key] = r(key));
  }

  const setOutline = (loadedModel, outlinePass) => {
    try {
      let outlinedModel = loadedModel.children[0];
      outlinePass.visibleEdgeColor.set(modelData[modelIndex].outlineColor)
      outlinePass.selectedObjects.push(outlinedModel);
    } catch (err) {
      console.error(err);
    }
  }

  // React.useEffect(() => {
  //   if (!loadedModel) return;
  //   try {
  //     let outlinedModel = loadedModel.children[0];
  //     outlinePass.visibleEdgeColor.set(modelData[modelIndex].outlineColor)
  //     outlinePass.selectedObjects.push(outlinedModel);
  //     setMixer(new THREE.AnimationMixer());
  //     console.log('mixer', mixer);

  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [loadedModel]);

  // console.log(models);
  React.useEffect(() => {
    props.shrinkCallback();
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

    // const sphereRadius = 30;
    // const sphereWidthDivisions = 32;
    // const sphereHeightDivisions = 16;
    // const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    // const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
    // const mesh = new THREE.Mesh(sphereGeo, materialClothes);
    // mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    // scene.add(mesh);

    const times = [0, 3, 6];
    const values = [0, 0, 0, 2, 2, 2, 0, 0, 0];
    const positionKF = new THREE.VectorKeyframeTrack(".position", times, values);
    // const clip = new THREE.AnimationClip("idle", -1, positionKF);


    let renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#000000', 0) //#F9F7F0
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height)
    myRef.current.appendChild(renderer.domElement)

    const composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    const renderPass = new RenderPass(scene, cameraInit);
    composer.addPass(renderPass);
    // const outlinePass = configureOutlinePass(window, scene, cameraInit, 18, 2, "#ffffff");
    // composer.addPass(outlinePass);
    const darkOutlinePass = configureOutlinePass(window, scene, cameraInit, 3, 6, 0, modelData[modelIndex].outlineColor);
    composer.addPass(darkOutlinePass);
    setOutlinePass(darkOutlinePass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(effectFXAA);
    // let outlinePass;
    // let composer;
    loadModelIndex(modelIndex, darkOutlinePass);

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
    controls.maxPolarAngle = Math.PI;
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
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    const animate = () => {
      const delta = clock.getDelta();
      mixer && mixer.update(delta);
      // console.log(mixer);
      requestAnimationFrame(animate);
      render();
      composer && composer.render();
    }

    animate();
    return () => myRef.current && myRef.current.removeChild(renderer.domElement);
  }, []);

  React.useEffect(() => {
    // console.log(pointLight);

    lights.forEach((elem) => (updateLight(elem, brightness)));
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
      materials.push(new THREE.MeshStandardMaterial({ map: texture, metalness: 0 }));
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
    outlinePass.edgeGlow = edgeGlow ? edgeGlow : 0;
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
      if (list[i].name.includes('body'))
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
  const loadGLTF = (models, modelData, modelIndex, scene, materials) => {
    return new Promise((resolve, reject) => {
      const path = `./${modelData[modelIndex].files}`;
      let loader = new GLTFLoader();
      loader.load(models[path].default, function (loadedGLTF) {
        loadedGLTF.name = path;
        let fullModel = loadedGLTF.scene;
        setModelShown(fullModel);
        let body = findBody(loadedGLTF.scene.children);

        materials.forEach((material, index) => {
          if (body.isGroup)
            body.children[index].material = material;
          else
            body.material = material;
        });

        fullModel.traverse((child) => {
          if (child.isMesh) {
            child.material.specular = 1;
            child.material.metalness = 0;
          }
        });

        let scale = 40
        console.log(loadedGLTF)
        fullModel.scale.set(scale, scale, scale);
        fullModel.position.set(...modelData[modelIndex].position);
        fullModel.rotation.set(...modelData[modelIndex].rotation);

        scene.add(loadedGLTF.scene);
        // setLoadedModel(loadedGLTF.scene);

        // Resolve the Promise with the loadedGLTF.scene
        resolve(loadedGLTF.scene);
      }, undefined, function (error) {
        console.error(error);
        // Reject the Promise if there's an error
        reject(error);
      });
    });
  };

  const loadGLBAnim = (models, modelData, num) => {
    return new Promise((resolve, reject) => {
      let animPath = `./${modelData[num].animations[0]}`;

      let loader;
      if (animPath.endsWith('glb') || animPath.endsWith('gltf')) { loader = new GLTFLoader();}
      else {throw new Error("animation file is not gltf")}

      loader.load(models[animPath].default, function (anim) {
        anim.name = animPath;
        console.log(anim);
        const clip = anim.animations.at(0);
        resolve(clip);
      }, undefined, function (error) {
        console.error(error);
        reject(error);
      });
    });
  };
  const trackStyle = { height: 10 }
  const handleStyle = {
    // borderColor: 'blue',
    height: 28,
    width: 28,
    marginLeft: 0,
    marginTop: -10,
    // backgroundColor: 'black',
  }
  const railStyle = { height: 10 }

  const loadModelIndex = (num, outlinePass) => {
    scene.remove(loadedModel);
    let materials = loadTextures(modelData, num);
    setModelIndex(num);

    let clip, model;
    loadGLTF(models, modelData, num, scene, materials)
      .then((loadedModel) => {
        console.log("loaded model", loadedModel);
        setLoadedModel(loadedModel);
        setOutline(loadedModel, outlinePass);
        model = loadedModel;
        return loadGLBAnim(models, modelData, num);
      })
      .then((loadedClip) => {
        clip = loadedClip;
        mixer = new THREE.AnimationMixer(model);
        mixer.scale = new THREE.Vector3(40, 40, 40);
        action = mixer.clipAction(clip);
        console.log(clip); // Log the loaded clip
        console.log(mixer);
        console.log(action);
        action.play();
        // setMixer(mixer);
      }).catch((error) => { console.error('Failed to load FBX animation:', error); })
      .catch((error) => { console.log('failed to load gltf model', error) })
  }
  return (
    <div className={props.darkMode ? 'threegallery threegallery--dark' : 'threegallery'}>
      <div className='threegallery--slider-grid'>
        <h1 className='threegallery--title'>{modelData[modelIndex].name}</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='threegallery--desc'> <b>scroll</b> to zoom</div>
          <div className='threegallery--desc'> <b>drag</b> to orbit</div>
        </div>
        <div className='threegallery--slider-div' style={{ gridRow: '1 / span 1' }}>
          <div className='threegallery--slider-title' >Brightness</div>
          <Slider trackStyle={trackStyle} handleStyle={handleStyle} railStyle={railStyle} onChange={setBrightness} defaultValue={2} min={1} max={4} step={0.25} />
        </div>
        <div className='threegallery--slider-div' style={{ gridRow: '2 / span 1' }}>
          <div className='threegallery--slider-title' >Position</div>
          <Slider trackStyle={trackStyle} handleStyle={handleStyle} railStyle={railStyle} onChange={setZPosition} defaultValue={0} min={-5} max={45} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className={'threegallery--button'} onClick={() =>
            modelIndex > 0 && loadModelIndex(modelIndex - 1, outlinePass)}>Prev</button> {' '}
          <button className={'threegallery--button'} onClick={() =>
            modelIndex < modelData.length - 1 && loadModelIndex(modelIndex + 1, outlinePass)}>Next Model</button>
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