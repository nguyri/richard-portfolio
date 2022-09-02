import React from "react";

const TOCHeadings = ({props}) => (
    <ul>
        { props.map((heading) => (
            <li key={heading.num} className="headings-li">
                <a href={`#${heading.num}`}>{heading.title}</a>
            </li>
        ))}
    </ul>
);

export default TOCHeadings;