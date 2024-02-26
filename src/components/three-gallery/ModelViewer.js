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
// import model from '../../models/lamp-base-1.3mf'

//https://github.com/technohippy/3MFLoader/blob/master/app/index.html

const ModelViewer = (props) => {
  let myRef = React.useRef();
  let [modelIndex, setModelIndex] = React.useState(0);
  let [modelShown, setModelShown] = React.useState();
  let [loadedModel, setLoadedModel] = React.useState();
  let [modelList, setModelList] = React.useState([]);
  let [zoom, setZoom] = React.useState(20);
  let [scene, setScene] = React.useState(new THREE.Scene());
  let [camera, setCamera] = React.useState();
  let controls;

  let [brightness, setBrightness] = React.useState(3);
  let [rimLight] = React.useState(new THREE.PointLight(0xffffff));
  let [dirLight] = React.useState(new THREE.DirectionalLight(0xffffff));
  let [ambientLight] = React.useState(new THREE.AmbientLight(0xffffff, 2));
  let lights = [rimLight, dirLight];
  let [outlinePassState, setOutlinePassState] = React.useState();

  let clock = new THREE.Clock(true);
  let [playAnim, setPlayAnim] = React.useState(true);
  let [animNum, setAnimNum] = React.useState(0);
  let mixerRef = React.useRef();
  let activeAction;

  const models = {};
  importAll(require.context('../../models/', false, /\.(glb|fbx)$/));

  function importAll(r) {
    r.keys().forEach((key) => models[key] = r(key));
  }

  React.useEffect(() => {
    props.shrinkCallback();
    const width = myRef.current.clientWidth
    const height = myRef.current.clientHeight
    
    const camera = initCamera(width, height, zoom);
    initLights(scene);
    // scene.add(demoSphere(scene));

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#000000', 0); //#F9F7F0
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    myRef.current.appendChild(renderer.domElement)

    const outlinePass = initOutlinePass(window, scene, camera, 2, 4, 0, modelData[modelIndex].outlineColor);
    const composer = initComposer(renderer, width, height, scene, camera, outlinePass)
    loadModelIndex(modelIndex, outlinePass);
    
    // const axesHelper = new THREE.AxesHelper(20);
    // scene.add(axesHelper);
    
    const controls = initControls(camera, renderer);
    
    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize, false);
    
    const render = () => {
      renderer.render(scene, camera);
    }
    controls.addEventListener('change', render);

    const animate = () => {
      const delta = clock.getDelta();
      if (mixerRef.current && mixerRef.current._actions.length) {
        try {
          mixerRef.current.update(delta);
          // const actions = mixerRef.current._actions;
          // const animName = modelData[modelIndex].animations[0];
          // const action = actions.find((action) => action.name == animName)
          // action.play();
          mixerRef.current._actions[0].play();
        } catch (e) {console.error(e)};
      }
      requestAnimationFrame(animate);
      render();
      composer && composer.render();
    }

    animate();
    return () => myRef.current && myRef.current.removeChild(renderer.domElement);
  }, []);

  React.useEffect(() => {
    // console.log('in use effect', mixer);
    // console.log('in use effect', mixerState);
    console.log('in use effect', mixerRef);
  }, [mixerRef])

  React.useEffect(() => {
    // console.log(pointLight);

    lights.forEach((elem) => (updateLight(elem, brightness)));
  }, [brightness])

  const demoSphere = (scene, material) => {
    const sphereRadius = 30;
    const sphereGeo = new THREE.SphereGeometry(30, 32, 16);
    const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }
  const initControls = (camera, renderer) => {
    controls = new OrbitControls(camera, renderer.domElement);
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
    return controls;
  }

  const initComposer = (renderer, width, height, scene, camera, outlinePass) => {
    const composer = new EffectComposer(renderer);
    composer.setSize(width, height);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    // const outlinePass = configureOutlinePass(window, scene, cameraInit, 18, 2, "#ffffff");
    // composer.addPass(outlinePass);
    composer.addPass(outlinePass);
    setOutlinePassState(outlinePass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(effectFXAA);
    return composer;
  }

  const initLights = (scene) => {
    rimLight.position.set(-180, 100, 200);
    dirLight.position.set(200, -90, 200);
    scene.add(dirLight);
    scene.add(rimLight);
    scene.add(ambientLight);
    THREE.ColorManagement.enabled = true;
  }

  const initCamera = (width, height, zoom) => {
    let cameraInit = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 2000)//( 10, width / height, 50, 800)
    // this.cameraInit = new THREE.PerspectiveCameraInit( 5, width / height, 50, 2000)
    cameraInit.zoom = zoom;
    cameraInit.up.set(0, 0, 1);
    cameraInit.position.set(50, -200, 60);
    cameraInit.lookAt(0, 0, 0)
    cameraInit.updateProjectionMatrix();
    setCamera(cameraInit);
    return cameraInit;
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

  const initOutlinePass = (window, scene, cameraInit, edgeThickness, edgeStrength, edgeGlow, color) => {
    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, cameraInit);
    outlinePass.enabled = true; // not enough to disable because the other passes will make a normal looking render
    outlinePass.edgeThickness = edgeThickness ? edgeThickness : 10;
    outlinePass.edgeStrength = edgeStrength ? edgeStrength : 1;//150
    outlinePass.visibleEdgeColor.set(color ? color : "#ffffff");//"#661a23");//"#30090e"); 
    outlinePass.edgeGlow = edgeGlow ? edgeGlow : 0;
    return outlinePass;
  }

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
        // console.log(loadedGLTF)
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

  const loadAnimations = async (model, models, modelData, num) => {
    if(!model) {throw new Error('no model to apply animations')}
    try { 
    // mixer = new THREE.AnimationMixer(model);
    const mixer = new THREE.AnimationMixer(model);
    // console.log('in loaded model', mixer);
    mixer.scale = new THREE.Vector3(40, 40, 40);

    modelData[num].animations.forEach( async (file) => {
      let animPath = `./${file}`;
      let loadedClip = await loadAnimFile(animPath);
      let action = mixer.clipAction(loadedClip);
      action.name = file;
      loadedClip.name = file;
    } )
    mixerRef.current = mixer;
    }
    catch ( err ) { console.error('error loading animations', err); }
  }

  const loadAnimFile = (animPath) => {
    return new Promise((resolve, reject) => {
      let loader;
      if (animPath.endsWith('glb') || animPath.endsWith('gltf')) { loader = new GLTFLoader();}
      else {throw new Error("animation file is not gltf")}

      loader.load(models[animPath].default, function (anim) {
        anim.name = animPath;
        // console.log(anim);
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

  const nextAnim = () => {
    const actions = mixerRef.current._actions;
    mixerRef.current.stopAllAction();
    let nextNum = ( animNum + 1 )% actions.length;
    setAnimNum(( nextNum ));
    const animName = modelData[modelIndex].animations[nextNum];
    // when I just actions[nextNum].play() it changes the order of actions...
    const action = actions.find((action) => action.name == animName)
    if(action) action.play();
    // console.log('playing:' , nextNum, actions.map((action) => action.name));
  }

  // const playPauseAnim = () => {
  //   const animName = modelData[modelIndex].animations[animNum];
  //   const action = mixerRef.current._actions.find((action) => action.name == animName);
  //   // playAnim ? action.play() : mixerRef.current.stopAllAction();
  //   mixerRef.current._actions.forEach((anim) => anim.stop());
  //   console.log(playAnim);
  //   setPlayAnim(playAnim);
  // }

  const loadModelIndex = (num, outlinePass) => {
    scene.remove(loadedModel);
    let materials = loadTextures(modelData, num);
    setModelIndex(num);
    setAnimNum(0);

    let clip, model;
    loadGLTF(models, modelData, num, scene, materials)
      .then((loadedModel) => {
        console.log("loaded model", loadedModel, 'outline pass', outlinePass);
        setLoadedModel(loadedModel);
        setOutline(loadedModel, outlinePass);
        model = loadedModel;
        loadAnimations(model, models, modelData, num);
      })
      .catch((error) => { console.log('failed to load gltf model', error) })
  }
  return (
    <div className={props.darkMode ? 'threegallery threegallery--dark' : 'threegallery'}>
      <div className='threegallery--slider-grid'>
        <h1 className='threegallery--title'>{modelData[modelIndex].name}</h1>
        <div style={{ display: 'flex', alignItems: 'center' , gridRow: '2 / span 1', gridCol: '1 / span 1'}}>
          <button disabled={modelIndex == 0} className={'threegallery--button'} onClick={() =>
            modelIndex > 0 && loadModelIndex(modelIndex - 1, outlinePassState)}>{modelIndex == modelData.length - 1 ? "Prev Model" : "Prev"}</button> {' '}
          <button disabled={modelIndex == modelData.length - 1} className={'threegallery--button'} onClick={() =>
            modelIndex < modelData.length - 1 && loadModelIndex(modelIndex + 1, outlinePassState)}>{modelIndex == modelData.length - 1 ? "Next" : "Next Model"}</button>
        </div>
        <div className='threegallery--slider-div' style={{ gridRow: '1 / span 1' }}>
          <div className='threegallery--slider-title' >Brightness</div>
          <Slider trackStyle={trackStyle} handleStyle={handleStyle} railStyle={railStyle} onChange={setBrightness} defaultValue={2} min={1} max={4} step={0.25} />
        </div>
        <div className='threegallery--slider-div' style={{ gridRow: '2 / span 1' }}>
          <div className='threegallery--slider-title' >Position</div>
          <Slider trackStyle={trackStyle} handleStyle={handleStyle} railStyle={railStyle} onChange={setZPosition} defaultValue={0} min={-5} max={45} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='threegallery--desc'> <b>scroll</b> to zoom</div>
          <div className='threegallery--desc'> <b>drag</b> to orbit</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' , gridRow: '2 / span 1', gridCol: '1 / span 1'}}>
        <button className={'threegallery--button'} onClick={() =>
            nextAnim() }>Next Anim</button> 
        </div>
      </div>
      <MediaQuery minWidth={1224}>
        {(smallWidth) => (
          <div style={smallWidth ?
            { width: '50vw', height: '50vw' } :
            { width: '100vw', height: '100vw' }}
            ref={myRef} />
        )}
      </MediaQuery>
    </div>
  );
}
export default ModelViewer;