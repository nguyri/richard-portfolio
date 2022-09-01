import React from "react"
import Entries from "./Entries"
import TableOfContents from "./TableOfContents"

export default function EntriesLayout(props) {
    return (
        <div className="entries-layout">
            <Entries />
            <TableOfContents />
        </div>
    )
}