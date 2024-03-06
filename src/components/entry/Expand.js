import React from 'react'
// import {useTransition} from 'transition-hook'
import {data} from './dataReactTut'
import './Expand.css'

export function Expand (props) {
    const [showExpand, setShowExpand] = React.useState(0);
    // const {stage, shouldMount} = useTransition(showExpand, 300);

    const handleClick = () => {
        setShowExpand(!showExpand);
    }

    const ExpandBlock = (props) => {
        return (<div className='expand--block' style={{}}>{props.content}  </div>);
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
    {props.list ? <li>{formatName(props.name, props.highlight)}</li> : formatName(props.name, props.highlight)}
    {showExpand ? <ExpandBlock content={props.content}/> : <></> } 
    {/* #makes a "0" when && is used.. */}
    </>);
}

export function ExpandList () {
    return <ul style={{listStylePosition:"outside"}}>
        {data.map((elem) => <li>{elem}</li>)}
    </ul>;
}