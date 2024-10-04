import React, {useState, useEffect} from 'react';

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
  
    return (
      <div className="express--main">
        <h1>{message}</h1> {/* Display message from GET request */}
        <button onClick={handleClick}>GET request</button>
  
        <form action={formAction}>
          <label>
            Enter your query:
            <input type="text" name="query"/>
          </label>
          <button type="submit">Send Name</button>
        </form>
  
        <h2>{response}</h2> {/* Display response from POST request */}
      </div>
    );
}

export default ExpressDemo;