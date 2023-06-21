import React from 'react'
import Slider from 'rc-slider'
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import Konva from 'konva';
import { getEntry, getImage } from '../entry/data'
import useImage from 'use-image';


export default function BlendingModes(props) {
  const baseEqn = "\\(f(a,b) = ab";
  const [image] = useImage(getImage('./art1.jpg'));
  const imageRef = React.useRef();
  const [slider, setSlider] = React.useState(() => 256);
  const [color, setColor] = React.useState('white');
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

  React.useEffect(() => {
    if (image) {
      imageRef.current.cache();
    }

    let colorStr = `rgb(${slider},${slider},${slider})`;
    // let colorStr = 'blue';
    console.log(colorStr);
    setColor(colorStr);
  }, [slider, color])

  var MultiplyFilter = function (imageData) {
    var nPixels = imageData.data.length;
    for (var i = 0; i < nPixels - 4; i += 4) {
      imageData.data[i] *= slider / 256; // red
      imageData.data[i + 1] *= slider / 256; // green
      imageData.data[i + 2] *= slider / 256; // blue
    }
  };

  const ColoredRect = () => {

    const handleClick = () => {
      // setColor(Konva.Util.getRandomColor());
      // setColor(color);
    };

    return;
  };

  return (
    <div style={props.style}>
      <div style={{ marginBlock: "30px", display: "flex", flexDirection: "column" }}>
        <MathJaxContext config={config}>
          <MathJax style={{ display: "inlineblock", background: "lightgrey", borderRadius: "5px", padding: "8px", marginBlock: "10px", scale: "1.2", transformOrigin: "left top" }}>
            <span style={{ display: "flex", flexDirection: "row" }}>{`$f(a,b) = a * b//256 = a * hat b$`}</span>
          </MathJax>
          <Stage width={width} height={height} cornerRadius={20}>
            <Layer >
              {/* <Image image={image}/> */}
              <Rect x={0} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0}
                fillPatternImage={image} fillPatternScale={{ x: 0.4, y: 0.4 }} fillPatternOffsetY={130} />
              <Rect x={height} y={0} width={width / 2} height={height / heightFraction} cornerRadius={0} fill={color} />
              <Rect x={0} y={height/heightFraction} width={width} height={height} cornerRadius={0} fillPatternImage={image}
                fillPatternOffsetY={50} fillPatternScale={{ x: 0.6, y: 0.6 }} fillPatternRepeat='no-repeat'
                //  shadowBlur={5} shadowColor={"#eeeeee"} onClick={handleClick} margin = {10}
                filters={[MultiplyFilter]}
                ref={imageRef} />
            </Layer>
          </Stage>
          <MathJax inline dynamic style={{ background: "lightgrey", borderRadius: "5px", padding: "8px", marginBlock: "10px", scale: "1.2", transformOrigin: "left top" }}>
            <span >{`$f(a,\color{${color}}${slider}) = a * \color{${color}} ${((slider) / 256).toFixed(2)}$`}</span>
          </MathJax>{" "}
        </MathJaxContext>
        <Slider onChange={setSlider} reverse={true} min={1} max={255} defaultValue={255} step={1} 
        style={{ paddingBlock: '10px', scale: "2", transformOrigin: "left top", width:"25%" }} />
      </div>
    </div>
  )
}