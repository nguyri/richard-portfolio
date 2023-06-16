import React from 'react'
import Slider from 'rc-slider'
import { Stage, Layer, Rect, Text } from 'react-konva';
import {MathJax, MathJaxContext } from 'better-react-mathjax'
import Konva from 'konva';


export default function BlendingModes(props) {
  const baseEqn = "\\(f(a,b) = ab";
  const [slider, setSlider] = React.useState(() => 1);
  const [color, setColor] = React.useState('green');
  const [eqn, setEqn] = React.useState(baseEqn + '\\)');
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
    console.log(eqn);
  }, [slider])

  const ColoredRect = () => {

    const handleClick = () => {
      // setColor(Konva.Util.getRandomColor());
      // setColor(color);
    };

    return (
      <Rect x={0} y={0} width={200} height={50} fill={color} shadowBlur={5} shadowColor={"#cccccc"} onClick={handleClick}
      />
    );
  };
  
  return (
    <div style={props.style}>
      <MathJaxContext config={config}>
        <MathJax inline dynamic>
            An example is the equation <span>{`$${slider}x^4 = 100$`}</span>
          </MathJax>{" "}
      </MathJaxContext>
      <Stage width={200} height={50} >
        <Layer>
          <ColoredRect />
        </Layer>
      </Stage>
      Value:{slider} 
      <Slider onChange={setSlider} min={1} max={255}/>
    </div>
  )
}