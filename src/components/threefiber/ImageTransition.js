import React from 'react'
import { useTexture, Box, shaderMaterial, axesHelper } from '@react-three/drei';
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { getImage } from '../entry/data'


const ImageFadeMaterial =
shaderMaterial (
    {tex1:undefined,
    tex2:undefined,
    disp:undefined,
    dispFactor:0.0},
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    ` varying vec2 vUv;
    uniform sampler2D tex1;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float dispFactor;
    void main() {
        vec2 uv = vUv;
        vec4 _tex1 = texture2D(tex1, uv);
        vec4 _tex2 = texture2D(tex2, uv);
        vec4 finalTexture = mix(_tex1, _tex2, dispFactor);
        gl_FragColor = finalTexture;
    }
    `
)
extend({ImageFadeMaterial});

const ImageTransition = () => {
    const img1 = getImage("./addlathe1.jpg").default;
    const img2 = getImage("./addlathe2.jpg").default;
    const ref = React.useRef();
    // console.log(img1.default);
    // const colorMap = useLoader(TextureLoader, img1.default)

    // const [texture1, texture2] = useTexture([img1, img2]);
    const [texture1, texture2] = useTexture([img1, img2]);
    const [hover, setHover] = React.useState(false);

    useFrame(() => {
        ref.current = hover ? 0.0 : 1.0;
    })

    return  (
        <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <imageFadeMaterial tex1={texture1} tex2={texture2} dispFactor={ref.current}/>
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
