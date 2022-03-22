import React, { Component} from "react";
import css from "./App.css";
import {hot} from "react-hot-loader";
import Entry from "./components/slate-entry/Entry"
import data_file from "./components/slate-entry/data"
import Header from "./components/header/Header"
import img from "./imgs/assiniboine.jpg"
import AboutCard from "./components/about-card/AboutCard"

export default function App() {
  let entries = data_file.map( entry => {
    return (
        <section key={entry.key}>
            <Entry 
                {...entry}
            /> 
            <hr></hr>
        </section>
    )
  })
  
  return(
    <div className="App">

      <Header />
      {entries}

      <AboutCard/>
    </div>
  );
}