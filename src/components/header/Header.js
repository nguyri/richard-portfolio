import React from "react"

export default function Header(props) {
    return (
        <div className={props.darkMode ? "header" : "header header--dark"}>
            <p className="material-icons-outlined header--icon">public</p>
            <h1 className="header--title">richard nguyen</h1>
            <h2 className="header--subtitle"> putting the magic smoke into wood, metal, and other questionable mediums</h2>
        </div>
        )
}