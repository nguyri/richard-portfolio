import React from "react"
import "./Header.css"
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom";

function homeButton () {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})

    return (
        <div className="nav--home" >
            <p className="material-icons-round header--icon">{"electric_bolt"}</p>
            <h1 className="header--title">richard nguyen</h1>
        </div>
    )
}

export default function Header(props) {
    return (
        <div className={props.darkMode ? "header header--dark" : "header is-nav-open"}>
            <Link to={'projects'} style={{textDecoration:"none"}}>{homeButton()}</Link>
            <h2 className="header--subtitle"> putting the magic smoke into wood, steel, and anything else.</h2>

            <nav className={props.darkMode ? "nav--dark" : ""}>

                <div className="nav--row">
                    <Link to={'projects'} className="nav--item">projects</Link>
                    <Link to={'about'} className="nav--item">about</Link>
                    {/* <Link to={'docs'} className="nav--item">docs</Link> */}
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