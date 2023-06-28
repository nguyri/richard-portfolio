import React from 'react';
import {getImage} from '../entry/data'
import Slider from 'rc-slider'
import './Gallery.css'
import {ProgressBar} from './ProgressBar';

export function ImageDetail (props) {
    // console.log(props);
    const [slider, setSlider] = React.useState(1);
    const sliderRef = React.useRef();
    const elem = props.props;
    const slideshow = elem.slideshowEnabled ? 
        slider > 1 && slider < elem.lastSlideNum ? 
            elem.path.slice(0, -4) + '-' + slider  + elem.path.slice(-4) : elem.path : elem.path
    console.log(slideshow);
    // console.log(getImage(slideshow));

    const handleScroll = (event) => {
        // console.log('scrolling' + event.currentTarget.scrollTop, event.currentTarget.scrollHeight, event.currentTarget.clientHeight);
        // console.log(event.currentTarget);
        let num = map_range(event.currentTarget.scrollTop, 0, 
            event.currentTarget.scrollHeight - event.currentTarget.clientHeight, 1, elem.lastSlideNum);
        // console.log(event.currentTarget.scrollTop, num);
        // console.log('setting slider to: ' + Math.ceil(num));
        setSlider((Math.ceil(num)));
    }

    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    return (
        <div style={{gridColumn:"span 3", height:"80vh", position:"relative", gridRow:`${elem.row} / span 1`}}>
        {elem.slideshowEnabled && <ProgressBar slider={slider} lastSlideNum={elem.lastSlideNum}/>}
        <div key={elem.id} style={{backgroundImage:`url(${getImage(slideshow)})`, backgroundSize:elem.detailSize,
            backgroundPosition:elem.detailPosition}} onClick={elem.handleClick} className={elem.className}
            onScroll={event => handleScroll(event)} >
            <div style={{height:elem.slideshowEnabled ? "180vh": "auto"}} onScroll={handleScroll} className="gallery--slideshow" />
        </div>
        {/* <Slider ref={sliderRef} onChange={setSlider} min={1} max={18}  step={1}/> */}
        </div>
    );
}

export function Image (props) {
    // console.log(props);
    const elem = props.props;
    return (
        <div key={elem.id} style={{backgroundImage:`url(${getImage(elem.path)})`, backgroundSize:elem.backgroundSize,
            backgroundPosition:elem.backgroundPosition, gridRow:`span 1`}} onClick={elem.handleClick} className={elem.className}>

        {/* // backgroundPosition:elem.backgroundPosition, gridRow:`${elem.row} / span 1`}} onClick={elem.handleClick} className={elem.className}> */}
        </div>
    );
}