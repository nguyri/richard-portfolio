import React from "react"
import Entries from "./Entries"
import TableOfContents from "./TableOfContents"
import {getImage} from "./data"
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";

export default function EntriesLayout(props) {
    const [darkMode, setShrinkHeader] = useOutletContext();
    const entriesRef = React.useRef();

    const handleScroll = () => {
        setShrinkHeader(entriesRef.current.scrollTop > 50) ;
    };

    const scrollToTop = () => {
        entriesRef.current.scrollTo(0,0);
    }

    return (
        
        <div className="entries-layout" ref={entriesRef} onScroll={handleScroll}>
            {/* <link rel="icon" type="image/x-icon" src={getImage('./favicon.png') ? getImage('./favicon.png') : ""}></link>
            {console.log(getImage('./favicon.png'))} */}
            {/* <TableOfContents /> */}
            <Outlet context={[...useOutletContext(), scrollToTop]}/>
            {/* <Entries /> */}
        </div>
    )
}