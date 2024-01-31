import React from 'react';
import {getImage} from '../entry/data'
import { useMediaQuery } from 'react-responsive'
import './ThreeGallery.css'
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";
import ModelViewer from './ModelViewer'

export default function Gallery (props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const galleryRef = React.useRef();
    const [darkMode, setShrinkHeader] = useOutletContext();
    const [expandID, setExpandID] = React.useState(-1);
    const images = [
        {id:"vest", path: "./art1.jpg", backgroundSize:"110%", backgroundPosition:"20% 0%", detailSize:"100%", detailPosition:"50% 20%", slideshowEnabled:true, lastSlideNum: 18, slideshowFlip:false},
        {id:"miku",  path: "./art4.jpg", backgroundSize:"170%", backgroundPosition:"45% 5%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:true, lastSlideNum: 20, slideshowFlip:false},
        {id:"lucy",  path: "./art11.jpg", backgroundSize:"180%", backgroundPosition:"50% 40%", detailSize:"120%", detailPosition:"50% 30%", slideshowEnabled:true, lastSlideNum: 30, slideshowFlip:false},
        {id:"wires",  path: "./art2.jpg", backgroundSize:"150%", backgroundPosition:"40% 40%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:true, lastSlideNum: 28, slideshowFlip:false},
        {id:"ninja", path: "./art6.jpg", backgroundSize:"150%", backgroundPosition:"50% 00%", detailSize:"100%", detailPosition:"50% 10%", slideshowEnabled:true, lastSlideNum: 40, slideshowFlip:true},
        // {id:"hot", path: "./art7.jpg", backgroundSize:"250%", backgroundPosition:"50% 50%", detailSize:"100%", detailPosition:"50% 50%", slideshowEnabled:false, lastSlideNum: 18, slideshowFlip:true},
        {id:"kick",  path: "./art8.jpg", backgroundSize:"120%", backgroundPosition:"40% 20%", detailSize:"100%", detailPosition:"50% 20%", slideshowEnabled:true, lastSlideNum: 20, slideshowFlip:true},
        {id:"sword",  path: "./art9.jpg", backgroundSize:"120%", backgroundPosition:"50% 50%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:true, lastSlideNum: 20, slideshowFlip:true},
        {id:"updo",  path: "./art5.jpg", backgroundSize:"140%", backgroundPosition:"50% 50%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:true, lastSlideNum: 30, slideshowFlip:true},
        {id:"coat", path: "./art10.jpg", backgroundSize:"160%", backgroundPosition:"50% 20%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:true, lastSlideNum: 18, slideshowFlip:false},
    ]
    let rowCounter = 0, row = 0;
    images.forEach((image => {
        row = (Math.ceil(++rowCounter / 3));
        image.row = row;
    }));

    const handleScroll = () => {
        setShrinkHeader(galleryRef.current.scrollTop > 50) ;
    };

    const handleClick = (id) => {
        // console.log("clicked!" + id);
        if (id == expandID)
            setExpandID(-1);
        else
            setExpandID(id);
        // images.sort(function(a,b) {return a.id == expandID ? -1 : b.id == expandID ? 1: 0});
        // console.log(images);
    }


    return (
        <React.Suspense fallback={<div>Loading...</div>}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", height:"90vh", overflow:"auto"}}>
            Hello World!
            {/* <ModelViewer/> */}
            <ModelViewer style={{width:"40vw"}} zoom={12.0}/>
            {/* <ThreeFunc style={{width:"40vw"}} zoom={4.0}/> */}
        </div>
        </React.Suspense>
    );
}