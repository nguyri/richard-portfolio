import React, {useState, useEffect} from 'react';

export function validTile (tile) {
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

export function validHand (handStr) {
  // valid format is b1b2b3c1c2c3m1m2m3drdrdrdgdg, 4 melds one pair. Start with making sure tiles are valid
  if (handStr.length != 28) return false;
  const tiles = [];
  for (let i = 0; i < handStr.length; i+=2) {
    tiles.push(handStr.slice(i, i + 2));
  }
  let allValid = tiles.every(tile => validTile(tile));
  return allValid;
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
        const query = formData.get("query");
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
      return <div className="express--response">{obj.query}</div> 
    }
  
    return (
      <div className="express--main">
        <h1>{message}</h1> {/* Display message from GET request */}
        <button onClick={handleClick}>GET request</button>
  
        <form action={formAction}>
          <label>
            Enter your query:
            <input type="text" name="query"/>
          </label>
          <button type="submit">Send Hand</button>
        </form>
        {formatResponse(response)}
      </div>
    );
}

export default ExpressDemo;