import React from "react"
import Entries from "./Entries"
import TableOfContents from "./TableOfContents"
import {getImage} from "./data"
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";

export default function EntriesLayout(props) {
    const context = useOutletContext();
    const darkMode = context[0];
    const setShrinkHeader = context[3]; // Assuming layout sent: [darkMode, setDarkMode, shrinkHeader, setShrinkHeader]

    const entriesRef = React.useRef();

    const handleScroll = () => {
        if (setShrinkHeader) {
            setShrinkHeader(entriesRef.current.scrollTop > 50);
        }
    };

    const scrollToTop = () => {
        entriesRef.current.scrollTo(0, 0);
    };

    React.useEffect(() => {
        if (setShrinkHeader) {
            setShrinkHeader(false);
        }
    }, [setShrinkHeader]);

    // Apply the CSS scope dynamically right here
    const themeClass = darkMode ? 'code-theme--dark' : 'code-theme--light';

    return (
        <div className={`entries-layout ${themeClass}`} ref={entriesRef} onScroll={handleScroll}>
            {/* Pass everything down cleanly along with your layout scroll controller */}
            <Outlet context={[...context, scrollToTop]}/>
        </div>
    );
}