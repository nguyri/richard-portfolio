import React from "react"
import Collapsible from 'react-collapsible';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import "./Entry.css"
import ReactPlayer from 'react-player/lazy'
import ThreeScene from "../threejsdemo/ThreeScene"
import { useMediaQuery } from 'react-responsive'

export default function Entry(props) {
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    function smallEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"}>
                <div id={props.link} className="entry--overlay-container" onClick={() => setEntryIsSmall(!entryIsSmall)}>
                    <img src={props.images[props.imageName].default ? props.images[props.imageName].default : ""} className="entry--img" />
                    <div className="entry--overlay">
                        <span className="material-icons-round entry--overlay-icon">expand_more</span>
                    </div>
                </div>
                <div className="entry--col">
                    <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1>
                    <div className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {props.reactDescription ? props.reactDescription.html : props.description} </div>
                </div>
            </div>
        )
    }

    function paragraphBigEntry(paragraphArr) {
        return (paragraphArr.map((elem) => {
            if (elem.imageName) {
                return <img key={elem.key} src={props.images[elem.imageName].default ? props.images[elem.imageName].default : ""} style={isTabletOrMobile ? {} : elem.style} className={elem.className} />
            }
            else if (elem.threejs) {
                return (
                    <div key={elem.key}> <ThreeScene/> </div>
                )
            }
            else if (elem.vimeo) {
                return < div key={elem.key} className="entry--vimeo-fixed-aspect" style={elem.style}>
                        <ReactPlayer url={elem.vimeo} className="entry--vimeo" width='100%' height='100%' />
                    </div>
            }
            else if (elem.subtitle) {
                return <h1 key={elem.key} className={props.darkMode ? "entry--subtitle entry--dark" : "entry--subtitle"}  style={elem.style}> {elem.subtitle} </h1>
            }
            else {
                return <div key={elem.key} className={props.darkMode ? "entry--text entry--dark" : "entry--text"} style={elem.style}>  {elem.text} </div>
            }})
        )
    }

    function bigEntry() {
        return (
            <div id={props.link} className={props.darkMode ? "entry entry--dark" : "entry"} >
                <div className={props.darkMode? "entry--img-container-dark entry--img-container" : "entry--img-container"} onClick={() => setEntryIsSmall(!entryIsSmall)}>
                    <div className="entry--overlay-container entry--overlay-container-big" >
                        <img src={props.images[props.imageName].default ? props.images[props.imageName].default : ""} className="entry--img" />
                        <div className="entry--overlay">
                            <span className="material-icons-round entry--overlay-icon">expand_less</span>
                        </div>
                    </div>
                </div>

                <div className="entry--grid">
                    <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1>
                    {paragraphBigEntry(props.longdescription)}
                </div>
            </div>
        )
    }
    return (
        <div>
            {entryIsSmall && smallEntry()}
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
            >
                {bigEntry()}
            </CSSTransition>
        </div>
        // <Collapsible trigger={smallEntry()} triggerWhenOpen={<div>{props.title}</div>}>
        //     {bigEntry()}
        // </Collapsible>
    )
}
