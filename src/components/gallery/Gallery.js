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
    const images = [
        {path: "./art1.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art2.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art4.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art5.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art6.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art7.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art8.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art9.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art10.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
        {path: "./art11.jpg", backgroundSize:"120%", backgroundPosition:"-5% -10%"},
    ]

    const handleScroll = () => {
        setShrinkHeader(galleryRef.current.scrollTop > 50) ;
    };
    console.log(`${getImage("./art2.jpg")}`);

    return (
        <div ref = {galleryRef} onScroll={handleScroll} style={{display:"flex", flexDirection:"row", justifyContent:"center", height:"90vh"}}>
        <div style={{display:"grid", width:"70vw", gridTemplateColumns: "repeat(3, 1fr)",
            margin:"0", gap: "5px", padding:"20px 30px 20px 30px", justifyContent: "space-evenly",
            gridAutoFlow: "row", height:"auto", overflow:"scroll"}}>
            { images.map((elem) => {
                return <div style={{backgroundImage:`url(${getImage(elem.path)})`, backgroundSize:elem.backgroundSize,
                    ackgroundPosition:elem.backgroundPosition}} className='gallery--image'/>
                })}
        </div>

        </div>
    );
}