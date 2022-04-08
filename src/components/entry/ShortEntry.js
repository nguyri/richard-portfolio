import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, Outlet, useParams } from "react-router-dom";
import { getEntry, getImage } from './data'

export default function ShortEntry(props) {
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    // let params = useParams();
    // props = getEntry(params.projectlink)

    return (
        <div className={props.darkMode ? "entry entry--dark" : "entry"}>
            {console.log(props)}
            {/* <h1>{params.projectlink}</h1> */}
            
            {/* <Outlet /> */}
            <div id={props.link} className="entry--overlay-container">
                <img src={getImage(props.imageName).default ? getImage(props.imageName).default : ""} className="entry--img" />
                <div className="entry--overlay">
                    <span className="material-icons-round entry--overlay-icon">expand_more</span>
                </div>
            </div>
            <div className="entry--col">
                <Link to={`/projects/${props.link}`} className={props.darkMode ? "entry--title entry--dark" : "entry--title"} > {props.title} </Link>
                {/* <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1> */}
                <div className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {props.reactDescription ? props.reactDescription.html : props.description} </div>
            </div>
        </div>
    )
}