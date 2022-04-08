import React from "react"
import "./Header.css"
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom";

function homeButton (props) {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})

    return (
        <div className={props.darkMode ? "nav--home nav--home-dark" : "nav--home"} >
            <p className={props.darkMode ? "header--icon header--icon-dark material-icons-round" : "header--icon material-icons-round"}>{"electric_bolt"}</p>
            <h1 className={props.darkMode ? "header--title header--title-dark" : "header--title"} >richard nguyen</h1>
        </div>
    )
}

export default function Header(props) {
    return (
        <div className={props.darkMode ? "header header--dark" : "header is-nav-open"}>
            <Link to={'projects'} style={{textDecoration:"none"}} >{homeButton(props)}</Link>
            <h2 className={props.darkMode ? "header--subtitle header--subtitle-dark" : "header--subtitle"}> putting the magic smoke into code, wood, and steel.</h2>

            <nav className={props.darkMode ? "nav--dark" : ""}>

                <div className="nav--row">
                    <Link to={'projects'} className={props.darkMode ? "nav--item nav--item-dark" : "nav--item"}>projects</Link>
                    <Link to={'about'} className={props.darkMode ? "nav--item nav--item-dark" : "nav--item"}>about</Link>
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