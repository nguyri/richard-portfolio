import React from 'react'
import { useTexture, Box, shaderMaterial, axesHelper } from '@react-three/drei';
import { extend, Canvas } from '@react-three/fiber'
import { getImage } from '../entry/data'


const ImageFadeMaterial =
shaderMaterial (
    {tex1:undefined},
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    ` varying vec2 vUv;
    uniform sampler2D tex1;
    uniform sampler2D disp;
    void main() {
        vec2 uv = vUv;
        // vec4 disp = texture2D(disp, uv);
        gl_FragColor = texture2D(tex1, uv);
    }
    `
)
extend({ImageFadeMaterial});

const ImageTransition = () => {
    const img1 = getImage("./addlathe1.jpg");
    const img2 = getImage("./addlathe2.jpg");
    // console.log(img1.default);
    // const colorMap = useLoader(TextureLoader, img1.default)

    // const [texture1, texture2] = useTexture([img1, img2]);
    const texture1 = useTexture(img1.default);
    const [hover, setHover] = React.useState(false);

    return  (
            <mesh>
                <planeGeometry args={[1, 1, 32, 32]} />
                <imageFadeMaterial tex1={texture1}></imageFadeMaterial>
            </mesh>

        // <div>
        // <Canvas>
        //     <mesh>
        //         <planeGeometry args={[1, 1, 32, 32]} />
        //         <imageFadeMaterial tex1={texture1}></imageFadeMaterial>
        //     </mesh>
        //     <axesHelper/>
        // </Canvas>
        // </div>
    );
}

const ImageTransitionCanvas = () => {
    return (
        <div className={"threefiber--div"}>
        <Canvas camera={{ fov: 45, position: [1.0, 1.8, 1.0] }}>
            {/* <axesHelper/> */}
            <ImageTransition/>
        </Canvas>           
        </div>
    );
}

export default ImageTransitionCanvas;
// export default ImageTransition;
