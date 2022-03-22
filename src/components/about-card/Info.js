import React from "react"
import richardo from "../../imgs/richardo1.jpg"

export default function Info() {
    return (
    <header className="info">
        <div className="info--img">
            <img src={richardo} />
        </div>
        <h1 className ="info--item"> Richard Nguyen </h1>
        <h2 className ="info--item"> Software Developer </h2>
        <h3 className ="info--item"> nguyr.com </h3>
    </header>        
    )
}