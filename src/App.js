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

  
  // this grabs the time and adds it as another p element in the chat box
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
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

      <div className="headerDiv">
        <header className='header'>
          <h1 className='fontFace headerText'>stank chat 42</h1>
        </header>
      </div>
      <div className="message">
        {
          message.map((msg) => {
            return (
              <li key={msg.key} className='messageLi'>
                <p className='fontFace messageP'>{msg.name}</p>
                <p className='fontFace messageP messageTime'>{time}</p>
                <button className='removeButton' onClick={() => { handleRemoveMsg(msg.key) }}>🚽</button>
              </li>
            )
          })
        }
      </div>
      <div>
        <form action='submit' className='form' >

          <label htmlFor="newMessage"></label>
          <input type="text" id='newMessage' placeholder='be nice' className='fontFace userInput' onChange={handleChangeInput} value={userInput} required />

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

































