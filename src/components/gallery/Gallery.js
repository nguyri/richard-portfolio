import React from 'react';
import {getImage} from '../entry/data'
import { useMediaQuery } from 'react-responsive'
import './Gallery.css'
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";

export default function Gallery (props) {
    const imgName = "./art1.jpg"
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const galleryRef = React.useRef();
    const [darkMode, setShrinkHeader] = useOutletContext();

    const handleScroll = () => {
        setShrinkHeader(galleryRef.current.scrollTop > 50) ;
    };
    return (
        <div ref = {galleryRef} onScroll={handleScroll} style={{display:"flex", flexDirection:"row", justifyContent:"center", height:"90vh"}}>
        <div style={{display:"grid", width:"60vw", gridTemplateColumns: "repeat(3, 1fr)",
            margin:"0", gap: "5px", padding:"20px 30px 20px 30px", justifyContent: "space-evenly",
            gridAutoFlow: "row", height:"auto", overflow:"scroll"}}>
            <img src={getImage(imgName)} className='gallery--image' />
            <img src={getImage("./art2.jpg")} className='gallery--image' />
            <img src={getImage("./art3.jpg")} className='gallery--image' />
            <img src={getImage("./art4.jpg")} className='gallery--image' />
            <img src={getImage("./art6.jpg")} className='gallery--image' />
            <img src={getImage("./art7.jpg")} className='gallery--image' />
            <img src={getImage("./art8.jpg")} className='gallery--image' />
            <img src={getImage("./art9.jpg")} className='gallery--image' />
            <img src={getImage("./art10.jpg")} className='gallery--image' />
        </div>

        </div>
    );
}