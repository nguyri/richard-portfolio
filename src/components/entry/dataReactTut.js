import React from 'react'
import {Expand} from './Expand'
import {CodeBlock, dracula} from 'react-code-blocks'

const Code = (props) => {
    return (<div className="expand--code">{props.codeString}</div>);
}

export let data = [
    <Expand name='Components are independent blocks of code that return HTML.' 
    highlight='Components'
    content= 
    {<> Components can import modules they need and export themselves at the bottom of their files. 
        A simple component looks like this: 
        <div className='expand--codeblock'>
        <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function MyComponent () {
    return (
        <div className="App"> 
            <h1> My first React App </h1>
        </div>
)}`}/> </div>
        </div>
        </>}>
    </Expand> ,
    
    <Expand name='Component functions are named in PascalCase' 
    highlight='PascalCase'
    content= {
        <>A phrase written in capital letters, without punctuation or spaces </>
    }></Expand>,

    <Expand name='You can use JSX variables by putting them in curly braces' 
    highlight = 'putting them in curly braces'
    content = {
        <> A strength of React is that you can write plain Javascript inside HTML. This is done by adding curly braces. 
        <div className="expand--codeblock"><CodeBlock language='jsx' highlight={"5"} text = 
{`function MyComponent (props) {
return (
<div className="my-component"> 
    <h1> My first React Component </h1>
    The value of my props is: {props.value}
</div>
)}`}
        /> </div>
        </>
    }
    >
    </Expand>,

    <Expand name='Some JSX attributes are different to avoid name conflict' 
    highlight='name conflict'
    content= {
        <>For example, setting a CSS class uses the keyword className: <Code codeString={`<MyComponent className="my-component-style">`}/> </>
    }></Expand>,

    <Expand name='Props are written like attributes, directly into the angle brackets and passed into components, often with the name (props)'
    highlight='Props'
    content= {
        <>Give a prop to a component by writing <Code codeString={`<MyComponent myProp={myPropValue}>`}/>. Inside MyComponent it can be used as 
<div className="expand--codeblock"><CodeBlock language='jsx' text = {
`const MyComponent = (props) => {
    return (    
        <h1> My prop value is: {props.myPropValue} </h1>
)}`}></CodeBlock> </div></>
    }></Expand> ,

    <Expand name='Events like onClick are written directly into the elements with JSX'
    highlight='Events'
    content= {
        <>Instead of finding a DOM node, then attaching listeners, React allows you to directly attach a callback function to an event
         <Code codeString={`<MyComponent onClick={handleClick}>`}/>. </>
    }></Expand>,

    <Expand name='State defines some data that will be tracked. When the state changes the elements tracking it will automatically update.'
    highlight='State'
    content= {
        <>Give a prop to a component by writing <Code codeString={`<MyComponent myProp={myPropValue}>`}/>. Inside MyComponent it can be used as 
        <div className="expand--codeblock"><CodeBlock language='jsx' text = {
`const MyComponent = () => {
    const [clicked, setClicked] = React.useState(false);
    const handleClick = () => {
        setClicked(!clicked);
}
return ( <> 
    <a onClick={handleClick}> Set Clicked </a>
        <h1> My state value is: {clicked} </h1> 
    </>
)}`}></CodeBlock> </div></>
    }></Expand>,

    <Expand name='To synchronize two states, useEffect will make an effect occur after a state changes'
    highlight='useEffect'

    content= {
        <>Remember to make sure useEffect is necessary before using it. Usually giving the state to the parent component, "elevating state" is sufficient.  If you have to use useEffect, put the empty braces to only useEffect once, or a state to useEffect on.
        <div className="expand--codeblock"><CodeBlock language='jsx' text = {
`React.useEffect( () => {
    setRows( (prevRows) => {
        const playerRow = prevRows[playerIndex]
        playerRow.squares = playerRow.squares.map((square, index) => ({letter: [...playerRow.letters][index], color: styles[index]}))
        
        return prevRows.map( (row) => row.player ? playerRow : row);
    }, [validSubmit, styles])`}></CodeBlock></div> </>
    }></Expand>,

    <Expand name='You can avoid DOM queries for the most part. If you need need access to the element, useRef provides a reference.'
    highlight='useRef'
    content= {
        <>Get a ref by assigning it where the component is created. <Code codeString={`<Gallery ref={galleryRef}>`}/>. The ref can be accessed with .current to get DOM properties.
        <div className="expand--codeblock"><CodeBlock language='jsx' text = {
`const galleryRef = React.useRef();
    export default function Gallery () => {
    const handleScroll = () => {
        setShrinkHeader(galleryRef.current.scrollTop > 50) ;
    };
    return (
        <div className="gallery" ref = {galleryRef} onScroll={handleScroll} >
    );
}
`}></CodeBlock></div> </>
    }></Expand>
];
