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
import { useMediaQuery } from 'react-responsive'

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
      // isTabletOrMobile: useMediaQuery({query: '(max-width: 1224px)'})
    }
  }

  loadThreeMF(loader, modelData, list, modelShown, scene) {
    // loader.addExtension( ThreeMFLoader.MaterialsAndPropertiesExtension );
    // console.log(modelData)
    modelData.forEach((modelGroup, modelIndex) => {
      // console.log(modelGroup)
      let loadedGroup = []
      modelGroup.files.forEach((path, index) => {
        loader.load(models[path].default, (object3mf) => {
          console.log(path);
          loadedGroup.push(object3mf);
          object3mf.position.set(...modelGroup.positions[index])
          object3mf.rotation.set(...modelGroup.rotations[index])
          // object3mf.children[0].children[0].material.color.set(0xAFFFFF)
          // console.log(object3mf.children[0].children[0].material)
          const material = new THREE.MeshPhongMaterial({ flatShading: 'false', color: new THREE.Color(0xafafaf) });
          // material.color='0xefefef'
          object3mf.children[0].children[0].material = material;

          // console.log(object3mf.children[0].children[0].material)

          // object3mf.material=new THREE.MeshStandardMaterial();
          // object3mf.children[0].children[0].material=new THREE.MeshLambertMaterial({color:'0xffffff'});
          if (modelIndex == modelShown)
            scene.add(object3mf);
        }, undefined, function (error) {
          console.error(error);
        }); // loader.load
      }); //modelGroup.files.forEach 
      list.push(loadedGroup);
    })
  }

  changeModelShown = (num) => {
    // console.log('model shown', num)
    this.setState({ modelShown: num })
    // console.log('model shown', this.state.modelShown)
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
    // this.isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 2000)//( 10, width / height, 50, 800)
    // this.camera = new THREE.PerspectiveCamera( 5, width / height, 50, 2000)
    this.camera.zoom = 5.4
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(200, 200, 200);
    this.camera.lookAt(0, 0, 0)
    this.camera.updateProjectionMatrix();

    // this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

    this.pointLight = new THREE.PointLight(0xffffff, 0.6);
    this.pointLight.position.set(80, 90, 200);
    this.scene.add(this.pointLight);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));


    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#FFFFFF', 0) //#F9F7F0
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    // const geometry = new THREE.BoxGeometry(10, 10, 10)
    // const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    // this.cube = new THREE.Mesh(geometry, material)
    // this.scene.add(this.cube)

    // this.object3mf = {}
    let loader = new ThreeMFLoader();
    this.modelList = [];
    this.loadThreeMF(loader, modelData, this.modelList, this.state.modelShown, this.scene)
    console.log(this.modelList)

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
    //  this.cube.rotation.x += 0.01
    //  this.cube.rotation.y += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
    // console.log( this.camera.zoom, this.camera.getWorldPosition(new THREE.Vector3(0,0,0)))
  }

  setTranslation = (num) => {
    this.unitArray = []
    for (var i = this.modelList[this.state.modelShown].length - 1; i >= 0; i--) {
      let step = 2 / (this.modelList[this.state.modelShown].length - 1)
      this.unitArray.push(step * i - 1)
    }
    // console.log(this.modelList, this.state.modelShown)
    this.modelList[this.state.modelShown].forEach((model, index) => {
      model.position.z = modelData[this.state.modelShown].positions[index][2] + num * this.unitArray[index]
      // if(index == 0)
      //   console.log(model.position.z)
    })
    this.camera.zoom = 5.4 - num / 20;
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
        <div
          // style={this.state.isTabletOrMobile() ? { width: '100vw', height: '100vw' } : { width: '30vw', height: '30vw' } }
          style = {{ width: '30vw', height: '30vw' }}
          ref={(mount) => { 
            // this.mount.props.children[0].className='threescene-scene'
            this.mount = mount; }}
        >
        </div>
      </div>
    )
  }
}