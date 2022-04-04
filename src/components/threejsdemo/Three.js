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

  loadThreeMF(loader, paths, list, scene) {
    // loader.addExtension( ThreeMFLoader.MaterialsAndPropertiesExtension );

    paths.forEach( path => {
      loader.load(models[path].default, ( object3mf ) => {
        // console.log(object3mf)
        list.push(object3mf);
        object3mf.children[0].children[0].material=new THREE.MeshDepthMaterial();
        // object3mf.children[0].children[0].material=new THREE.MeshStandardMaterial();
        scene.add(object3mf);
      }, undefined, function ( error ) {
        console.error( error );
      } );
    })

  }


  componentDidMount(){
    this.translation = 0; 
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 25, width / height, 10, 500)
    this.camera.up.set(0,0,1);
    // this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

    this.pointLight = new THREE.PointLight( 0xffffff, 0.6 );
    this.pointLight.position.set( 80, 90, 200 );
    this.scene.add( this.pointLight );
    this.scene.add( new THREE.AmbientLight( 0xffffff, 0.6 ) );

    this.camera.position.set( 106, 132, 84 );
    this.camera.rotation.set(-1.15,0.499, 2.93)
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
    let modelPaths = ['./lamp-base-1.3mf','./lamp-clamp-2.3mf', './lamp-bolt-1.3mf', './lamp-finger-nut-1.3mf']
    this.modelList = []
    this.loadThreeMF(loader, modelPaths, this.modelList, this.scene)

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
  // console.log(this.modelList);
  let unitArray = []
  for(var i = this.modelList.length - 1; i >= 0; i--) {
    let step = 2/(this.modelList.length - 1)
    unitArray.push( step * i - 1)
  }

  console.log(unitArray);
  this.modelList.forEach( (model, index) => {
    model.position.z = num * unitArray[index]
  })
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