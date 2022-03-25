import React from "react"
import Collapsible from 'react-collapsible';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import "./Entry.css"
// import ThreeScene from "../threejsdemo/Three"

const images = {}

function importAll(r) {
    r.keys().forEach((key) => images[key] = r(key));
}
  
importAll(require.context('../../imgs/', false, /\.(png|jpe?g|svg)$/));

export default function Entry(props) {
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);

    function smallEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"}>
                <div className="entry--overlay-container" onClick={() => setEntryIsSmall(!entryIsSmall)}>
                    {console.log(props.imageName)}
                    {console.log(images[props.imageName])}
                    <img src={images[props.imageName] ? images[props.imageName].default : ""} className="entry--img" />
                    <div className="entry--overlay">
                        <span className="material-icons-round entry--overlay-icon">expand_more</span>
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
        return (paragraphArr.map((elem) => {
            if (elem.imageName) {
                return <img key={elem.key} src={images[elem.imageName] ? images[elem.imageName].default : ""} style={elem.style} className={elem.className} />
            }
            // else if (elem.threejs) {
            //     return (
            //         <ThreeScene/>
            //     )
            // }
            else if (elem.subtitle) {
                return <h1 key={elem.key} className={props.darkMode ? "entry--subtitle entry--dark" : "entry--subtitle"}  style={elem.style}> {elem.subtitle} </h1>
            }
            else {
                return <p key={elem.key} className={props.darkMode ? "entry--text entry--dark" : "entry--text"} style={elem.style}>  {elem.text} </p>
            }})
        )
    }

    function bigEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"} >
                <div className="entry--img-container" onClick={() => setEntryIsSmall(!entryIsSmall)}>
                    <div className="entry--overlay-container entry--overlay-container-big" >
                        <img src={images[props.imageName] ? images[props.imageName].default : ""} className="entry--img" />
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
