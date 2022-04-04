import React, { Component } from 'react';
import * as THREE from 'three';
// demo from https://medium.com/@colesayershapiro/using-three-js-in-react-6cb71e87bdf4
// import {ThreeMFLoader} from './3MFLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

// import {ThreeMFLoader} from './3MFLoader2'
import model from '../../models/lamp-base-1.3mf'

//https://github.com/technohippy/3MFLoader/blob/master/app/index.html

const models = {}

function importAll(r) {
  r.keys().forEach((key) => models[key] = r(key));
}

importAll(require.context('../../models/', false, /\.(3mf)$/));

class ThreeScene extends Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    // this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

    this.pointLight = new THREE.PointLight( 0xffffff, 0.6 );
    this.pointLight.position.set( 80, 90, 150 );
    this.camera.add( this.pointLight );
    // this.scene.add( new THREE.AmbientLight( 0x999999 ) );

    this.camera.position.set( -80, 0, 150 );
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

    // GLTF loader
    // console.log(models)
    // this.loader = new GLTFLoader();
    // this.loader.load(models['./scene.gltf'].default, function ( gltf ) {
    //   //console.log(gltf.scene)
    //   console.log(gltf)
    //   this.scene.add( gltf.scene.default );
    // }, undefined, function ( error ) {
    
    //   console.error( error );
    
    // } );


    this.loader = new ThreeMFLoader();
    this.loader.addExtension( ThreeMFLoader.MaterialsAndPropertiesExtension );
    // this.loader.addExtension( ThreeMFLoader.MaterialsAndPropertiesExtension );
    console.log(models)
    //'./lamp-base-1.3mf'
    this.object3mf = {}
    this.loader.load(models['./dodeca_chain_loop.3mf'].default, ( object3mf ) => {
      // object3mf.material= material
      
      console.log(this.cube)
      this.object3mf = object3mf
      // console.log(this.scene)
      console.log(this.object3mf)
      this.scene.add( this.object3mf);
    }, undefined, function ( error ) {
      console.error( error );
    } );

    // this.loader.load(models['./lamp-base-1.3mf'].default, ( object3mf ) => {
    //   object3mf.material= material
    //   console.log(object3mf)
    //   console.log(this.cube)
    //   // console.log(this.scene)
    //   this.scene.add( object3mf );
    // }, undefined, function ( error ) {
    //   console.error( error );
    // } );

    // var controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    // controls.addEventListener( 'change', this.render );
    // controls.target.set( 80, 65, 35 );
    // controls.update();

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

render(){
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ThreeScene