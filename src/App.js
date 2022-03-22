import React, { Component} from "react";
import css from "./App.css";
import {hot} from "react-hot-loader";
import img from "./imgs/assiniboine.jpg"
import AboutCard from "./components/about-card/AboutCard"

export default function App() {
  return(
    <div className="App">
      <h1 className="demo-title"> Hello, World! </h1>
      <h2 className="demo-text">Putting the magic smoke into wood, metal, and other questionable mediums.</h2>
      <img className="demo-img" src={img}></img>

      <AboutCard/>
    </div>
  );
}