import React from "react"
import Confetti from "react-confetti"
import Keyboard from "./Keyboard"
import Grid from "./Grid"
import dictionary from './dictionary'
import './Wordle.css'


export default function Wordle() {
    const [rows, setRows] = React.useState (() => initRows()) ;
    const word = "fjord"
    const [styles, setStyles] = React.useState (() => ["white","white","white","white","white" ])
    const [keyStyles, setKeyStyles] = React.useState (() => initKeyStyles())
    const [playerIndex, setPlayerIndex] = React.useState(() => 0);
    const [validSubmit, setValidSubmit] = React.useState(() => false);
    const [wordle, setWordle] = React.useState(() => false);
    const [endOfGame, setEndOfGame] = React.useState(() => false);

    React.useEffect( () => {
        setRows( (prevRows) => {
            const playerRow = prevRows[playerIndex]
            playerRow.squares = playerRow.squares.map((square, index) => ({letter: [...playerRow.letters][index], color: styles[index]}))
            return prevRows.map( (row) => row.player ? playerRow : row);
        })

        //submitted something 
        if (validSubmit) {
            nextRow();
            setValidSubmit(false);
            if(playerIndex === rows.length) {
                setEndOfGame(true);
            }
            setStyles(["white","white","white","white","white" ]);
        } 

        // lost game
        if(playerIndex === rows.length - 1 && validSubmit) {
            setEndOfGame(true);
        }

        // won game
        if(rows[playerIndex].letters === word) {
            setWordle(true);
            setEndOfGame(true);
        }

    }, [validSubmit, styles])
    

    function initKeyStyles() {
        const letters = "qwertyuiopasdfghjkl!zxcvbnm@"
        const letterStyles = [...letters].map((char) => ({letter: char, color: 'white'}))
        return letterStyles;
    }

    function initRows () {
        const rows = []
        for (let i = 0; i < 6; i++) {
            rows.push({squares: initSquares(), letters: '', squareNum: 5});
        }
        return rows;
    }

    function initSquares () {
        const squares = []
        for(let i = 0; i < 5; i++) {
            squares.push({letter: 'a', color:'white'});
        }
        return squares;
    }

    function addLetter(letter) {
        if(wordle) return;

        setRows( (prevRows) => {
            const playerRow = rows[playerIndex]
            if (playerRow.letters.length < 5) {
                playerRow.letters = playerRow.letters.concat(letter);
            }
            return prevRows.map( (row) => row.player ? playerRow : row);
        })
    }

    function removeLetter() {
        if (wordle) return;

        setRows( (prevRows) => {
            const pushRow = rows[playerIndex]
            pushRow.letters = pushRow.letters.slice(0,-1);
            return prevRows.map( (row) => row.player ? pushRow : row);
        })
    }

    function submit() {
        const playerRow = rows[playerIndex]

        let colors = []
        if (playerRow.letters.length !== 5 || !(inDictionary(playerRow.letters))) {
            colors = playerRow.squares.map(() => "#ffb7b8") //red
            setValidSubmit(false);
        } else {
            colors = [...playerRow.letters].map((playerLetter, index) => 
                playerLetter === word[index] ? "#a4dfa3" : //green 
                [...word].some( (wordLetter) => wordLetter === playerLetter) ? "#fbf993" :  //yellow
                "#d7d7d7" //grey
                )
            
            for (let i = 0; i < [...playerRow.letters].length; i++) {
                const letter = [...playerRow.letters][i]
                //("in submit", keyStyles)
                setKeyStyles( (prevStyles) => {
                    const newStyles = prevStyles.map((style) => 
                        (letter) === style.letter ? 
                        {...style, color: colors[i]} : 
                        style)
                    return newStyles;
                })
            }
            setValidSubmit(true);
        }
        setStyles(colors)
    }

    function resetGame() {
        setWordle(false);
        setRows(initRows())
        setPlayerIndex(0);
        setEndOfGame(false);
        setKeyStyles(initKeyStyles());
    }

    function inDictionary(lookup) {
        return dictionary.some((word) => word === lookup);
    }

    function nextRow() {
        if(playerIndex < rows.length - 1)
            setPlayerIndex(playerIndex + 1);
    }

    return (
        <div className = 'wordle'>
            <h1> Wordle </h1>
            {endOfGame && 
                <div className="reset">
                    {wordle ? <p>Wordle!<Confetti /></p> : <p> Try again </p>}
                    <button className="reset--button" onClick={resetGame}> Retry </button>
                </div>
            }
            {!wordle && 
            <p> Guess the 5 letter word! </p>}
            <div className="grid">
                {<Grid rows={rows}/>}
            </div>
            <Keyboard addLetter={addLetter} removeLetter={removeLetter} submit={submit} keyStyles={keyStyles}/>
        </div>
    )
}