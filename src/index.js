import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function AddPersonForm() {
  const [ person, setPerson ] = useState("");
    
   function handleChange(e) {
    setPerson(e.target.value);
  }
    
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" 
        placeholder="Add new contact" 
        onChange={handleChange} 
        value={person.name} />
      <button type="submit">Add</button>
    </form>
  );
}

function PeopleList(props) {
  const arr = props.data;
  const listItems = arr.map((val, index) =>
    <li key={index}>{val}</li>
  );
  return <ul>{listItems}</ul>;
}

function ContactManager(props){
  const [contacts, setContacts] = useState(props.data);
  
  return(
    <div>
      <AddPersonForm></AddPersonForm>
      <PeopleList data={contacts}></PeopleList>
    </div>
  );
}

const contacts = ["James Smith", "Thomas Anderson", "Bruce Wayne"];
const el = (
  <div>
    <AddPersonForm />
    <PeopleList data={contacts} />
  </div>
);

root.render(
  el
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
