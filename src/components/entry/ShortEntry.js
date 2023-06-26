import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, Outlet, useParams, useOutletContext } from "react-router-dom";
import { getEntry, getImage } from './data'

export default function ShortEntry(props) {
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <div className={props.darkMode ? "entry entry--dark" : "entry"}>
            <div id={props.link} className="entry--overlay-container">
                <img src={getImage(props.imageName) ? getImage(props.imageName) : ""} 
                    className="entry--img" 
                    style={isTabletOrMobile ? props.mobileStyle ? props.mobileStyle.style : {}
                                            : props.imageStyle ? props.imageStyle.style: {}} />
            </div>
            <div className="entry--col">
                <Link to={`/projects/${props.link}`} onClick={useOutletContext()[2]} className={`entry--title  ${props.darkMode && `entry--title-dark`}`}> {props.title} </Link>
                {/* <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1> */}
                <div className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {props.reactDescription ? props.reactDescription.html : props.description} </div>
            </div>
        </div>
    )
}