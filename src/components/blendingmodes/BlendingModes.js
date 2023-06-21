import React from 'react'
import Slider from 'rc-slider'
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import {MathJax, MathJaxContext } from 'better-react-mathjax'
import Konva from 'konva';
import { getEntry, getImage } from '../entry/data'
import useImage from 'use-image';


export default function BlendingModes(props) {
  const baseEqn = "\\(f(a,b) = ab";
  const [slider, setSlider] = React.useState(() => 1);
  const [color, setColor] = React.useState('green');
  const [eqn, setEqn] = React.useState(baseEqn + '\\)');
  const [image] = useImage(getImage('./art1.jpg'));
  const imageRef = React.useRef();
  const config = {
    loader: { load: ["input/asciimath"] },
    asciimath: {
      displaystyle: true,
      delimiters: [
        ["$", "$"],
        ["`", "`"]
      ]
    }
  };
  

  React.useEffect( () => {
    let change = slider;
    let colorStr = 'rgb(' + change + ',255,0)';
    setColor(colorStr);
    setEqn(baseEqn + ' test ' + slider + '\\)');
  }, [slider])

  React.useEffect( () => {
    if(image) {
      imageRef.current.cache();
    }
    // return () => {
    //   imageRef.current.cache();
    // }
  // }, )
  }, [image])

  var MultiplyFilter = function (imageData) {
    var nPixels = imageData.data.length;
    for (var i = 3; i < nPixels; i += 4) {
      imageData.data[i] *= slider;
    }
  };
  // lets define a custom filter:
var ColorReplaceFilter = function (imageData) {
  var nPixels = imageData.data.length;
  for (var i = 0; i < nPixels - 4; i += 4) {
    const isDark = imageData.data[i] + imageData.data[i+2] + imageData.data[i+3] < 600;
    if (isDark) {
      imageData.data[i] = 90;
      imageData.data[i + 1] = 149;
      imageData.data[i + 2] = slider;
    }
  }
};

  const ColoredRect = () => {

    const handleClick = () => {
      // setColor(Konva.Util.getRandomColor());
      // setColor(color);
    };

    return (
      <Rect x={0} y={0} width={200} height={80} cornerRadius={5} fillPatternImage={image}
      fillPatternScale={{x:0.3,y:0.3}} fillPatternRepeat='no-repeat' // opacity={(256 - slider)/255}
      //  shadowBlur={5} shadowColor={"#eeeeee"} onClick={handleClick} margin = {10}
      filters={[ColorReplaceFilter]} blurRadius={slider}
      ref={imageRef}
      />
    );
  };
  
  return (
    <div style={props.style}>
      <MathJaxContext config={config}>
      <MathJax >{`$f(a,b) = a * b$`}</MathJax>
        <MathJax inline dynamic>
      <Stage width={200} height={80} >
        <Layer>
          {/* <Image image={image}/> */}
          {/* <Rect x={0} y={0} width={200} height={80} cornerRadius={5} fill={color} shadowBlur={5} shadowColor={"#eeeeee"} margin = {10}/> */}
          <ColoredRect />
        </Layer>
      </Stage>
            <span >{`$f(a,${slider}) = a * ${slider}$`}</span>
          </MathJax>{" "}
      </MathJaxContext>
      <Slider onChange={setSlider} min={1} max={255} step={1}/>
    </div>
  )
}