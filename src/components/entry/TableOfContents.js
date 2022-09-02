import React from "react";
import { getEntries } from './data'
import { useParams, useOutletContext } from "react-router-dom";
import TOCHeadings from './TOCHeadings'

const TableOfContents = (props) => {
    let params = useParams();
    let data_file = getEntries();

    return (
        <div className="table-of-contents">
            <TOCHeadings props={data_file}/>
            {/* <TOCHeadings props={props.props}/> */}
        </div>
    );
};

export default TableOfContents;