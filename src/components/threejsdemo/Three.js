import React, { Component } from 'react';
import * as THREE from 'three';
// demo from https://medium.com/@colesayershapiro/using-three-js-in-react-6cb71e87bdf4
// import {ThreeMFLoader} from './3MFLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


// import {ThreeMFLoader} from './3MFLoader2'
import model from '../../models/lamp-base-1.3mf'

//https://github.com/technohippy/3MFLoader/blob/master/app/index.html

const models = {}

function importAll(r) {
  r.keys().forEach((key) => models[key] = r(key));
}

importAll(require.context('../../models/', false, /\.(3mf)$/));

export default class ThreeScene extends Component{

  componentDidMount(){
    this.translation = 0; 
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 25, width / height, 120, 200)
    this.camera.up.set(0,0,1);
    // this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

    this.pointLight = new THREE.PointLight( 0xffffff, 0.6 );
    this.pointLight.position.set( 80, 90, 200 );
    this.scene.add( this.pointLight );
    this.scene.add( new THREE.AmbientLight( 0xffffff, 0.6 ) );

    this.camera.position.set( 80, 80, 150 );
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#999999')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    this.object3mf = {}
    let loader = new ThreeMFLoader();
    // loader.addExtension( ThreeMFLoader.MaterialsAndPropertiesExtension );
    loader.load(models['./lamp-base-1.3mf'].default, ( object3mf ) => {
      console.log(object3mf)
      this.object3mf = object3mf;
      this.object3mf.children[0].children[0].material=new THREE.MeshDepthMaterial();
      this.scene.add( this.object3mf);
    }, undefined, function ( error ) {
      console.error( error );
    } );

    let controls = new OrbitControls( this.camera, this.renderer.domElement );
    controls.addEventListener( 'change', this.render );
    controls.target.set( 0, 0, 0 );
    controls.update();

    this.start()
  }

componentWillUnmount(){
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
   this.cube.rotation.x += 0.01
   this.cube.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }

renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}

setTranslation = (num) => {
  this.translation = num;
  this.object3mf.position.z = num;
  // console.log(this.translation);
}

render(){

    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      >
        <Slider onChange={this.setTranslation}/>
        </div>
    )
  }
}