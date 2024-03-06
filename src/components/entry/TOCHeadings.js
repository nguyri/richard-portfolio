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
    let nestedHeadings = [];
    let darkMode = props.darkMode;

    for (let i = 0; i < longDescription.length; i++) {
        if (longDescription[i].title) {
            nestedHeadings.push({ ...longDescription[i], subtitles: [] });
        } else if (longDescription[i].subtitle) {
            nestedHeadings[nestedHeadings.length - 1].subtitles.push(longDescription[i]);
        }
    }

    // console.log(longDescription);
    // console.log(nestedHeadings);
    return (
        <ul>
        {nestedHeadings.map((titleItem) =>
            <li key={titleItem.key} className={"headings-li"}>
                <a href={`#${titleItem.key}`}
                    className={darkMode ?
                        titleItem.key == activeId ? "headings-a-active-dark" : "headings-a-dark" :
                        titleItem.key == activeId ? "headings-a-active" : "headings-a"}
                    >{titleItem.title}</a>
                    {titleItem.subtitles.length > 0 &&
        <ul>
        {titleItem.subtitles.map((subtitleItem) =>
            <li key={subtitleItem.key} className={"headings-li"}>
                <a
                href={`#${subtitleItem.key}`}
                className={darkMode ?
                    subtitleItem.key == activeId ? "headings-a-active-dark" : "headings-a-dark" :
                    subtitleItem.key == activeId ? "headings-a-active" : "headings-a"
                    }
                >{subtitleItem.subtitle}</a>
            </li>
        )}
        </ul>
        }
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