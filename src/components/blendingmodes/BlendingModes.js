import React from 'react'
import Slider from 'rc-slider'
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import Konva from 'konva';
import { getEntry, getImage } from '../entry/data'
import useImage from 'use-image';
import './BlendingModes.css'

export default function BlendingModes(props) {
  const baseEqn = "\\(f(a,b) = ab";
  const [image] = useImage(getImage('./art1.jpg'));
  const [screenImage] = useImage(getImage('./art2.jpg'));
  const imageRef = React.useRef();
  const screenRef = React.useRef();
  const [slider, setSlider] = React.useState(() => 256);
  const [screenSlider, setScreenSlider] = React.useState(() => 1);
  const [color, setColor] = React.useState('white');
  const [screenColor, setScreenColor] = React.useState('black');
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
  const width = 400, height = 200, heightFraction = 5;
  const formulas = {
    multiply: [`$f(a,b) = a * b//256 = a * hat b$`, `$f(a,\color{${color}}${slider}) = a * \color{${color}} ${((slider) / 256).toFixed(2)}$`],
    screen: [`$f(a,b) = 1 - (1 - a) * (1 - b)$`, `$f(a,\color{${color}}${slider}) = a * \color{${color}} ${((slider) / 256).toFixed(2)}$`]
  }
  var MultiplyFilter = function (imageData) {
    var nPixels = imageData.data.length;
    for (var i = 0; i < nPixels - 4; i += 4) {
      imageData.data[i] *= slider / 256; // red
      imageData.data[i + 1] *= slider / 256; // green
      imageData.data[i + 2] *= slider / 256; // blue
    }
  };
  var ScreenFilter = function (imageData) {
    var nPixels = imageData.data.length;
    for (var i = 0; i < nPixels - 4; i += 4) {
      imageData.data[i] = 256*(1 - (1 - imageData.data[i]/256) * (1 - screenSlider/256)); // red
      imageData.data[i + 1] = 256*(1 - (1 - imageData.data[i + 1]/256) * (1 - screenSlider/256)); // green
      imageData.data[i + 2] =  256*(1 - (1 - imageData.data[i + 2]/256) * (1 - screenSlider/256)); // blue
    }
  };
  const multiply = () => {
    return (
      <Layer >
        {/* <Image image={image}/> */}
        <Rect x={0} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0}
          fillPatternImage={image} fillPatternScale={{ x: 0.4, y: 0.4 }} fillPatternOffsetY={130} />
        <Rect x={height} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0} fill={color} />
        <Rect x={0} y={height / heightFraction} width={width} height={height} cornerRadius={0} fillPatternImage={image}
          fillPatternOffsetY={50} fillPatternScale={{ x: 0.6, y: 0.6 }} fillPatternRepeat='no-repeat'
          //  shadowBlur={5} shadowColor={"#eeeeee"} onClick={handleClick} margin = {10}
          filters={[MultiplyFilter]}
          ref={imageRef} />
      </Layer>
    )
  }
  const screen = () => {
    return (
      <Layer >
        {/* <Image image={image}/> */}
        <Rect x={0} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0}
        fillPatternImage={screenImage} fillPatternScale={{ x: 0.4, y: 0.4 }} fillPatternOffsetY={250} />
      <Rect x={height} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0} fill={color} />
      <Rect x={0} y={height / heightFraction} width={width} height={height} cornerRadius={0} fillPatternImage={screenImage}
        fillPatternOffsetY={150} fillPatternScale={{ x: 0.6, y: 0.6 }} fillPatternRepeat='no-repeat'
        //  shadowBlur={5} shadowColor={"#eeeeee"} onClick={handleClick} margin = {10}
        filters={[ScreenFilter]}
        ref={screenRef} />
      </Layer>
    )
  }


  React.useEffect(() => {
    if (image) {
      imageRef.current.cache();
    }

    let colorStr = `rgb(${slider},${slider},${slider})`;
    // let colorStr = 'blue';
    // console.log(colorStr);
    setColor(colorStr);
  }, [slider, color])

  React.useEffect(() => {
    if (screenImage) {
      screenRef.current.cache();
    }

    let screenColor = `rgb(${slider},${slider},${slider})`;
    // let colorStr = 'blue';
    // console.log(colorStr);
    setColor(screenColor);
  }, [screenSlider, screenColor])

  const layers = {
    multiply: multiply(),
    screen: screen(),
  }

  const sliders = {
    multiply: setSlider,
    screen: setScreenSlider
  }

  const ColoredRect = () => {

    const handleClick = () => {
      // setColor(Konva.Util.getRandomColor());
      // setColor(color);
    };

    return;
  };

  return (
    <div style={props.style}>
      <div style={{ paddingBottom: "0px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <MathJaxContext config={config}>
          <MathJax className="formula">
            <span>{formulas[props.mode][0]}</span>
          </MathJax>
          <div style={{ display: "block", }}>
            <Stage width={width} height={height} cornerRadius={20} style={{ marginTop: "10px", overflow: "hidden", borderRadius: "10px" }}>
              {layers[props.mode]}
            </Stage>
          </div>
          <MathJax inline dynamic className="formula">
            <span >{formulas[props.mode][1]}</span>
          </MathJax>{" "}
        </MathJaxContext>
        <Slider onChange={sliders[props.mode]} min={1} max={255} defaultValue={1} step={1}
          style={{ paddingBlock: '10px', scale: "2", transformOrigin: "left top", width: "25%" }} />
      </div>
    </div>
  )
}