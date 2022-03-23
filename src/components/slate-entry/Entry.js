import React from "react"
import Collapsible from 'react-collapsible';
import "./Entry.css"
import mpcnc from "../../imgs/mpcnc1.jpg"
import adlathe from "../../imgs/addlathe1.jpg"
import raytracer from "../../imgs/raytracer1.jpg"
import wordle from "../../imgs/wordle1.png"


const arrTest = [
    {key: 1, text:`For what it’s worth, the MPCNC is an excellent open source CNC router for anyone 
    interested in making parts that can’t be made on a 3D printer.`},
    {key: 2, text:`Admittedly, using this small garage router is more difficult
     than using a rigid commercial machine with a spindle measured in horsepower. Issues are often sudden and immediately ruin the workpiece.
      I ran into several issues with the electrical connectors. Occasionally the tool could catch a wall it
       was not meant to engage and dove into the material.`},
       {key: 3, text:`At the end of this project I found myself not using
        the router particularly often because routing wood was messy and took a long time. However it has
         turned into my CNC plasma cutter which seems like a better fit for this machine.`}
        ]

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
