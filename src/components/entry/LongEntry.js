import React from "react"
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import "./Entry.css"
import ReactPlayer from 'react-player/lazy'
import ThreeScene from "../threejsdemo/ThreeScene"
import Wordle from "../wordle/Wordle"
import NotFound from "../errordocs/NotFound"
import { useMediaQuery } from 'react-responsive'
import { useParams, useOutletContext } from "react-router-dom";
import { getEntry, getImage } from './data'

export default function LongEntry() {
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    let params = useParams();
    let entryData = {...getEntry(params.projectlink), darkMode:useOutletContext()}

    function paragraphBigEntry(paragraphArr) {
        return (paragraphArr.map((elem) => {
            if (elem.imageName) {
                return <img key={elem.key} src={getImage(elem.imageName).default ? getImage(elem.imageName).default : ""} style={isTabletOrMobile ? {} : elem.style} className={elem.className} />
            }
            else if (elem.threejs) {
                return (
                    <div key={elem.key}> <ThreeScene zoom={isTabletOrMobile? 4.0 : 5.4}/> </div>
                )
            }
            else if (elem.vimeo) {
                return < div key={elem.key} className="entry--vimeo-fixed-aspect" style={elem.style}>
                        <ReactPlayer url={elem.vimeo} className="entry--vimeo" width='100%' height='100%' />
                    </div>
            }
            else if (elem.wordle) {
                return <div key ={elem.key}> <Wordle/> </div>
            }
            else if (elem.subtitle) {
                return <h3 key={elem.key} className={entryData.darkMode ? "entry--subtitle entry--dark" : "entry--subtitle"}  style={elem.style}> {elem.subtitle} </h3>
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
        window.scrollTo(0,0)
        console.log(entryData);
        if(!entryData.num) {
            return <NotFound />
        }
        return (
            <div id={entryData.link} className={entryData.darkMode ? "entry entry--dark" : "entry"} >
                <div className={entryData.darkMode? "entry--img-container-dark entry--img-container" : "entry--img-container"}>
                    <div className="entry--overlay-container entry--overlay-container-big" >
                        <img src={getImage(entryData.imageName).default ? getImage(entryData.imageName).default : ""} className="entry--img" />
                    </div>
                </div>

                <div className="entry--grid">
                    <h2 className={entryData.darkMode ? "entry--title entry--title-dark" : "entry--title"}> {entryData.title} </h2>
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
