import React from "react"
import Collapsible from 'react-collapsible';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import "./Entry.css"
import mpcnc from "../../imgs/mpcnc1.jpg"
import adlathe from "../../imgs/addlathe1.jpg"
import raytracer from "../../imgs/raytracer1.jpg"
import wordle from "../../imgs/wordle1.png"

function Example() {
    const [showButton, setShowButton] = React.useState(true);
    const [showMessage, setShowMessage] = React.useState(false);
    return (
        <Container style={{ paddingTop: '2rem' }}>
            {showButton && (
                <Button
                    onClick={() => setShowMessage(true)}
                    size="lg"
                >
                    Show Message
                </Button>
            )}
            <CSSTransition
                in={showMessage}
                timeout={300}
                classNames="alert"
                unmountOnExit
                onEnter={() => setShowButton(false)}
                onExited={() => setShowButton(true)}
            >
                <Alert
                    variant="primary"
                    dismissible
                    onClose={() => setShowMessage(false)}
                >
                    <Alert.Heading>
                        Animated alert message
                    </Alert.Heading>
                    <p>
                        This alert message is being transitioned in and
                        out of the DOM.
                    </p>
                    <Button onClick={() => setShowMessage(false)}>
                        Close
                    </Button>
                </Alert>
            </CSSTransition>
        </Container>
    );
}

export default function Entry(props) {
    // eventually change this to webpack import
    const imgList = [mpcnc, adlathe, raytracer, wordle]
    const [entryIsSmall, setEntryIsSmall] = React.useState(true);

    function smallEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"}>
                <img src={imgList[props.imageNum]} className="entry--img" />
                {/* <div className="overlay"> */}
                <div className="entry--col">
                    <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1>
                    <p className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {props.description} </p>
                </div>

            </div>
        )
    }

    function paragraphBigEntry(paragraphArr) {
        return (paragraphArr.map((elem) =>
            <p className={props.darkMode ? "entry--text entry--dark" : "entry--text"}> {elem.text} </p>
        )
        )
    }

    function bigEntry() {
        return (
            <div className={props.darkMode ? "entry entry--dark" : "entry"}>
                <img src={imgList[props.imageNum]} className="entry--img" style={{ width: "20vw" }} />
                <div className="entry--col">
                    <h1 className={props.darkMode ? "entry--title entry--dark" : "entry--title"}> {props.title} </h1>
                    {paragraphBigEntry(props.longdescription)}
                </div>
                <Button
                    onClick={() => setEntryIsSmall(!entryIsSmall)}
                    size="lg"
                >
                Show Less
                </Button>
            </div>
        )
    }

    return (
        <div>
            {entryIsSmall && smallEntry()}
            {entryIsSmall && (
                <Button
                onClick={() => setEntryIsSmall(!entryIsSmall)}
                size="lg"
            >
                Show More
            </Button>
            )}
            <CSSTransition
                in={!entryIsSmall}
                timeout={300}
                classNames="alert"
                unmountOnExit
                onEnter={() => setEntryIsSmall(false)}
                onExited={() => setEntryIsSmall(true)}
            >
                {bigEntry()}

            </CSSTransition>

        </div>
        // <Collapsible trigger={smallEntry()} triggerWhenOpen={<div>{props.title}</div>}>
        //     {bigEntry()}
        // </Collapsible>
    )
}
