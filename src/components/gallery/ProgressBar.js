import React from 'react';
import {nanoid} from 'nanoid';
import './Gallery.css'

export function Pip (props) {
    return <div className= {props.pip ? " gallery--dot gallery--dot-filled" : "gallery--dot"}/>
}

export function ProgressBar (props) {
    const pips = Array(props.lastSlideNum/2).fill(0);
    pips[Math.floor((props.slider - 1)/2)] = 1;
    // console.log(pips);
    return (
        <div className='gallery--progress-bar'>
            {pips.map((pip) => {
                return <Pip pip={pip} key={nanoid()}/>
            })}
        </div>
    );
}