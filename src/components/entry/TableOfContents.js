import React from "react";
import { getEntries } from './data'
import { useParams, useOutletContext } from "react-router-dom";
import TOCHeadings from './TOCHeadings'

const useIntersectionObserver = (setActiveId) => {
    const headingElementsRef = React.useRef({});

    React.useEffect (() => {
        const callback = (headings) => {
            headingElementsRef.current = headings.reduce((map, headingElement) => {
                map[headingElement.target.id] = headingElement;
                return map;
            }, headingElementsRef.current);
        
            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
                const headingElement = headingElementsRef.current[key];
                if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
            });
    
            const getIndexFromId = (id) =>
                headingElements.findIndex((heading) => heading.id === id);
    
            if (visibleHeadings.length === 1) {
                setActiveId(visibleHeadings[0].target.id);
            } else if (visibleHeadings.length > 1) {
                const sortedVisibleHeadings = visibleHeadings.sort(
                    (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
                );
                setActiveId(sortedVisibleHeadings[0].target.id);
            };
        };


    const observer = new IntersectionObserver(callback, {
        // rootMargin: '-110px',
        threshold:1.0,
        rootMargin: '-40px 0px -60% 0px',
    });

    const headingElements = Array.from(document.querySelectorAll("h2, h3"));
    // console.log(headingElements, headingElementsRef);
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
    }, [setActiveId]);
  };

const TableOfContents = (props) => {
    const [activeId, setActiveId] = React.useState();
    let params = useParams();
    let data_file = getEntries();
    const darkMode = useOutletContext()[0];
    // console.log(darkMode);

    useIntersectionObserver(setActiveId);
    // console.log(props);

    const hasWriting = props.entrydata.longdescription.some((elem) => elem.text || elem.html);

    return (
        <div className={hasWriting && "table-of-contents"}>
            {/* <TOCHeadings props={data_file}/> */}
            {hasWriting && 
             <TOCHeadings longdescription={props.entrydata.longdescription} activeId={activeId} darkMode={darkMode} />}
            
        </div>
    );
};

export default TableOfContents;