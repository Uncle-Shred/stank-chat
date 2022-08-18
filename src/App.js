import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState([]);
  const [userInput, setUserInput] = useState('');
  useEffect(() => {
    // database details
    const database = getDatabase(firebase)
    // variable to reference location in database
    // connct to firebase on component mount
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      console.log(response.val());
      const newState = [];
      const data = response.val();
      //Loop over the data object and push each message into an empty array
      for (let key in data) {
        newState.push(
          {
            key: key,
            name: data[key],
          }
        )
      }
      setMessage(newState);
    })
  }, [])

  const handleChangeInput = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // create reference to the databse 
    const database = getDatabase(firebase)
    const dbRef = ref(database)
    if (userInput) {

      //add userInput to our firebase
      push(dbRef, userInput)
      // clear userInput
      setUserInput('');
    }
  }
  
  // variable as a promise to initiate time
  const date = new Date();
  //this grabs the time by hours/minutes/seconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // padTo2Digits just makes sure it gives the time two digits like 14:29:15
  const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;

  // function that returns the time plugged into the li below
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  const handleRemoveMsg = (msgId) => {
    const database = getDatabase(firebase)
    const dbRef = ref(database, `/${msgId}`)
    remove(dbRef)
  }

  return (
    <div className="App">

      <div className="header-div">
        <header className='header'>
          <h1 className='font-face header-text'>stank chat 42</h1>
        </header>
      </div>
      <div className="message">
        {
          message.map((msg) => {
            return (
              <li key={msg.key} className='message-li'>
                <p className='font-face message-p'>{msg.name}</p>
                <p className='font-face message-p message-time'>{time}</p>
                <button className='remove-button' onClick={() => { handleRemoveMsg(msg.key) }}>🚽</button>
              </li>
            )
          })
        }
      </div>
      <div>
        <form action='submit' className='form' >

          <label htmlFor="newMessage"></label>
          <input type="text" id='newMessage' placeholder='be nice' className='font-face user-input' onChange={handleChangeInput} value={userInput} required />

          <button onClick={handleSubmit} type='submit' className='submitButton'>💩</button>
        </form>
      </div>

    </div>
  );
}

export default App;


// PSEUDOWOODU
// - On app load, connect to firebase using the OnValue method

// - firebase db will contain user comment data with fields for "post" and "date"
//     - component state will store an array of objects containing the user comment data

// - provide the user with an input field to add comment and store this value in state(something like userInput)

// - on submit of this data, add both the comment and timestamp as a new firebase entry
//   - timestamp will come from JS Date 

































