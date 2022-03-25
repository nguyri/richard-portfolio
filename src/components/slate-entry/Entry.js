import React from "react"
import Collapsible from 'react-collapsible';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import "./Entry.css"
// import ThreeScene from "../threejsdemo/Three"

function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../imgs/', false, /\.(png|jpe?g|svg)$/));
console.log(images);

export default function Entry(props) {
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);

    function smallEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"} onClick={() => setEntryIsSmall(!entryIsSmall)}>
                <div className="entry--overlay-container">
                    <img src={images[props.imageNum ? props.imageNum : 0].default} className="entry--img" />
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
            if (elem.img) {
                return <img src={images[elem.imageNum ? elem.imageNum : 0].default} style={elem.style} className={elem.className} />
            }
            // else if (elem.threejs) {
            //     return (
            //         <ThreeScene/>
            //     )
            // }
            else if (elem.subtitle) {
                return <h1 className={props.darkMode ? "entry--subtitle entry--dark" : "entry--subtitle"}> {elem.subtitle} </h1>
            }
            else {
                return <p className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {elem.text} </p>
            }})
        )
    }

    function bigEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"} onClick={() => setEntryIsSmall(!entryIsSmall)}>
                <div className="entry--overlay-container entry--overlay-container-big">
                    <img src={images[props.imageNum ? props.imageNum : 0].default} className="entry--img" />
                    <div className="entry--overlay">
                        <span className="material-icons-round entry--overlay-icon">expand_less</span>
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
