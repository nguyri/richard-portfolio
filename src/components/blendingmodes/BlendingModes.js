import React from 'react'
import { getImage } from '../entry/data'
import './BlendingModes.css'

export default function BlendingModes(props) {
  const [slider, setSlider] = React.useState(() => 128);

  const modes = {
    multiply: { image: './art1.jpg', sliderReverse: true, sliderDefault: 256, staticFormula: 'f(a,b) = a * b / 256 = a * ^ b' , cssMode: 'multiply'},
    screen: { image: './art2.jpg', sliderReverse: false, sliderDefault: 1, staticFormula: 'f(a,b) = 1 - (1 - a) * (1 - b)', cssMode: 'screen'},
    overlay: { image: './art4.jpg', sliderReverse:false, sliderDefault:128, staticFormula: 'f(a,b) = screen(a,b) if b > 0.5, multiply(a,b) if b < 0.5', cssMode: 'overlay'},
    dodge: { image: './art6.jpg', sliderReverse:false, sliderDefault:1, staticFormula: 'f(a,b) = a / (1 - b)', cssMode: 'color-dodge'},
  }

  React.useEffect(() => {
    // update slider default when mode changes
    const def = modes[props.mode]?.sliderDefault ?? 128;
    setSlider(def > 255 ? 255 : def);
  }, [props.mode]);

  const imgA = getImage(modes[props.mode].image);
  const imgB = getImage(modes[props.mode].image); // original used single image; keep same for now

  const opacity = Math.max(0, Math.min(1, slider / 255));
  const sliderDirection = modes[props.mode].sliderReverse ? 'rtl' : 'ltr';

  return (
    <div style={props.style}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className={props.darkMode ? 'formula dark' : 'formula'}>
          {modes[props.mode].staticFormula}
        </div>
        <div style={{ width: 400, height: 200, marginTop: 10, position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
          <img src={imgA} alt="base" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src={imgB} alt="overlay" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: modes[props.mode].cssMode, opacity: opacity, transition: 'opacity 120ms linear' }} />
        </div>
        <div className={props.darkMode ? 'formula dark' : 'formula'} style={{ marginTop: 8 }}>
          {`f(a, ${slider}) = a * ${((slider) / 256).toFixed(2)}`}
        </div>
        <input
          type="range"
          min={1}
          max={255}
          value={slider}
          onChange={(e) => setSlider(Number(e.target.value))}
          step={1}
          style={{ paddingBlock: '10px', width: '25%', direction: sliderDirection, marginTop: 8 }}
        />
      </div>
    </div>
  )
}