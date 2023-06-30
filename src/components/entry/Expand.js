import React from 'react'
import './Expand.css'

const Expand = (props) => {
    const [showExpand, setShowExpand] = React.useState(0);

    const handleClick = () => {
        setShowExpand(!showExpand);
    }
    return (<>
    { showExpand ? 
        <div className='expand--block'><div><a onClick={handleClick} className={'expand--anchor'}>{props.name}</a> </div> {props.content} </div> :
        <a onClick={handleClick} className={'expand--anchor'}>{props.name}</a>
    }
    </>);
}

export default Expand;