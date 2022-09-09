import React from "react"
import Entries from "./Entries"
import TableOfContents from "./TableOfContents"
import {getImage} from "./data"
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";

export default function EntriesLayout(props) {
    const [darkMode, setShrinkHeader] = useOutletContext();
    const myRef = React.useRef();

    const handleScroll = () => {
        setShrinkHeader(myRef.current.scrollTop > 50) ;
    };
    return (
        
        <div className="entries-layout" ref={myRef} onScroll={handleScroll}>
            {/* <link rel="icon" type="image/x-icon" src={getImage('./favicon.png') ? getImage('./favicon.png') : ""}></link>
            {console.log(getImage('./favicon.png'))} */}
            {/* <TableOfContents /> */}
            <Outlet context={useOutletContext()}/>
            {/* <Entries /> */}
        </div>
    )
}