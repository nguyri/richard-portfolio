import React, { Component} from "react";
import "./App.css";
import {hot} from "react-hot-loader";
import img from "./imgs/assiniboine.jpg"

export default function App() {
  return(
    <div className="App">
      <h1> Hello, World! </h1>
      <h2>Putting the magic smoke into wood, metal, and other questionable mediums.</h2>
      <img src={img}></img>
    </div>
  );
}