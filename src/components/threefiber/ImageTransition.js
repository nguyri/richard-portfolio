import React from 'react'
import { useTexture, Box, shaderMaterial, axesHelper } from '@react-three/drei';
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { getImage } from '../entry/data'
import * as THREE from 'three'


const ImageFadeMaterial =
shaderMaterial (
    {tex1:undefined,
    tex2:undefined,
    noise:undefined,
    noise2:undefined,
    dispFactor:0.0,
    u_time:0.0},
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    ` varying vec2 vUv;
    uniform sampler2D tex1;
    uniform sampler2D tex2;
    uniform sampler2D noise;
    uniform sampler2D noise2;
    uniform float u_time;
    uniform float dispFactor;
    void main() {
        vec2 uv = vUv;
        vec4 disp = texture(noise, uv);
        vec4 disp2 = texture(noise2, uv);
        vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*1.0) , uv.y);
        vec2 distortedPosition2 = vec2(uv.x + (1.0 - dispFactor) * (disp.r*1.0) , uv.y);
        vec4 _tex1 = texture(tex1, distortedPosition);
        vec4 _tex2 = texture(tex2, distortedPosition2);
        vec2 _boilPos1 = vec2(uv.x + (sin(u_time * 0.2) + 0.5 ) * 0.3 * (1.0 - dispFactor) * (disp2.r*0.8) , uv.y);
        vec2 _boilPos2 = vec2(uv.x + (sin(u_time * 0.2) + 0.5 ) * 0.3 * (dispFactor) * (disp2.r*0.8) , uv.y);
        vec4 _boilTex1 = texture(tex1, mix(_boilPos1, distortedPosition, dispFactor));
        vec4 _boilTex2 = texture(tex2, mix(_boilPos2, distortedPosition2, (1.0 - dispFactor)));
        vec4 finalTexture = mix(_boilTex1, _boilTex2, dispFactor);
        gl_FragColor = finalTexture;
        #include <tonemapping_fragment>
        #include <encodings_fragment>
    }
    `
)
extend({ImageFadeMaterial});

const ImageTransition = () => {
    const img1 = getImage("./abstract3.jpg");
    const img2 = getImage("./abstract2.jpg");
    const noise = getImage("./noise1.jpg");
    const noise2 = getImage("./noise2.jpg");
    const matRef = React.useRef();
    // console.log(img1);
    // const colorMap = useLoader(TextureLoader, img1)

    // const [texture1, texture2] = useTexture([img1, img2]);
    const [texture1, texture2, noisetex, noisetex2] = useTexture([img1, img2, noise, noise2]);
    const [hover, setHover] = React.useState(false);

    useFrame(({clock}) => {
        matRef.current.dispFactor = THREE.MathUtils.lerp ( matRef.current.dispFactor, hover ? 0.0 : 1.0, 0.025);
        matRef.current.u_time = clock.getElapsedTime();
    })

    return  (
        <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <imageFadeMaterial ref={matRef} tex1={texture1} tex2={texture2} noise={noisetex} noise2={noisetex2}/>
        </mesh>
    );
}

const ImageTransitionCanvas = () => {
    return (
        <div className={"threefiber--div"}>
        <Canvas camera={{ fov: 55, position: [0.0, 0.0, 1.0] }}>
            {/* <axesHelper/> */}
            <ImageTransition/>
        </Canvas>
        </div>
    );
}

export default ImageTransitionCanvas;
// export default ImageTransition;
