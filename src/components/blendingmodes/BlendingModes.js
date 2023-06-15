import React from 'react'
import Slider from 'rc-slider'


export default function BlendingModes(props) {
    const [slider, setSlider] = React.useState(() => 1);
    
    return (
        <div style={props.style}>
          Value:{slider}
          <Slider onChange={setSlider} min={1} max={30} />
        </div>
    )
}