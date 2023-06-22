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
  function* MultiplyFilter(imageData) {};
  function* ScreenFilter(imageData) {};
  const mode = {
    multiply: {
      image: './art1.jpg',
      filter: MultiplyFilter
    },
    screen: {
      image: './art2.jpg',
      filter: ScreenFilter
    }
  }
  const [image] = useImage(getImage(mode[props.mode].image));
  // const [screenImage] = useImage(getImage(mode[props.mode].image));
  const imageRef = React.useRef();
  // const screenRef = React.useRef();
  const [slider, setSlider] = React.useState(() => 256);
  // const [screenSlider, setScreenSlider] = React.useState(() => 1);
  const [color, setColor] = React.useState('white');
  // const [screenColor, setScreenColor] = React.useState('black');
  const [eqn, setEqn] = React.useState(baseEqn + '\\)');
  const [blur, setBlur] = React.useState(10);
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
  React.useEffect(() => {
    if (image) {
      imageRef.current.cache();
    }
    console.log("in effect")
    // let colorStr = `rgb(${slider},${slider},${slider})`;
    // let colorStr = 'blue';
    // console.log(colorStr);
    // setColor(colorStr);
  // }, [image, slider]);

  }, [image]);

  React.useEffect(() => {
    imageRef.current.cache();
    console.log("updating cache");
  }); // apparently infinite.. but not
  // console.log(mode[props.mode].filter)

  const handleClick = () => {
    console.log(blur);
    setBlur(blur+10
      // , () => {
      //   // recache shape when we updated it
      //   console.log(blur);
      //   imageRef.current.cache();
      //   }
      );
    imageRef.current.cache();
  };

  const BlendingLayer = () => {
    return (
      <Layer >
        <Image x={0} y = {0} width={300} height = {300} image={image} onClick={handleClick} ref={imageRef} blurRadius={blur} filters={[Konva.Filters.Blur]} />
        {/* <Rect x={0} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0}
          fillPatternImage={image} fillPatternScale={{ x: 0.4, y: 0.4 }} fillPatternOffsetY={130} />
        <Rect x={height} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0} fill={color} />
        <Rect x={0} y={height / heightFraction} width={width} height={height} cornerRadius={0} fillPatternImage={image}
          fillPatternOffsetY={50} fillPatternScale={{ x: 0.6, y: 0.6 }} fillPatternRepeat='no-repeat'
          //  shadowBlur={5} shadowColor={"#eeeeee"} onClick={handleClick} margin = {10}
          filters={[Konva.Filters.Blur]}
          blurRadius={blur}
          ref={imageRef} 
          // filters={[mode[props.mode].filter]}
          onClick={handleClick}
          /> */}

      </Layer>
    )
  }
  // const screen = () => {
  //   return (
  //     <Layer >
  //       {/* <Image image={image}/> */}
  //       <Rect x={0} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0}
  //       fillPatternImage={screenImage} fillPatternScale={{ x: 0.4, y: 0.4 }} fillPatternOffsetY={250} />
  //     <Rect x={height} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0} fill={color} />
  //     <Rect x={0} y={height / heightFraction} width={width} height={height} cornerRadius={0} fillPatternImage={image}
  //       fillPatternOffsetY={150} fillPatternScale={{ x: 0.6, y: 0.6 }} fillPatternRepeat='no-repeat'
  //       //  shadowBlur={5} shadowColor={"#eeeeee"} onClick={handleClick} margin = {10}
  //       filters={[ScreenFilter]}
  //       ref={screenRef} />
  //     </Layer>
  //   )
  // }




  // React.useEffect(() => {
  //   if (screenImage) {
  //     screenRef.current.cache();
  //   }

  //   let screenColor = `rgb(${slider},${slider},${slider})`;
  //   // let colorStr = 'blue';
  //   // console.log(colorStr);
  //   setColor(screenColor);
  // }, [screenSlider, screenColor])

  // const sliders = {
  //   multiply: setSlider,
  //   screen: setScreenSlider
  // }

  // const ColoredRect = () => {

  //   const handleClick = () => {
  //     // setColor(Konva.Util.getRandomColor());
  //     // setColor(color);
  //   };

  //   return;
  // };

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