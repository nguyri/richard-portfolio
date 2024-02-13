import React from 'react';
import {getImage} from '../entry/data'
import { useMediaQuery } from 'react-responsive'
import './ThreeGallery.css'
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";
const ModelViewer = React.lazy(() => import('./ModelViewer'));

export default function ThreeGallery (props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const galleryRef = React.useRef();
    const [darkMode, setShrinkHeader] = useOutletContext();
    let rowCounter = 0, row = 0;
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
            {/* <ModelViewer/> */}
            <ModelViewer darkMode={useOutletContext()[0]} style={{width:"40vw"}}/>
            {setShrinkHeader(true)}
            {/* <ThreeFunc style={{width:"40vw"}} zoom={4.0}/> */}
        </div>
        </React.Suspense>
    );
}