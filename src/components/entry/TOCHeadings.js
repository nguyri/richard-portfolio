import React from "react";

const TOCHeadings = ({props}) => (
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
    <ul>
        {console.log("in tocheadings", props, props.longdescription)}
        {
            <li key={props.num} className="headings-li">
                <a href={`#${props.num}`}>{props.title}</a>
                { props.longdescription.length > 0 && (
                    <ul>
                    { props.longdescription.map((item) => (
                        item.subtitle && 
                            <li key={props.num} className="headings-li"> 
                                <a href={`#${item.key}`}>{item.subtitle}</a> 
                            </li>
                    ))}
                    </ul>
                )}
            </li>
        }
    </ul>
);

export default TOCHeadings;