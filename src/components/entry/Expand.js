import React from 'react'
import {useTransition} from 'transition-hook'
import './Expand.css'

const Expand = (props) => {
    const [showExpand, setShowExpand] = React.useState(0);
    const {stage, shouldMount} = useTransition(showExpand, 300);

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

    return (<div>
    {props.list ? <li>{formatName(props.name, props.highlight)}</li> : formatName(props.name, props.highlight)}
    {shouldMount ? <div className='expand--block' 
        style={{transition: '.3s', 
            opacity: stage === 'enter' ? 1 : 0,
            transform: stage === 'enter' ? 'unset' : 'translateY(-10px) scale(1)', }
            }>{props.content}  </div> : <></>}
    </div>);
}

export default Expand;