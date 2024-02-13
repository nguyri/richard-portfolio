import React from "react"
// import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import "./Entry.css"
const ReactPlayer = React.lazy(() => import('react-player/lazy'));
import ThreeScene from "../threejsdemo/ThreeScene"
const Wordle = React.lazy(() => import("../wordle/Wordle"));
import NotFound from "../errordocs/NotFound"
import { useMediaQuery } from 'react-responsive'
import { useParams, useOutletContext } from "react-router-dom";
import { getEntry, getImage } from './data'
import TableOfContents from "./TableOfContents"
import MovingPlaneCanvas from "../threefiber/MovingPlaneCanvas";
import { Canvas } from "@react-three/fiber";

import ImageTransitionCanvas from "../threefiber/ImageTransition";
import BlendingModes from "../blendingmodes/BlendingModes";
// import ImageTransitionCanvas from "../threefiber/ImageTransition";

export default function LongEntry() {
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    let params = useParams();
    let entryData = {...getEntry(params.projectlink), darkMode:useOutletContext()[0]};
   
    function paragraphBigEntry(paragraphArr) {
        return (paragraphArr.map((elem) => {
            if(elem.component)console.log(elem.component.type)
            if (elem.imageName) {
                // return <img key={elem.key} src={getImage(elem.imageName) ? getImage(elem.imageName) : ""} style={isTabletOrMobile ? {} : elem.style} className={elem.className} />;
                return <div key={elem.key} style={isTabletOrMobile ? {} : elem.style}>
                    <img src={getImage(elem.imageName) ? getImage(elem.imageName) : ""} style={isTabletOrMobile ? {} : elem.picStyle} className={elem.className} />
                    </div>
            }
            else if (elem.blendingComponent) {
                return <React.Suspense fallback={<div>Loading...</div>}>
                    <BlendingModes {...elem.blendingComponent.props} darkMode={useOutletContext()[0]}/>
                </React.Suspense>;
            }
            else if (elem.component) {
                return <React.Suspense fallback={<div>Loading...</div>}>
                    {elem.component}</React.Suspense>;
            }
            else if (elem.vimeo) {
                return < div key={elem.key} className="entry--vimeo-fixed-aspect" style={elem.style}>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <ReactPlayer url={elem.vimeo} className="entry--vimeo" width='100%' height='100%' style={{justifyContent:'left'}}
                                volume={elem.vimeo_auto ? 0 : null} muted={elem.vimeo_auto ? true: false} controls={elem.vimeo_auto ? false:true}
                                playing={elem.vimeo_auto ? true: false} loop={elem.vimeo_auto ? true: false} 
                            />
                        </React.Suspense>
                    </div>
            }
            else if (elem.title) {
                return <h2 id={elem.key} key={elem.key} className={entryData.darkMode ? "entry--title entry--title-dark" : "entry--title"}  style={elem.style}> {elem.title} </h2>
            }
            else if (elem.subtitle) {
                return <h3 id={elem.key} key={elem.key} className={entryData.darkMode ? "entry--subtitle entry--subtitle-dark" : "entry--subtitle"}  style={elem.style}> {elem.subtitle} </h3>
            }
            else if (elem.html) {
                return <div key={elem.key} className={entryData.darkMode ? "entry--text entry--dark" : "entry--text"} style={elem.style}> {elem.html}</div >;
            }
            else {
                return <div key={elem.key} className={entryData.darkMode ? "entry--text entry--dark" : "entry--text"} style={elem.style}>  {elem.text} </div>
            }})
        )
    }

    function bigEntry() {
        // window.scrollTo(0,0)
        // console.log(entryData);
        if(!entryData.num) {
            return <NotFound />
        }
        return (
            <div id={entryData.link} className={entryData.darkMode ? "entry entry--dark" : "entry"} >
                {/* <div className={entryData.darkMode? "entry--img-container-dark entry--img-container" : "entry--img-container"}>
                    <div className="entry--overlay-container entry--overlay-container-big" >
                        <img src={getImage(entryData.imageName) ? getImage(entryData.imageName) : ""} className="entry--img" />
                    </div>
                </div> */}
                {!isTabletOrMobile && <TableOfContents entrydata={entryData}/>}
                <div className="entry--grid">
                    {/* <h2 className={entryData.darkMode ? "entry--title entry--title-dark" : "entry--title"} id={entryData.num}> {entryData.title} </h2> */}
                    {paragraphBigEntry(entryData.longdescription)}
                </div>
                
                
            </div>
        )
    }
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            {/* {entryIsSmall && smallEntry()}
            <CSSTransition
                in={!entryIsSmall}
                timeout={{
                    appear: 300,
                    enter: 300,
                    exit: 0,
                }}
                classNames="entry"
                unmountOnExit
                onEnter={() => setEntryIsSmall(false)}
                onExited={() => setEntryIsSmall(true)}
            > */}
                {bigEntry()}
                <hr></hr>
            {/* </CSSTransition> */}
        </div>
        // <Collapsible trigger={smallEntry()} triggerWhenOpen={<div>{props.title}</div>}>
        //     {bigEntry()}
        // </Collapsible>
    )
}
