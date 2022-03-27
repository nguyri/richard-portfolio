import React from "react";
import Entry from "./Entry";
import data_file from "./data"

const images = {}

function importAll(r) {
    r.keys().forEach((key) => images[key] = r(key));
}

import { useOutletContext } from "react-router-dom";
  
importAll(require.context('../../imgs/', false, /\.(png|jpe?g|svg)$/));



export default function Entries (props) {
    const darkMode = useOutletContext();
    let entries = data_file.map( entry => {
        let data = {...entry}
        data.darkMode = darkMode
        data.images = images;
        return (
            <Entry {...data} key={entry.key} />
        )
        })
        
    console.log(entries)
    return entries;
  }