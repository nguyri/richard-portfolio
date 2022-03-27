import React from "react";
import "./App.css";
// import {hot} from "react-hot-loader";
import Entry from "./components/slate-entry/Entry"
import data_file from "./components/slate-entry/data"
import AboutCard from "./components/about-card/AboutCard"

import Header from "./components/header/Header"
import img from "./imgs/assiniboine.jpg"

import { Outlet, Link } from "react-router-dom";


export default function App() {
  const [darkMode, setDarkMode] = React.useState(false)
  // const darkMode = true;

  function toggleDarkMode() {
    setDarkMode( (prevState) => !prevState)
  } 

  let entries = data_file.map( entry => {
    let data = {...entry}
    data.darkMode = {darkMode}.darkMode
    return (
        <section key={entry.key}>
            <Entry {...data} />
        </section>
    )
  })
  
  return(  
    <div className="App" style={{backgroundColor: darkMode ? "#1c1c1c": "#F9F7F0"}}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main>
        {entries}
        <Link to="/about">About Link</Link>
        <Outlet/>
      </main>
  </div>
  );
}
