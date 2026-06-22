import React, { useEffect } from "react";
import "./App.css";
// import {hot} from "react-hot-loader";
import Entries from "./components/entry/Entries"
import data_file from "./components/entry/data"
import AboutCard from "./components/about-card/AboutCard"

import Header from "./components/header/Header"

import { Outlet } from "react-router-dom";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [shrinkHeader, setShrinkHeader] = React.useState(false);

  function toggleDarkMode() {
    setDarkMode( (prevState) => !prevState)
  } 

  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate('/projects');
  // }, [])
  // console.log(getImage('./favicon.png'));

  return(  
    <div className={darkMode? "App App--dark" : "App"}>
        {/* <Favicon url={getImage('./favicon.png')} /> */}
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} shrinkHeader ={shrinkHeader}/>
        <main>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Outlet context={[darkMode, setShrinkHeader]}/>
          </React.Suspense>
        </main>
      </div>
  );
}
