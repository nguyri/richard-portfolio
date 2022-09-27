import React from 'react'
import { useTexture, Box, shaderMaterial } from '@react-three/drei';
import {extend} from '@react-three/fiber'
import {getImage} from '../entry/data'

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
    uniform sampler2D tex;
    uniform sampler2D disp;
    void main() {
        vec2 uv = vUv;
        // vec4 disp = texture2D(disp, uv);
        gl_FragColor = texture2D(tex, uv);
    }
    `
)
extend({ImageFadeMaterial});

const ImageTransition = () => {
    const img1 = getImage("./addlathe1.jpg");
    const img2 = getImage("./addlathe2.jpg");

    console.log(img1);

    // const [texture1, texture2] = useTexture([img1, img2]);
    const texture1 = useTexture(img1);
    const [hover, setHover] = React.useState(false);

    return  (
        // <Box/>
        <mesh>
            <planeGeometry args={[1, 1, 32, 32]} />
            <imageFadeMaterial tex ={texture1}></imageFadeMaterial>
        </mesh>
    );
}

export default ImageTransition;