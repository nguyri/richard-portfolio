import React from "react"
import Entries from "./Entries"
import TableOfContents from "./TableOfContents"
import {getImage} from "./data"
import { Link, Outlet, useOutletContext } from "react-router-dom";

export default function EntriesLayout(props) {
    const darkMode = useOutletContext();
    return (
        <div className="entries-layout">
            {/* <link rel="icon" type="image/x-icon" src={getImage('./favicon.png') ? getImage('./favicon.png') : ""}></link>
            {console.log(getImage('./favicon.png'))} */}
            {/* <TableOfContents /> */}
            <Outlet context={darkMode}/>
            {/* <Entries /> */}
        </div>
    )
}