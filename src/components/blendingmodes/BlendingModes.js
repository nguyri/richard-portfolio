import React from 'react'
import Slider from 'rc-slider'


export default function BlendingModes() {
    const [slider, setSlider] = React.useState(() => 1);
    
    return (
        <div style={{ width:"300px"}}>
          Value:{slider}
          <Slider onChange={setSlider} min={1} max={30} />
        </div>
    )
}