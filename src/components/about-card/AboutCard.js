import React from "react";
import ReactDOM from "react-dom";
import Info from "./Info";
import About from "./About";
import Interests from "./Interests";
import Footer from "./Footer";
import css from "./AboutCard.css";

export default function AboutCard() {
    return (
    <div className = "about-card">
        <main>
            <Info />
            <About />
            <Interests />
        </main>
        <Footer />
    </div>
    )
}