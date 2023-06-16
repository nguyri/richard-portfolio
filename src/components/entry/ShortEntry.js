import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, Outlet, useParams } from "react-router-dom";
import { getEntry, getImage } from './data'

export default function ShortEntry(props) {
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    // let params = useParams();
    // props = getEntry(params.projectlink)
    // console.log(props);

    return (
        <div className={props.darkMode ? "entry entry--dark" : "entry"}>
            {/* <h1>{params.projectlink}</h1> */}
            
            {/* <Outlet /> */}
            <div id={props.link} className="entry--overlay-container">
                <img src={getImage(props.imageName) ? getImage(props.imageName) : ""} 
                    className="entry--img" 
                    style={props.imageStyle ? props.imageStyle.style : {}} />
                {/* <div className="entry--overlay">
                    <span className="material-icons-round entry--overlay-icon">expand_more</span>
                </div> */}
            </div>
            <div className="entry--col">
                <Link to={`/projects/${props.link}`} className={`entry--title  ${props.darkMode && `entry--title-dark`}`} > {props.title} </Link>
                {/* <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1> */}
                <div className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {props.reactDescription ? props.reactDescription.html : props.description} </div>
            </div>
        </div>
    )
}