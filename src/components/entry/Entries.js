import React from "react";
import Entry from "./Entry";
import data_file from "./data"

const images = {}

function importAll(r) {
    r.keys().forEach((key) => images[key] = r(key));
}
  
importAll(require.context('../../imgs/', false, /\.(png|jpe?g|svg)$/));

export default function Entries (props) {
    let entries = data_file.map( entry => {
        let data = {...entry}
        data.darkMode = props.darkMode
        console.log(images);
        data.images = images;
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