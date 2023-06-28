import React from 'react';
import './Gallery.css'

export function Pip (props) {
    return <div className= {props.pip ? " gallery--dot gallery--dot-filled" : "gallery--dot"}/>
}

export function ProgressBar (props) {
    const pips = Array(10).fill(0);
    pips[5] = 1;
    // console.log(pips);
    return (
        <div className='gallery--progress-bar'>
            {pips.map((pip) => {
                return <Pip pip={pip}/>
            })}
        </div>
    );
}