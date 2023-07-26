import React from 'react'
import {Expand} from './Expand'
import {CodeBlock, Code} from '@atlaskit/code'

export let data = <ul style={{listStylePosition:"inside"}}>
    <Expand name='Components are independent blocks of code that return HTML.' 
    highlight='Components' list = {true}
    content= 
    {<> Components can import modules they need and export themselves at the bottom of their files. 
        A simple component looks like this: 
        <CodeBlock language='jsx' text=
    {`function MyComponent () {
    return (
        <div className="App"> 
            <h1> My first React App </h1>
        </div>
        )}`}/>
        </>}>
    </Expand> 
    <Expand name='Component functions are named in PascalCase' 
    highlight='PascalCase' list={true}
    content= {
        <>A phrase written in capital letters, without punctuation or spaces </>
    }></Expand>
    <Expand name='You can use JSX variables by putting them in curly braces' 
    highlight = 'putting them in curly braces' list = {true}
    content = {
        <> A strength of React is that you can write plain Javascript inside HTML. This is done by adding curly braces. 
        <CodeBlock language='jsx' highlight={"5"} text = 
        {`function MyComponent (props) {
    return (
        <div className="my-component"> 
            <h1> My first React Component </h1>
            The value of my props is: {props.value}
        </div>
        )}`}
        />
        </>
    }
    >
    </Expand>
    <Expand name='Some JSX attributes are different to avoid name conflict' 
    highlight='name conflict'
    list = {true}
    content= {
        <>For example, setting a CSS class uses the keyword className: <Code>{`<MyComponent className="my-component-style">`}</Code> </>
    }></Expand>
    <Expand name='Props are written like attributes, directly into the angle brackets and passed into components, often with the name (props)'
    highlight='Props'
    list = {true}
    content= {
        <>Give a prop to a component by writing <Code>{`<MyComponent myProp={myPropValue}>`}</Code>. Inside MyComponent it can be used as 
        <CodeBlock language='jsx' text = {
`const MyComponent = (props) => {
    return (
        <h1> My prop value is: {props.myPropValue} </h1>
    )}`}></CodeBlock> </>
    }></Expand>
    <Expand name='Some JSX attributes are different to avoid name conflict' 
    highlight='name conflict'
    list = {true}
    content= {
        <>For example, setting a CSS class uses the keyword className: <Code>{`<MyComponent className="my-component-style">`}</Code> </>
    }></Expand>
    <Expand name='Events like onClick are written directly into the elements with JSX'
    highlight='Events'
    list = {true}
    content= {
        <>Instead of finding a DOM node, then attaching listeners, React allows you to directly attach a callback function to an event
         <Code>{`<MyComponent onClick={handleClick}>`}</Code>. </>
    }></Expand>
    <Expand name='State defines some data that will be tracked. When the state changes the elements tracking it will automatically update.'
    highlight='State'
    list = {true}
    content= {
        <>Give a prop to a component by writing <Code>{`<MyComponent myProp={myPropValue}>`}</Code>. Inside MyComponent it can be used as 
        <CodeBlock language='jsx' text = {
`const MyComponent = () => {
    const [clicked, setClicked] = React.useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }
    return ( <> 
        <a onClick={handleClick}> Set Clicked </a>
        <h1> My state value is: {clicked} </h1> 
        </>
    )}`}></CodeBlock> </>
    }></Expand>
    <Expand name='To synchronize two states, useEffect will make an effect occur after a state changes'
    highlight='useEffect'
    list = {true}
    content= {
        <>Remember to make sure useEffect is necessary before using it. Usually giving the state to the parent component, "elevating state" is sufficient.  If you have to use useEffect, put the empty braces to only useEffect once, or a state to useEffect on.
        <CodeBlock language='jsx' text = {
`React.useEffect( () => {
    setRows( (prevRows) => {
        const playerRow = prevRows[playerIndex]
        playerRow.squares = playerRow.squares.map((square, index) => ({letter: [...playerRow.letters][index], color: styles[index]}))
        
        return prevRows.map( (row) => row.player ? playerRow : row);
    }, [validSubmit, styles])`}></CodeBlock> </>
    }></Expand>
    <Expand name='You can avoid DOM queries for the most part. If you need need access to the element, useRef provides a reference.'
    highlight='useRef'
    list = {true}
    content= {
        <>Get a ref by assigning it where the component is created. <Code>{`<Gallery ref={galleryRef}>`}</Code>. The ref can be accessed with .current to get DOM properties.
        <CodeBlock language='jsx' text = {
`const galleryRef = React.useRef();
    export default function Gallery () => {
    const handleScroll = () => {
        setShrinkHeader(galleryRef.current.scrollTop > 50) ;
    };
    return (
        <div className="gallery" ref = {galleryRef} onScroll={handleScroll} >
    );
}
`}></CodeBlock> </>
    }></Expand>
    </ul>
