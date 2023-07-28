import React from "react";
import Footer from "./Footer";
import "./AboutCard.css";
import { useOutletContext } from "react-router-dom";
import richardo from "../../imgs/richardo1.jpg"

export default function AboutCard() {
    const [darkMode, setShrinkHeader] = useOutletContext();
    const aboutRef = React.useRef();

    const handleScroll = () => {
        setShrinkHeader(aboutRef.current.scrollTop > 50) ;
    };

    return (
    <div className="entries-layout" ref = {aboutRef} onScroll={handleScroll}>
        <div  className = {darkMode ? "about-card--dark about-card " : "about-card"}>
            <header className="info">
                <div className={darkMode ? "info--img-dark info--img" : "info--img"}>
                    <img src={richardo} />
                </div>
                <h1 className ="info--item info--name"> Richard Nguyen </h1>
                <h2 className ={darkMode ? "info--item info--title-dark" : "info--item info--title"}> Software Engineer </h2>
                <h3 className ="info--item info--link"> nguyr.com </h3>
            </header>        
            <header className="about">
                <h1 className="content--header"> About </h1>
                <p className="content--text"> Hello, I'm a software developer and electrical engineer. 
                I love to see the combination of machine precision with human ingenuity.</p>
            </header>
            <header className="interests">
                <h1 className="content--header"> Interests </h1>
                <p className="content--text"> More recently web development and machine learning. 
                In the past, CNC machining, 3D algorithms, and automation. I've done algorithmic machining in 
                 Grasshopper, user interfaces in python, C# mobile apps and embedded C. 
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