import React from "react"
import "./Entry.css"

export default function Entry(props) {
    return (
        <div className="entry">
            <img src={props.imageUrl} className="entry--img"/>
            <div className="entry--text-col">
                <div className="entry--location">
                    <p className="material-icons-outlined entry--icon">public</p>
                    <h2> {props.location.toUpperCase()} </h2>
                    <a href="{props.googleMapsUrl}"> Link to Google Maps</a>
                </div>
                
                <h1 className="entry--title"> {props.title} </h1>
                <h3 className="entry--date"> {props.startDate} - {props.endDate} </h3>
                <p className="entry--text"> {props.description} </p>
            </div>
        </div>
        )
}
