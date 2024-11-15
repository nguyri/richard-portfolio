import React, {useState, useEffect} from 'react';
import './ExpressDemo.css'
import { nanoid } from 'nanoid';

function validTile (tile) {
  let validSuit = ['b','c','m', 'd', 'w']
  let validDragon = ['r','w','g']
  let validWind = ['n','e','s','w']
  if (tile.length != 2) return false;
  let suit = tile.at(0);
  let value = tile.at(1);
  if (!validSuit.some(valid => valid === suit)) return false;

  if ( suit === 'd' ) return (validDragon.some(valid => valid === value))
  if ( suit === 'w' ) return (validWind.some(valid => valid === value))

  return 0 < value && value < 10;
}

function validHand (handStr) {
  // valid format is b1b2b3c1c2c3m1m2m3drdrdrdgdg, 4 melds one pair. Start with making sure tiles are valid
  if (handStr.length != 28) return false;
  const tiles = hand(handStr);
  console.log(tiles);
  let allValid = tiles.every(tile => validTile(tile));
  return allValid;
}

function getMahjongUnicode(tile) {
  const suit = tile.charAt(0); 
  if (!validTile) return;
  tile = tile.replace('dg', 'd1');
  tile = tile.replace('dr', 'd2');
  tile = tile.replace('dw', 'd3');
  tile = tile.replace('wn', 'w1');
  tile = tile.replace('we', 'w2');
  tile = tile.replace('ws', 'w3');
  tile = tile.replace('ww', 'w4');
  const tileNumber = parseInt(tile.charAt(1)); 
  console.log(tile);
  // Unicode mapping for Mahjong tiles
  let unicode = '';

  switch (suit) {
    case 'b': // Bamboo tiles (b1 - b9)
      unicode = String.fromCodePoint(0x1F000 + (tileNumber - 1)); 
      break;
    case 'c': // Character tiles (c1 - c9)
    unicode = String.fromCodePoint(0x1F00A + (tileNumber - 1));
      break;
    case 'm': // Man tiles (m1 - m9)
    unicode = String.fromCodePoint(0x1F012 + (tileNumber - 1));
      break;
    case 'd': // Dragon tiles (d1 - d3)
      unicode = String.fromCodePoint(0x1F013 + (tileNumber - 1));
    case 'w': // Wind tiles (w1 - w4)
      unicode = String.fromCodePoint(0x1F016 + (tileNumber - 1));
    default:
      console.error('Invalid tile input');
  }

  // Return the Unicode symbol for the tile
  return unicode;
}

function unicodeTiles (handStr) {
  const split = handStr.split(' ');
  let unicodeTiles = ''
  split.forEach((tile) => unicodeTiles+=getMahjongUnicode(tile));
  return unicodeTiles;
}

function ExpressDemo (props) {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState('');
  
    // GET request to the Express server
    const handleClick = (e) => {
        e.preventDefault();
            fetch('http://localhost:3001/api/message')
              .then((res) => res.json())
              .then((data) => setMessage(data.message))
              .catch((err) => console.error('Error fetching message:', err));
          };

    // Handle form submission and send a POST request to the Express server
    const formAction = (formData) => {
        let query = formData.get("query");
        query.replace(' ','').toLowerCase();
        fetch('http://localhost:3001/api/data', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }), // Send the name as a JSON object
        })
            .then((res) => res.json())
            .then((data) => setResponse(data.message))
            .catch((err) => console.error('Error posting data:', err));
    };

    const formatResponse = (response) => {
      if (!response) return;

      let obj = JSON.parse(response);
      let query = obj.query;
      let tests = obj.tests;
      let results = obj.results;

      console.log(response);
      return (
        // <div className="express--response" style={{gridTemplateColumns:`repeat(${tests.length || 1},auto)`}}>
        <div className="express--response"> 
          <div className="express--response-query" style={{gridColumn:`span 2`}}>
              {query}
            </div>
          <div className="express--response-tiles" style={{gridColumn:`span 2`}}>
            {unicodeTiles(query)}
          </div>
          <div className="express--response-tests" >
            {tests.map((test) => <p key={nanoid()}>{test}</p>)}
          </div>
          <div className="express--response-results">
            {results.map((result) => <p key={nanoid()}>{result}</p>)}
          </div>
        </div>
      );
    }
  
    return (
      <div className="express--main">
        <p>{message}</p> {/* Display message from GET request */}
        {/* <button onClick={handleClick}>GET request</button> */}
  
        <form action={formAction}>
          <label>
            Enter your hand:
          </label>
          <input type="text" name="query"/>
          <button type="submit">Send Hand</button>
        </form>
        {formatResponse(response)}
      </div>
    );
}

export default ExpressDemo;