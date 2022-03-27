import React from "react"
import "./Header.css"
import { useMediaQuery } from 'react-responsive'
import { Link, useOutletContext } from "react-router-dom";

export default function Header(props) {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
    const [darkMode] = useOutletContext();

    return (
        <div className={darkMode ? "header header--dark" : "header is-nav-open"}>
            <p className="material-icons-round header--icon">{!isTabletOrMobile && "electric_bolt"}</p>
            <h1 className="header--title">richard nguyen</h1>
            <h2 className="header--subtitle"> putting the magic smoke into wood, metal, and other questionable mediums</h2>

            <nav className={darkMode ? "nav--dark" : ""}>

                <div className="nav--row">
                    {/* <a href="projects" className="nav--item">projects</a>
                    <a href="about" className="nav--item">about</a>
                    <a href="docs" className="nav--item">docs</a> */}
                    <Link to={'projects'} state={darkMode=darkMode}>projects</Link>
                    <div className="toggler">
                        <p className="toggler--light">light</p>
                        <div  className="toggler--slider" onClick={props.toggleDarkMode} >
                            <div className="toggler--slider--circle"></div>
                        </div>
                        <p className="toggler--dark">dark</p>
                    </div>  
                </div>
            </nav>
        </div>
    )
}