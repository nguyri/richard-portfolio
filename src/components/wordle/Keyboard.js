import React from "react"
import {nanoid} from 'nanoid'


function Key (props) {
    const backspace = props.char === "!";
    const submit = props.char ==="@";
    const useIcon = backspace || submit ? "material-icons-round " : "keyboard--letter";
    const callback = backspace ? 
        () => props.removeLetter() : 
        submit ? 
        () => props.submit() :
        () => props.addLetter(props.char)

    const styles = {
        backgroundColor: props.style.color
    }
    return (
        <button className="keyboard--key" style={styles} onClick={callback}>
            <div className = {useIcon}>
                {backspace ? "arrow_back" : 
                submit ? "check" :
                    props.char}
                </div>
        </button>
    )
}

function KeyboardRow (props) {

    return (
        <div className="keyboard--row">
            {[...props.letters].map((letter) => 
            <Key 
            char={letter} 
            key={nanoid()} 
            addLetter={props.addLetter} 
            removeLetter={props.removeLetter} 
            submit={props.submit}
            style={props.keyStyles.filter((style) => (style.letter) == letter)[0]}
            />)}
        </div>
    )
}

export default function Keyboard (props) {
    const letterRows = ["qwertyuiop","asdfghjkl","!zxcvbnm@"]
    return (
        <div className="keyboard">
            {[...letterRows].map((row) => 
            <KeyboardRow 
            letters={row} 
            key={nanoid()} 
            addLetter={props.addLetter} 
            removeLetter={props.removeLetter} 
            submit={props.submit}
            keyStyles={props.keyStyles}
            />)}
        </div>
    )
    }