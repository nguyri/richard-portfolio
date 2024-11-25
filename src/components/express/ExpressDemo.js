import React, {useState, useEffect} from 'react';
import './ExpressDemo.css'
import { nanoid } from 'nanoid';

function validTile (tile) {
  //dg or d1 acceptable..
  let validSuit = ['b','c','m', 'd', 'w']
  let validDragon = ['r','w','g']
  let validWind = ['n','e','s','w']
  if (tile.length != 2) return false;
  let suit = tile.at(0);
  let value = tile.at(1);
  if (!validSuit.some(valid => valid === suit)) return false;
  
  const parsed = parseInt(value)
  if( parsed && suit === 'd') return ( parsed >= 1 && parsed <=3 )
  if( parsed && suit === 'w' ) return ( parsed >= 1 && parsed <=4 )

  if ( suit === 'd' ) return (validDragon.some(valid => valid === value))
  if ( suit === 'w' ) return (validWind.some(valid => valid === value))

  return 0 < value && value < 10;
}

function getMahjongUnicode(tile) {
  tile = tile.replace('/\s+/g','');
  const suit = tile.charAt(0); 
  if (!validTile(tile)) { return 'x'; }

  const dragonNums = {g:2,r:1,w:3}
  const windNums = {n:4,e:1,s:2,w:3}
  const dragon = tile.charAt(0) === 'd';
  const wind = tile.charAt(0) === 'w';

  const suitsUnicode = {b:0x1F010, c:0x1F019, m: 0x1F007, d:0x1F004, w:0x1F000};
  if ( !suitsUnicode[suit] ) {console.error("Invalid suit for suits unicode"); return;}
  
  let tileNumber = parseInt(tile.charAt(1)); 
  if ( dragon ) { tileNumber = dragonNums[tile.charAt(1)] }
  if ( wind ) { tileNumber = windNums[tile.charAt(1)] }
  
  const unicode = String.fromCodePoint(suitsUnicode[suit] + (tileNumber - 1));
  if ( tile === 'dr' ) { String.fromCodePoint(0x1F004) + '\uFE0E'} // VS15 text presentation for dragon red
  return unicode;
}

function unicodeTiles (handStr) {
  const split = handStr.split(' ');
  // console.log(split)
  let unicodeTiles = ''
  split.forEach((tile) => unicodeTiles+=getMahjongUnicode(tile));
  return unicodeTiles;
}

function ExpressDemo (props) {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [warning, setWarning] = useState('');
  
    // GET request to the Express server
    const handleClick = (e) => {
        e.preventDefault();
            fetch('http://localhost:3001/api/message')
              .then((res) => res.json())
              .then((data) => setMessage(data.message))
              .catch((err) => console.error('Error fetching message:', err));
          };

    // Handle form submission and send a GET request to the Express server
    const formAction = (formData) => {
      let query = formData.get("query").replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
      if( !query || query.trim() === '' ) { setWarning('No input'); return;}
      if( query.length !== 28 ) { setWarning('Invalid length hand'); return; }
      setIsLoading(true);

      fetch('https://api.nguyr.com/api/queries/riichi', {
      // fetch('http://localhost:3001/api/queries/riichi', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }), // Send the name as a JSON object
      })
        .then((res) => {
          setWarning('');
          if (!res.ok) {
            throw new Error('Server responded with an error');
          }
          return res.json();})
        .then((data) => setResponse(data))
        .catch((err) => setWarning('An unexpected error occurred: ' + err.message))
        .finally(() => {setIsLoading(false);});
    };
  

    const formatResponse = (response) => {
      // console.log('response', response);
      if (!response) return;

      // let obj = JSON.parse(response); // response is already a json object
      let query = response.query;
      let tests = response.tests;
      let results = response.results;

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
            {results.map((result) => <p key={nanoid()}>{String(result)}</p>)}
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
          <label> {warning && warning} </label>
        </form>
        {formatResponse(response)}
      </div>
    );
}

export default ExpressDemo;