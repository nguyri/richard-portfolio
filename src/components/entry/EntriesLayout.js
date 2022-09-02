import React from "react"
import Entries from "./Entries"
import TableOfContents from "./TableOfContents"
import {getImage} from "./data"

export default function EntriesLayout(props) {
    return (
        <div className="entries-layout">
            {/* <link rel="icon" type="image/x-icon" src={getImage('./favicon.png') ? getImage('./favicon.png') : ""}></link>
            {console.log(getImage('./favicon.png'))} */}
            <TableOfContents />
            <Entries />
        </div>
    )
}