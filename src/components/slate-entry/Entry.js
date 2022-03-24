import React from "react"
import Collapsible from 'react-collapsible';
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

            <div className={props.darkMode ? "entry entry--dark" : "entry"}>
                <img src={imgList[props.imageNum]} className="entry--img" />
                {/* <div className="overlay"> */}
                <div className="entry--col">
                    <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1>
                    <p className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {props.description} </p>
                </div>
            {/* </div> */}
            </div>
        )
    }

    function paragraphBigEntry(paragraphArr) {
        return (paragraphArr.map( (elem) =>
            <p className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {elem.text} </p>
            )
        )
    }

    function bigEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"}>
                <img src={imgList[props.imageNum]} className="entry--img" style={{width: "20vw"}}/>
                <div className="entry--col">
                    <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1>
                    {paragraphBigEntry(props.longdescription)}
                </div>
            </div>
        )
    }

    return (
        <Collapsible trigger={smallEntry()} triggerWhenOpen={bigEntry()}>
            
        </Collapsible>

    )
}
