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
                <div className="info--img">
                    <img src={richardo} />
                </div>
                <h1 className ="info--item info--name"> Richard Nguyen </h1>
                <h2 className ="info--item info--title"> Software Engineer </h2>
                <h3 className ="info--item info--link"> nguyr.com </h3>
            </header>        
            <header className="about">
                <h1 className="about--header"> About </h1>
                <p className="about--text"> I am a software developer and electrical engineer with an interest in automation. 
                I try to learn new things all the time! </p>
            </header>
            <header className="interests">
                <h1 className="interests--header"> Interests </h1>
                <p className="interests--text"> I'm interested in CNC machining, 3D algorithms, and automation. 
                For software I've been mostly interested in game development and 3D printer software. Increasingly I've been 
                working on web development. </p>
            </header>       
            <Footer />
        </div>
    </div>
    )
}