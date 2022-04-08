import React from "react";
import Entry from "./Entry";
import { getEntries } from "./data"
import { Link, Outlet, useOutletContext } from "react-router-dom";
import ThreeScene from "../threejsdemo/ThreeScene"

const images = {}

function importAll(r) {
    r.keys().forEach((key) => images[key] = r(key));
}
  
importAll(require.context('../../imgs/', false, /\.(png|jpe?g|svg)$/));

export default function Entries (props) {
    const darkMode = useOutletContext();
    let data_file = getEntries();
    let entries = data_file.map( entry => {
        let data = {...entry}
        data.darkMode = darkMode
        data.images = images;
        data.key = entry.num;
        return (
            <div key={data.key}>
                {/* <Entry {...data}/> */}
                <Link to={`/projects/${entry.link}`} > {entry.title} </Link>
            </div>
        )
        })
        
    return (
        <div className="entries" > 
            {entries}
            <Outlet />
            {/* <ThreeScene /> */}
        </div>
        )
  }