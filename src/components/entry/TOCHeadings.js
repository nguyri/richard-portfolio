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
    let longDescription = props.longdescription;
    let activeId = props.activeId;
    console.log(longDescription);
    return (
        <ul>
            { longDescription.map((item) => 
                item.title ?
                <li key={item.key} className={"headings-li"}>
                    <a
                        href={`#${item.key}`}
                        className={item.key == activeId ? "headings-a-active" : "headings-a"}
                        >{item.title}</a>
                </li> :
                item.subtitle && 
                <li key={item.key} className={"headings-li"}>
                    <a
                        href={`#${item.key}`}
                        className={item.key == activeId ? "headings-a-active" : "headings-a"}
                        >{item.subtitle}</a>
                </li>
            )}
        </ul>
        );
    }

export default TOCHeadings;

                //children toc headings
                /* { heading.longdescription.length > 0 && (
                    <ul>
                    { heading.longdescription.map((item) => (
                        item.subtitle ?  
                            <li key={item.key} className={"headings-li"}> 
                                <a className={item.key == activeId ? "headings-a-active" : "headings-a" }
                                    href={`#${item.key}`}
                                >{item.subtitle}</a> 
                            </li> :
                        item.title &&
                        <li key={item.key} className={"headings-li"}> 
                            <a className={item.key == activeId ? "headings-a-active" : "headings-a" }
                                href={`#${item.key}`}
                            >{item.title}</a> 
                        </li>
                    ))}
                    </ul>
                )} */