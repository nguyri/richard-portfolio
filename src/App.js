import React from "react";
import "./App.css";
import {hot} from "react-hot-loader";

import Header from "./components/header/Header"
import Main from "./components/main/Main"
import img from "./imgs/assiniboine.jpg"


export default function App() {
  const [darkMode, setDarkMode] = React.useState(true)
  // const darkMode = true;

  function toggleDarkMode() {
    setDarkMode( (prevState) => !prevState)
  } 
  
  return(  
    <div className="App">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <Main darkMode={darkMode}/>
  </div>
  );
}
