import React from 'react';
import {getImage} from '../entry/data'
import './Gallery.css'

export function ImageDetail (props) {
    // console.log(props);
    const elem = props.props;
    return (
        <div key={elem.id} style={{backgroundImage:`url(${getImage(elem.path)})`, backgroundSize:elem.detailSize,
            backgroundPosition:elem.detailPosition, gridRow:`${elem.row} / span 1`}} onClick={elem.handleClick} className={elem.className}>
        </div>
    );
}

export function Image (props) {
    // console.log(props);
    const elem = props.props;
    return (
        <div key={elem.id} style={{backgroundImage:`url(${getImage(elem.path)})`, backgroundSize:elem.backgroundSize,
            backgroundPosition:elem.backgroundPosition, gridRow:`${elem.row} / span 1`}} onClick={elem.handleClick} className={elem.className}>
        </div>
    );
}