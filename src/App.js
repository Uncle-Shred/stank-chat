import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import { useState, useEffect } from 'react';

function App() {
  const [message,  setMessage] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [firstName, setFirstName] = useState('');
  useEffect( () => {
    // database details
    const database = getDatabase(firebase)
    // variable to reference location in database
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
            name: data[key]
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
      setUserInput('')
    }
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
                  <button className='remove-button' onClick={() => { handleRemoveMsg(msg.key) }}>🚽</button>
                </li>
              
                  
              )
            })
          }
      </div> 
        <form className='form' onSubmit={handleSubmit}>
         <input type="text" id='newMessage' placeholder='Say Something nice' className='font-face user-input' onChange={handleChangeInput} required />
          <button onClick={handleSubmit} type='submit' className='submitButton'>💩</button>
        </form>
       
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

































