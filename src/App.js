import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import * as THREE from "three";
import UploadFile from './UploadFile';
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';

const App = () => {

  const [toggle, setToggle] = useState(false);

  const [files, setFiles] = useState(); 

  const onSuccess = (savedFile) => {
    console.log(savedFile.filename);
    setFiles(savedFile.filename);
    
  };

  const WireFrameToggle = (value) => {
    console.log('test');
    if(toggle === true){
      setToggle(false)
    } else if(toggle === false){
      setToggle(true);
    }
    console.log(toggle);
  }

  const mountRef = useRef(null);

  useEffect(() => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 0.1, 1000 );
  // const canvas = document.getElementById('ThreeJsCanvas')
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  mountRef.current.appendChild( renderer.domElement );
 

  // Adding Orbital Controls
  const controls = new OrbitControls( camera, renderer.domElement );
  camera.position.set( 0, 20, 100 );
  controls.update();

  //Adding Box


  // Adding Light
  const ambient =  new THREE.AmbientLight( 0xffffff );
  scene.add(ambient);
  const loader = new OBJLoader();
  camera.position.z = 10;

  //Adding Object

  loader.load(
    // resource URL
    // `//localhost:3000/${files.filename}`,
//    Code to change files (!files?'bag.obj': `//localhost:3000/${files}`),
    
    'bag.obj',
   
    // onLoad callback
    // Here the loaded data is assumed to be an object
    function ( obj ) {
      // Add the loaded object to the scene
        console.log(obj);
        obj.children[0].material.wireframe = toggle;
        scene.add(obj)
    },

    // onProgress callback
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },

    // onError callback
    function ( err ) {
      console.error( 'An error happened' );
    }
  );


  
  // Animate Function

  var animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
  };
  animate();

  return () => mountRef.current.removeChild( renderer.domElement);
}, [toggle, files])

  return (

    <div ref={mountRef} >
      <div className='h-3/6 absolute w-3/6 bottom-0' >
      <UploadFile onSuccess={onSuccess} />
      <button className='bg-white absolute bottom-8'onClick={WireFrameToggle}>WireFrame Toggle</button>
      </div>

    </div>
  )
}

export default App;
