import React from 'react'
import './Expand.css'
import {Code, CodeBlock} from '@atlaskit/code'

const Expand = (props) => {
    const [showExpand, setShowExpand] = React.useState(0);

    const data = [
        {name: `Components`,
        content: <span>An independent bit of code that returns HTML. A simple component looks like this: 
            <CodeBlock language='jsx' text={
`function MyComponent () {
    return (
        <div className="App"> 
            <h1> My first React App </h1>
        </div>
        )}`}/>
        </span>,
        }
    ]

    const handleClick = () => {
        setShowExpand(!showExpand);
    }
    return (<>
    { <span><a onClick={handleClick} className={'expand--anchor'}>{props.name}</a></span> }
    { showExpand && data.find(elem => elem.name == props.name).content }
    </>);
}

export default Expand;