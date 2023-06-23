import React from 'react'
import Slider from 'rc-slider'
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import Konva from 'konva';
import { getEntry, getImage } from '../entry/data'
import useImage from 'use-image';
import './BlendingModes.css'

export default function BlendingModes(props) {
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
      imageData.data[i] = 256*(1 - (1 - imageData.data[i]/256) * (1 - slider/256)); // red
      imageData.data[i + 1] = 256*(1 - (1 - imageData.data[i + 1]/256) * (1 - slider/256)); // green
      imageData.data[i + 2] =  256*(1 - (1 - imageData.data[i + 2]/256) * (1 - slider/256)); // blue
    }
  };
  const modes = {
    multiply: {
      image: './art1.jpg',
      origPatternOffsetY: 130,
      filtPatternOffsetY: 50,
      filter: MultiplyFilter
    },
    screen: {
      image: './art2.jpg',
      origPatternOffsetY: 250,
      filtPatternOffsetY: 200,
      filter: ScreenFilter
    }
  }
  const [image] = useImage(getImage(modes[props.mode].image));
  const imageRef = React.useRef();
  const layerRef = React.useRef();
  const [slider, setSlider] = React.useState(() => 256);
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

  React.useEffect(() => {
    if(image){
      imageRef.current.cache();
    }
    // const canvas = layerRef.current.getCanvas()._canvas;
    // canvas.style.filter = `brightness(${(slider /256) * 100}%)`;

  }, [slider])


  const BlendingLayer = () => {
    return (
      <Layer ref={layerRef}>
           <Rect x={0} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0}
          fillPatternImage={image} fillPatternScale={{ x: 0.4, y: 0.4 }} fillPatternOffsetY={modes[props.mode].origPatternOffsetY} />
        <Rect x={height} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0} fill={`rgb(${slider},${slider},${slider})`} />
        <Rect x={0} y={height / heightFraction} width={width} height={height} cornerRadius={0} fillPatternImage={image}
          fillPatternOffsetY={modes[props.mode].filtPatternOffsetY} fillPatternScale={{ x: 0.6, y: 0.6 }} fillPatternRepeat='no-repeat'
          filters={[modes[props.mode].filter]}
          ref={imageRef}
          />
      </Layer>
    )
  }

  return (
    <div style={props.style}>
      <div style={{ paddingBottom: "0px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <MathJaxContext config={config}>
          <MathJax className="formula">
            <span>{formulas[props.mode][0]}</span>
          </MathJax>
          <div style={{ display: "block", }}>
            <Stage width={width} height={height} cornerRadius={20} style={{ marginTop: "10px", overflow: "hidden", borderRadius: "10px" }}>
              <BlendingLayer/>
            </Stage>
          </div>
          <MathJax inline dynamic className="formula">
            <span >{formulas[props.mode][1]}</span>
          </MathJax>{" "}
        </MathJaxContext>
        <Slider onChange={setSlider} min={1} max={255} defaultValue={1} step={1}
          style={{ paddingBlock: '10px', scale: "2", transformOrigin: "left top", width: "25%" }} />
      </div>
    </div>
  )
}