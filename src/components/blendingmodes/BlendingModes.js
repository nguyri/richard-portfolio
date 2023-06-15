import React from 'react'
import Slider from 'rc-slider'


export default function BlendingModes() {
    const [slider, setSlider] = React.useState(() => 1);
    return (
        <div>
          <Slider onChange={setSlider} min={1} max={30} />
          Value:{slider}
        </div>
    )
}