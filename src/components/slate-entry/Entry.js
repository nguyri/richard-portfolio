import React from "react"
import "./Entry.css"
import mpcnc from "../../imgs/mpcnc1.jpg"
import adlathe from "../../imgs/addlathe1.jpg"
import raytracer from "../../imgs/raytracer1.jpg"
import wordle from "../../imgs/wordle1.png"

export default function Entry(props) {
    // eventually change this to webpack import
    const imgList = [mpcnc, adlathe, raytracer, wordle]
    return (
        <div className={props.darkMode ? "entry entry--dark" : "entry"}>
            <img src={imgList[props.imageNum]} className="entry--img"/>
            <div className="entry--text-col">
                {/* <div className="entry--location">
                    <p className="material-icons-outlined entry--icon">public</p>
                    <h2> {props.tags.toUpperCase()} </h2>
                </div> */}
                
                <h1 className={props.darkMode ? "entry--title entry--dark" :"entry--title"}> {props.title} </h1>
                <p className={props.darkMode ? "entry--text entry--dark" :"entry--text"}> {props.description} </p>
            </div>
        </div>
        )
}
