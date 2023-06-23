import React, { Component, useEffect } from 'react';
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

export default class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelShown: 0,
      zoom: props.zoom,
    }
    // console.log('zoom',this.state.zoom)
  }

  loadThreeMF(loader, modelData, list, modelShown, scene) {
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
          // const geo = new THREE.EdgesGeometry( object3mf.children[0].children[0].geometry );
          // const mat = new THREE.LineBasicMaterial({ color:'black', linewidth: 1 });
          // const wireframe = new THREE.LineSegments(geo, mat);
          // object3mf.children[0].children[0].add(wireframe);
          if (modelIndex == modelShown) {
            scene.add(object3mf);
          }
        }, undefined, function (error) {
          console.error("loader error" + error);
        }); // loader.load
      }); //modelGroup.files.forEach

      list.push(loadedGroup);

    })
  }

  changeModelShown = (num) => {
    this.setState({ modelShown: num })
    this.modelList.forEach((modelGroup, index) => {
      modelGroup.forEach((model) => {
        if (index == num) {
          this.scene.add(model)
        } else {
          this.scene.remove(model)
        }
      })
    })
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 2000)//( 10, width / height, 50, 800)
    // this.camera = new THREE.PerspectiveCamera( 5, width / height, 50, 2000)
    this.camera.zoom = this.state.zoom
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(200, 200, 200);
    this.camera.lookAt(0, 0, 0)
    this.camera.updateProjectionMatrix();

    // this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

    this.pointLight = new THREE.PointLight(0xffffff, 0.6);
    this.pointLight.position.set(80, 90, 200);
    this.scene.add(this.pointLight);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#FFFFFF', 0) //#F9F7F0
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    let loader = new ThreeMFLoader();
    this.modelList = [];
    this.loadThreeMF(loader, modelData, this.modelList, this.state.modelShown, this.scene)

    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', this.render);
    controls.target.set(20, 0, 0);
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = controls.minPolarAngle;
    controls.minAzimuthAngle = Math.PI / 8;
    controls.maxAzimuthAngle = Math.PI * 7 / 8;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.update();

    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  setTranslation = (num) => {
    this.unitArray = []
    for (var i = this.modelList[this.state.modelShown].length - 1; i >= 0; i--) {
      let step = 2 / (this.modelList[this.state.modelShown].length - 1)
      this.unitArray.push(step * i - 1)
    }
    this.modelList[this.state.modelShown].forEach((model, index) => {
      model.position.z = modelData[this.state.modelShown].positions[index][2] + num * this.unitArray[index]
      // if(index == 0)
      //   console.log(model.position.z)
    })
    this.camera.zoom = this.state.zoom - num / 20;
    this.camera.updateProjectionMatrix();
  }

  render() {
    return (
      <div className='threescene--div'>
        <h1 className='threescene--title'>{this.state && modelData[this.state.modelShown].name}</h1>
        <div className='threescene--slider-div'>
          <Slider onChange={this.setTranslation} min={1} max={30} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="primary" size='lg' className={'threescene--button'} onClick={() =>
            this.state.modelShown > 0 && this.changeModelShown(this.state.modelShown - 1)}>Prev</Button> {' '}
          <Button variant="primary" size='lg' className={'threescene--button'} onClick={() =>
            this.state.modelShown < this.modelList.length - 1 && this.changeModelShown(this.state.modelShown + 1)}>Next Model</Button>
        </div>
        <MediaQuery minWidth={1224} >
          {(matches) => 
          matches ? 
          <div
            style = {{ width: '30vw', height: '30vw' }}
            ref={(mount) => { this.mount = mount; }} >
          </div> : 
          <div
            style = {{ width: '100vw', height: '100vw' }}
            ref={(mount) => { this.mount = mount; }} >
          </div>
          } 
        </MediaQuery>
      </div>
    )
  }
}