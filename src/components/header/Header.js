import React from "react"
import "./Header.css"
import { useMediaQuery } from 'react-responsive'

export default function Header(props) {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})

    return (
        <div className={props.darkMode ? "header header--dark" : "header is-nav-open"}>
            <p className="material-icons-round header--icon">{!isTabletOrMobile && "electric_bolt"}</p>
            <h1 className="header--title">richard nguyen</h1>
            <h2 className="header--subtitle"> putting the magic smoke into wood, metal, and other questionable mediums</h2>

            <nav
                className={props.darkMode ? "nav--dark" : ""}
            >
                <div
                    className="toggler"
                >
                    <p className="toggler--light">Light</p>
                    <div
                        className="toggler--slider"
                        onClick={props.toggleDarkMode}
                    >
                        <div className="toggler--slider--circle"></div>
                    </div>
                    <p className="toggler--dark">Dark</p>
                </div>
            </nav>
        </div>
    )
}