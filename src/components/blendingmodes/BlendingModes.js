import React from 'react'
import Slider from 'rc-slider'
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';



export default function BlendingModes(props) {
  const [slider, setSlider] = React.useState(() => 1);
  const [color, setColor] = React.useState('green');

  React.useEffect( () => {
    let change = slider;
    let colorStr = 'rgb(' + change + ',255,0)';
    setColor(colorStr);
  }, [slider])

  const ColoredRect = () => {

    const handleClick = () => {
      // setColor(Konva.Util.getRandomColor());
      // setColor(color);
    };

    return (
      <Rect x={20} y={20} width={50} height={50} fill={color} shadowBlur={5} shadowColor={"#aaaaaa"} onClick={handleClick}
      />
    );
  };

  return (
    <div style={props.style}>
      Value:{slider}
      <Slider onChange={setSlider} min={1} max={255} />
      <Stage width={400} height={100} >
        <Layer>
          <ColoredRect />
        </Layer>
      </Stage>
    </div>
  )
}