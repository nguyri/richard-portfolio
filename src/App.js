import React from "react";
import "./App.css";
import {hot} from "react-hot-loader";
import Entry from "./components/slate-entry/Entry"
import data_file from "./components/slate-entry/data"
import Header from "./components/header/Header"
import img from "./imgs/assiniboine.jpg"
import AboutCard from "./components/about-card/AboutCard"

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false)
  // const darkMode = true;

  function toggleDarkMode() {
    setDarkMode( (prevState) => !prevState)
  } 

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

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
d/>
    </div>
  );
}