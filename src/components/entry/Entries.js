import React from "react";
import Entry from "./Entry";
import data_file from "./data"

export default function Entries (props) {
    let entries = data_file.map( entry => {
        let data = {...entry}
        data.darkMode = props.darkMode
        return (
            <Entry {...data} key={entry.key} />
            // <section key={entry.key}>
            //     <Entry {...data} />
            // </section>
        )
        })
        
    console.log(entries)
    return entries;
  }