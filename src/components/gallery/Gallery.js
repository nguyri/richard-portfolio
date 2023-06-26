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
        {id:"vest", path: "./art1.jpg", backgroundSize:"110%", backgroundPosition:"20% 0%"},
        {id:"wires",  path: "./art2.jpg", backgroundSize:"200%", backgroundPosition:"40% 40%"},
        {id:"miku",  path: "./art4.jpg", backgroundSize:"170%", backgroundPosition:"45% 5%"},
        {id:"updo",  path: "./art5.jpg", backgroundSize:"140%", backgroundPosition:"50% 50%"},
        {id:"ninja", path: "./art6.jpg", backgroundSize:"150%", backgroundPosition:"50% 00%"},
        // {id:"hot", path: "./art7.jpg", backgroundSize:"250%", backgroundPosition:"50% 50%"},
        {id:"kick",  path: "./art8.jpg", backgroundSize:"120%", backgroundPosition:"40% 20%"},
        {id:"sword",  path: "./art9.jpg", backgroundSize:"120%", backgroundPosition:"50% 50%"},
        {id:"lucy",  path: "./art11.jpg", backgroundSize:"180%", backgroundPosition:"50% 40%"},
        {id:"coat", path: "./art10.jpg", backgroundSize:"160%", backgroundPosition:"50% 20%"},
    ]

    const handleScroll = () => {
        setShrinkHeader(galleryRef.current.scrollTop > 50) ;
    };
    console.log(`${getImage("./art2.jpg")}`);

    return (
        <div ref = {galleryRef} onScroll={handleScroll} style={{display:"flex", flexDirection:"row", justifyContent:"center", height:"90vh"}}>
        <div className="gallery">
            { images.map((elem) => {
                return <div key={elem.id} style={{backgroundImage:`url(${getImage(elem.path)})`, backgroundSize:elem.backgroundSize,
                    backgroundPosition:elem.backgroundPosition}} className='gallery--image'/>
                })}
        </div>

        </div>
    );
}