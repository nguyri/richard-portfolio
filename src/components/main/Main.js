import React from "react"
import Entry from "../slate-entry/Entry"
import data_file from "../slate-entry/data"
import AboutCard from "../about-card/AboutCard"
import "./Main.css"

export default function Main(props) {

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

    return (
        <main className={props.darkMode ? "dark" : ""}>
            {entries}
            <AboutCard/>
        </main>
    )
}