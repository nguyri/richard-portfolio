import React from "react"
import richardo from "../../imgs/richardo1.jpg"

export default function Info() {
    return (
    <header className="info">
        <div className="info--img">
            <img src={richardo} />
        </div>
        <h1 className ="info--item info--name"> Richard Nguyen </h1>
        <h2 className ="info--item info--title"> Software Engineer </h2>
        <h3 className ="info--item info--link"> nguyr.com </h3>
    </header>        
    )
}