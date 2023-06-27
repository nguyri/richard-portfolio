import React from 'react';
import {getImage} from '../entry/data'
import { useMediaQuery } from 'react-responsive'
import './Gallery.css'
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";
import {ImageDetail, Image} from './ImageDetail'

export default function Gallery (props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const galleryRef = React.useRef();
    const [darkMode, setShrinkHeader] = useOutletContext();
    const [expandID, setExpandID] = React.useState(-1);
    let rowCounter = 0, row = 0;
    const images = [
        {id:"vest", path: "./art1.jpg", backgroundSize:"110%", backgroundPosition:"20% 0%", detailSize:"100%", detailPosition:"50% 20%", slideshowEnabled:true, slides: 18},
        {id:"miku",  path: "./art4.jpg", backgroundSize:"170%", backgroundPosition:"45% 5%", detailSize:"100%", detailPosition:"50% 10%", slideshowEnabled:false, slides: 18},
        {id:"lucy",  path: "./art11.jpg", backgroundSize:"180%", backgroundPosition:"50% 40%", detailSize:"120%", detailPosition:"50% 30%", slideshowEnabled:false, slides: 18},
        {id:"wires",  path: "./art2.jpg", backgroundSize:"150%", backgroundPosition:"40% 40%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:false, slides: 18},
        {id:"ninja", path: "./art6.jpg", backgroundSize:"150%", backgroundPosition:"50% 00%", detailSize:"100%", detailPosition:"50% 10%", slideshowEnabled:false, slides: 18},
        // {id:"hot", path: "./art7.jpg", backgroundSize:"250%", backgroundPosition:"50% 50%", detailSize:"100%", detailPosition:"50% 50%", slideshowEnabled:false, slides: 18},
        {id:"kick",  path: "./art8.jpg", backgroundSize:"120%", backgroundPosition:"40% 20%", detailSize:"100%", detailPosition:"50% 20%", slideshowEnabled:false, slides: 18},
        {id:"sword",  path: "./art9.jpg", backgroundSize:"120%", backgroundPosition:"50% 50%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:false, slides: 18},
        {id:"updo",  path: "./art5.jpg", backgroundSize:"140%", backgroundPosition:"50% 50%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:false, slides: 18},
        {id:"coat", path: "./art10.jpg", backgroundSize:"160%", backgroundPosition:"50% 20%", detailSize:"100%", detailPosition:"50% 30%", slideshowEnabled:false, slides: 18},
    ]

    const imageDetails = [
        {id:"vest", path: "./art1.jpg", backgroundSize:"200%", backgroundPosition:"20% 0%"},
        {id:"wires",  path: "./art2.jpg", backgroundSize:"200%", backgroundPosition:"40% 40%"},
        {id:"miku",  path: "./art4.jpg", backgroundSize:"200%", backgroundPosition:"45% 5%"},
        {id:"updo",  path: "./art5.jpg", backgroundSize:"200%", backgroundPosition:"50% 50%"},
        {id:"ninja", path: "./art6.jpg", backgroundSize:"200%", backgroundPosition:"50% 00%"},
        // {id:"hot", path: "./art7.jpg", backgroundSize:"200%", backgroundPosition:"50% 50%"},
        {id:"kick",  path: "./art8.jpg", backgroundSize:"200%", backgroundPosition:"40% 20%"},
        {id:"sword",  path: "./art9.jpg", backgroundSize:"200%", backgroundPosition:"50% 50%"},
        {id:"lucy",  path: "./art11.jpg", backgroundSize:"200%", backgroundPosition:"50% 40%"},
        {id:"coat", path: "./art10.jpg", backgroundSize:"200%", backgroundPosition:"50% 20%"},
    ]

    const handleScroll = () => {
        setShrinkHeader(galleryRef.current.scrollTop > 50) ;
    };

    const handleClick = (id) => {
        console.log("clicked!" + id);
        if (id == expandID)
            setExpandID(-1);
        else
            setExpandID(id);
        // images.sort(function(a,b) {return a.id == expandID ? -1 : b.id == expandID ? 1: 0});
        // console.log(images);
    }

    images.forEach((image => {
        row = (Math.ceil(++rowCounter / 3));
        image.row = row;
    }));

    return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", height:"90vh"}}>
        <div className="gallery" ref = {galleryRef} onScroll={handleScroll} >
            { images.filter((elem => elem.id == expandID)).map((elem => {
                return <ImageDetail key={elem.id} props={{...elem, 
                    handleClick:(() => handleClick(elem.id)), row:elem.row, className:'gallery--image-detail'}}/>;
            }))}
            { images.map((elem) => {
                return elem.id != expandID && <Image key={elem.id} props={{...elem, 
                    handleClick:(() => handleClick(elem.id)), row:expandID > 0 ? `${elem.row} / span 1` : `span 1`, className:'gallery--image'}}/>;
                // <div key={elem.id} style={{backgroundImage:`url(${getImage(elem.path)})`, backgroundSize:elem.backgroundSize,
                //     backgroundPosition:elem.backgroundPosition, gridRow: expandID > 0 ? `${elem.row} / span 1` : `span 1`}} onClick={() => handleClick(elem.id) } className='gallery--image'/>
                })}
        </div>
        </div>
    );
}