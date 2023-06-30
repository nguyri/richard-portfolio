import React from 'react'
import './Expand.css'

const Expand = (props) => {
    const [showExpand, setShowExpand] = React.useState(0);

    const handleClick = () => {
        setShowExpand(!showExpand);
    }
    return (<>
    { <div><a onClick={handleClick} className={'expand--anchor'}>{props.name}</a></div> }
    { showExpand && props.content }
    </>);
}

export default Expand;