import React from "react";

const TOCHeadings = (props) => {
    // <ul>
    //     {console.log("in tocheadings", props, props.longdescription)}
    //     {
    //         props.map((entry) => (
    //         <li key={entry.num} className="headings-li">
    //             <a href={`#${entry.num}`}>{entry.title}</a>
    //             { entry.longdescription.length > 0 && (
    //                 <ul>
    //                 { entry.longdescription.map((item) => (
    //                     item.subtitle && 
    //                         <li key={item.key} className="headings-li"> 
    //                             <a href={`#${item.key}`}>{item.subtitle}</a> 
    //                         </li>
    //                 ))}
    //                 </ul>
    //             )}
    //         </li>
    //         ))
    //     }
    // </ul>
    let heading = props.entrydata;
    let activeId = props.activeId;
    return (
    <ul >
        {
            <li key={heading.num} className={heading.num == activeId ? "headings-li-active" : "headings-li"}>
                <a id="toc" 
                    href={`#${heading.num}`}
                    >{heading.title}</a>
                { heading.longdescription.length > 0 && (
                    <ul>
                    { heading.longdescription.map((item) => (
                        item.subtitle && 
                            <li key={item.key} className={item.key == activeId ? "headings-li-active" : "headings-li"}> 
                                <a id="toc" 
                                    href={`#${item.key}`}
                                >{item.subtitle}</a> 
                            </li>
                    ))}
                    </ul>
                )}
            </li>
        }
    </ul>
    );
}

export default TOCHeadings;