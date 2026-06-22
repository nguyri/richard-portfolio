import React from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva';
import { getImage } from '../entry/data'
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
      staticFormula: 'f(a,b) = a * b / 256 = a * ^ b',
      dynamicFormula: `f(a, ${slider}) = a * ${((slider) / 256).toFixed(2)}`,
      filter: MultiplyFilter
    },
    screen: {
      image: './art2.jpg',
      origPatternOffsetX: 1200,
      origPatternOffsetY: 1500,
      filtPatternOffsetY: 800,
      sliderReverse:false,
      sliderDefault:1,
      staticFormula: 'f(a,b) = 1 - (1 - a) * (1 - b)',
      dynamicFormula: `f(a, ${slider}) = a * ${((slider) / 256).toFixed(2)}`,
      filter: ScreenFilter
    },
    overlay: {
      image: './art4.jpg',
      origPatternOffsetX: 1520,
      origPatternOffsetY: 600,
      filtPatternOffsetY: 80,
      sliderReverse:false,
      sliderDefault:128,
      staticFormula: 'f(a,b) = screen(a,b) if b > 0.5, multiply(a,b) if b < 0.5',
      dynamicFormula: `f(a, ${slider}) = a * ${((slider) / 256).toFixed(2)}`,
      filter: OverlayFilter
    },
    dodge: {
      image: './art6.jpg',
      origPatternOffsetX: 1500,
      origPatternOffsetY: 500,
      filtPatternOffsetY: 40,
      sliderReverse:false,
      sliderDefault:1,
      staticFormula: 'f(a,b) = a / (1 - b)',
      dynamicFormula: `f(a, ${slider}) = a * ${((slider) / 256).toFixed(2)}`,
      filter: DodgeFilter
    },
  }
  const [image, setImage] = React.useState(null);
  const imageRef = React.useRef();
  const layerRef = React.useRef();

  React.useEffect(() => {
    const img = new window.Image();
    img.src = getImage(modes[props.mode].image);
    img.onload = () => {
      setImage(img);
    };
  }, [props.mode]);

  const width = 400, height = 200, heightFraction = 5, radius = 30;
  const sliderDirection = modes[props.mode].sliderReverse ? 'rtl' : 'ltr';

  React.useEffect(() => {
    if (image && imageRef.current) {
      imageRef.current.cache();
    }
  }, [slider, image])


  const BlendingLayer = () => {
    if (!image) return null;
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
        <div className={props.darkMode ? "formula dark" : "formula"}>
          {modes[props.mode].staticFormula}
        </div>
        <div style={{ display: "block", }}>
          <Stage width={width} height={height} cornerRadius={20} style={{ marginTop: "10px", overflow: "hidden", borderRadius: "10px" }}>
            <BlendingLayer/>
          </Stage>
        </div>
        <div className={props.darkMode ? "formula dark" : "formula"}>
          {modes[props.mode].dynamicFormula}
        </div>
        <input
          type="range"
          min={1}
          max={255}
          value={slider}
          onChange={(e) => setSlider(Number(e.target.value))}
          step={1}
          style={{ paddingBlock: '10px', width: "25%", direction: sliderDirection }}
        />
      </div>
    </div>
  )
}