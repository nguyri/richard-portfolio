import React from 'react'
import Slider from 'rc-slider'
import { Stage, Layer, Rect, Circle, Text, Image } from 'react-konva';
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import Konva from 'konva';
import { getEntry, getImage } from '../entry/data'
import useImage from 'use-image';
import './BlendingModes.css'

export default function BlendingModes(props) {
  const [slider, setSlider] = React.useState(() => 128);
  let color = `rgb(${slider},${slider},${slider})`;
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
  var OverlayFilter = function (imageData) {
    var nPixels = imageData.data.length;
    for (var i = 0; i < nPixels - 4; i += 4) {
      // let r = imageData.data[i], g = imageData.data[i + 1], b = imageData.data[i + 2];
      if (slider < 128) {
        imageData.data[i] *= ( slider + 128 ) / 256; // red
        imageData.data[i + 1] *= ( slider + 128 ) / 256; // green
        imageData.data[i + 2] *= ( slider + 128 ) / 256; // blue
      } else {
        imageData.data[i] = 256 * (1 - (1 - imageData.data[i]/256) * (1 - ( slider - 128 ) /256));
        imageData.data[i + 1] = 256 * (1 - (1 - imageData.data[i + 1]/256) * (1 - ( slider - 128 ) /256));
        imageData.data[i + 2] = 256 * (1 - (1 - imageData.data[i + 2]/256) * (1 - ( slider - 128 ) /256));
      }
    }
  };
  var DodgeFilter = function (imageData) {
    var nPixels = imageData.data.length;
    for (var i = 0; i < nPixels - 4; i += 4) {
      imageData.data[i] /= (1 - slider/256) ; // red
      imageData.data[i + 1] /= (1 - slider/256) ; // green
      imageData.data[i + 2] /= (1 - slider/256) ; // blue
    }
  };
  const modes = {
    multiply: {
      image: './art1.jpg',
      origPatternOffsetX: 1300,
      origPatternOffsetY: 700,
      filtPatternOffsetY: 50,
      sliderReverse: true,
      sliderDefault: 256,
      staticFormula:`$f(a,b) = a * b//256 = a * hat b$`,
      dynamicFormula:`$f(a,\color{${color}}${slider}) = a * \color{${color}} ${((slider) / 256).toFixed(2)}$`,
      filter: MultiplyFilter
    },
    screen: {
      image: './art2.jpg',
      origPatternOffsetX: 1200,
      origPatternOffsetY: 1500,
      filtPatternOffsetY: 800,
      sliderReverse:false,
      sliderDefault:1,
      staticFormula: `$f(a,b) = 1 - (1 - a) * (1 - hat b)$`,
      dynamicFormula: `$f(a,\color{${color}}${slider}) = a * \color{${color}} ${((slider) / 256).toFixed(2)}$`,    
      filter: ScreenFilter
    },
    overlay: {
      image: './art4.jpg',
      origPatternOffsetX: 1520,
      origPatternOffsetY: 600,
      filtPatternOffsetY: 80,
      sliderReverse:false,
      sliderDefault:128,
      staticFormula:`$f(a,b) = {(text(screen), hat b > 0.5), (text(multiply), hat b < 0.5):}$`,
      // staticFormula: `$f(a,b) = {(a hat b, hat b > 0.5), (1 - (1 - a) * (1 - hat b), hat b < 0.5):}$`,
      dynamicFormula: `$f(a,\color{${color}}${slider}) = a * \color{${color}} ${((slider) / 256).toFixed(2)}$`,    
      filter: OverlayFilter
    },
    dodge: {
      image: './art6.jpg',
      origPatternOffsetX: 1500,
      origPatternOffsetY: 500,
      filtPatternOffsetY: 40,
      sliderReverse:false,
      sliderDefault:1,
      staticFormula: `$f(a,b) = a / ( 1 - hat b ) $`,
      dynamicFormula: `$f(a,\color{${color}}${slider}) = a * \color{${color}} ${((slider) / 256).toFixed(2)}$`,    
      filter: DodgeFilter
    },
  }
  const [image] = useImage(getImage(modes[props.mode].image));
  const imageRef = React.useRef();
  const layerRef = React.useRef();
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
  const width = 400, height = 200, heightFraction = 5, radius = 30;

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
        <Rect x={0} y={0} width={width} height={height} cornerRadius={0} fillPatternImage={image}
          fillPatternOffsetY={modes[props.mode].filtPatternOffsetY} fillPatternScale={{ x: 0.13, y: 0.13 }} fillPatternRepeat='no-repeat'
          filters={[modes[props.mode].filter]}
          ref={imageRef}
          />
        <Circle x={width - radius*1.5} y={radius*1.5} radius={radius} stroke={'grey'} strokeWidth={0.5} 
          fillPatternImage={image} fillPatternScale={{ x: 0.08, y: 0.08 }} fillPatternOffsetY={modes[props.mode].origPatternOffsetY} fillPatternOffsetX={modes[props.mode].origPatternOffsetX} />
        <Circle x={width - radius*1.5} y={radius*4} radius={radius} stroke={'grey'} strokeWidth={0.5} 
          fill={`rgb(${slider},${slider},${slider})`} />
      </Layer>
    )
  }

  return (
    <div style={props.style}>
      <div style={{ paddingBottom: "0px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems:"flex-start" }}>
        <MathJaxContext config={config}>
          <MathJax className={props.darkMode ? "formula dark" : "formula"}>
            <span>{modes[props.mode].staticFormula}</span>
          </MathJax>
          <div style={{ display: "block", }}>
            <Stage width={width} height={height} cornerRadius={20} style={{ marginTop: "10px", overflow: "hidden", borderRadius: "10px" }}>
              <BlendingLayer/>
            </Stage>
          </div>
          <MathJax inline dynamic className={props.darkMode ? "formula dark" : "formula"}>
            <span >{modes[props.mode].dynamicFormula}</span>
          </MathJax>{" "}
        </MathJaxContext>
        <Slider onChange={setSlider} min={1} max={255}  step={1}
        reverse={modes[props.mode].sliderReverse} defaultValue={modes[props.mode].sliderDefault} 
         style={{ paddingBlock: '10px', scale: "2", transformOrigin: "left top", width: "25%" }} />
      </div>
    </div>
  )
}