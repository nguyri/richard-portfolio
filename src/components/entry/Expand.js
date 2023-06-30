import React from 'react'
import './Expand.css'

const Expand = (props) => {
    const [showExpand, setShowExpand] = React.useState(0);

    const handleClick = () => {
        setShowExpand(!showExpand);
    }

    const formatName = (name, highlight) => {
        let index = name.indexOf(highlight);
        if( index >= 0) {
            return ( <>
            {props.name.slice(0,index)}
            <a onClick={handleClick} className={'expand--anchor'}>{props.highlight}</a>
            {props.name.slice(index+props.highlight.length)}
            </> );
        } else {
            return (
            <a onClick={handleClick} className={'expand--anchor'}>{props.name}</a> );
        }
    }

    return (<>
    { showExpand ? 
        <div className='expand--block'><div><a onClick={handleClick} className={'expand--anchor'}>{props.name}</a> </div> {props.content} </div> :
        formatName(props.name, props.highlight)
    }
    </>);
}

export default Expand;