import React from "react";
import LongEntry from "./LongEntry";
import ShortEntry from "./ShortEntry";
import { getEntries } from "./data"
import TableOfContents from "./TableOfContents";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import ThreeScene from "../threejsdemo/ThreeScene"

const images = {}

function importAll(r) {
    r.keys().forEach((key) => images[key] = r(key));
}
  
importAll(require.context('../../imgs/', false, /\.(png|jpe?g|svg)$/));

export default function Entries (props) {
    const darkMode = useOutletContext()[0];
    let data_file = getEntries();
    let entries = data_file.map( entry => {
        let data = {...entry}
        data.darkMode = darkMode
        data.images = images;
        data.key = entry.num;
        return (
            // <div key={data.key}>
                <ShortEntry {...data}/>
                // {/* <Link to={`/projects/${entry.link}`} > {entry.title} </Link> */}
            // </div>
        )
        })
        
    return (
        <div className="entries" > 
            {/* <Outlet context={darkMode}/> */}
            {/* {console.log(createBrowserHistory())} */}
            {entries}
            {/* <ThreeScene /> */}
        </div>
        )
  }