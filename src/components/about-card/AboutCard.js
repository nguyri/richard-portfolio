import React from "react";
import Footer from "./Footer";
import "./AboutCard.css";
import { useOutletContext } from "react-router-dom";
import richardo from "../../imgs/richardo1.jpg"

export default function AboutCard() {
    const darkMode = useOutletContext()[0];
    return (
    <div className="entries-layout">
        <div className = {darkMode ? "about-card--dark about-card " : "about-card"}>
            <header className="info">
                <div className={darkMode ? "info--img-dark info--img" : "info--img"}>
                    <img src={richardo} />
                </div>
                <h1 className ="info--item info--name"> Richard Nguyen </h1>
                <h2 className ={darkMode ? "info--item info--title-dark" : "info--item info--title"}> Software Engineer </h2>
                <h3 className ="info--item info--link"> nguyr.com </h3>
            </header>        
            <header className="about">
                <h1 className="about--header"> About </h1>
                <p className="about--text"> Hello, I'm a software developer and electrical engineer. 
                I try to learn new things all the time! </p>
            </header>
            <header className="interests">
                <h1 className="interests--header"> Interests </h1>
                <p className="interests--text"> I'm interested in CNC machining, 3D algorithms, and automation. 
                 I'm working on more on web development lately. In the past I've done algorithmic modelling in 
                 Grasshopper, user interfaces in python, and game development in C#. 
                  </p>
            </header>
            {/* <header className="interests">
                <h1 className="interests--header"> Hobbies </h1>
                <p className="interests--text"> I grew up next to the Bow Valley, so I'll take any excuse to go to the mountains. 
                Always happy to climb, hike, backpack, and ski. Indoors I like to draw and read.
                  </p>
            </header>    */}
            <Footer />
        </div>
    </div>
    )
}