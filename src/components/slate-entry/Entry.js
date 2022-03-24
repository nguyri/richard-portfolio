import React from "react"
import Collapsible from 'react-collapsible';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import "./Entry.css"
import mpcnc from "../../imgs/mpcnc1.jpg"
import adlathe from "../../imgs/addlathe1.jpg"
import raytracer from "../../imgs/raytracer1.jpg"
import wordle from "../../imgs/wordle1.png"

export default function Entry(props) {
    // eventually change this to webpack import
    const imgList = [mpcnc, adlathe, raytracer, wordle]
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);

    function smallEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"} onClick={() =>setEntryIsSmall(!entryIsSmall)}>
                <div className="entry--overlay-container">
                    <img src={imgList[props.imageNum]} className="entry--img" />
                    <div className="entry--overlay">
                        <span class="material-icons-round entry--overlay-icon">expand_more</span>
                    </div>                
                </div>
                <div className="entry--col">
                    <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1>
                    <p className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {props.description} </p>
                </div>
            </div>
        )
    }

    function paragraphBigEntry(paragraphArr) {
        return (paragraphArr.map((elem) =>
            <p className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {elem.text} </p>
        )
        )
    }

    function bigEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"} onClick={() =>setEntryIsSmall(!entryIsSmall)}>
                <div className="entry--overlay-container entry--overlay-container-big">
                    <img src={imgList[props.imageNum]} className="entry--img" />
                    <div className="entry--overlay">
                        <span class="material-icons-round entry--overlay-icon">expand_less</span>
                    </div>                
                </div>
                
                <div className="entry--col">
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
                    appear:300,
                    enter:300,
                    exit:0,}}
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
