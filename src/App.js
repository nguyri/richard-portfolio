import React from "react";
import "./App.css";
// import {hot} from "react-hot-loader";
import Entries from "./components/entry/Entries"
import data_file from "./components/entry/data"
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


  
  return(  
    <div className="App" style={{backgroundColor: darkMode ? "#1c1c1c": "#F9F7F0"}}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main>
        <Entries darkMode={darkMode}/>
        <Link to="/projects">Projects Link</Link>
        <Link to="/about">About Link</Link>
        <Outlet/>
      </main>
  </div>
  );
}
