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
  const url = 'https://konvajs.github.io/assets/yoda.jpg';
  // const [image] = useImage(url);
  // console.log(getImage('./art1.jpg'));
  const [image] = useImage(getImage('./art1.jpg').default);
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

  const ColoredRect = () => {

    const handleClick = () => {
      // setColor(Konva.Util.getRandomColor());
      // setColor(color);
    };

    return (
      <Rect x={0} y={0} width={200} height={50} cornerRadius={5} fill={color}
       shadowBlur={5} shadowColor={"#eeeeee"} onClick={handleClick} margin = {10}
      />
    );
  };
  
  return (
    <div style={props.style}>
      <MathJaxContext config={config}>
      <MathJax >{`$f(a,b) = a * b$`}</MathJax>
        <MathJax inline dynamic>
      <Stage width={400} height={400} >
        <Layer>
          <Image image={image}/>
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