import React, { useEffect } from "react";
import "./App.css";
// import {hot} from "react-hot-loader";
import Entries from "./components/entry/Entries"
import data_file from "./components/entry/data"
import AboutCard from "./components/about-card/AboutCard"

import Header from "./components/header/Header"
import img from "./imgs/assiniboine.jpg"

import { Outlet, Link, useNavigate } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false)
  // const darkMode = true;

  function toggleDarkMode() {
    setDarkMode( (prevState) => !prevState)
  } 

  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate('/projects');
  // }, [])
  
  return(  
    <div className={darkMode? "App App--dark" : "App"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main>
        <Outlet context={darkMode}/>
      </main>
  </div>
  );
}
