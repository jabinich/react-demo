import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import './index.css';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux'
import Counter from './Counter';

import reportWebVitals from './reportWebVitals';

function AddPersonForm(props) {
  const [ person, setPerson ] = useState('');
    
   function handleChange(e) {
    setPerson(e.target.value);
  }
    
  function handleSubmit(e) {
    if (person.trim().length != 0) {
      props.handleSubmit(person);
    }
        setPerson('');
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" 
        placeholder="Add new contact" 
        onChange={handleChange} 
        value={person} />
      <button type="submit">Add</button>
    </form>
  );
}

function PeopleList(props) {
  const arr = props.data;

  function delContact(index){
    const newContacts = [...arr];
    newContacts.splice(index, 1);
    props.handleDelete(newContacts);
  }

  const listItems = arr.map((val, index) =>
    <div className='item_div'>
    <li key={index}>{val}</li>
    <button onClick={ ()=> delContact(index) }>Remove</button>
    </div>
  );
  return <ul>{listItems}</ul>;
}

function ContactManager(props){
  const [contacts, setContacts] = useState(props.data);

  function addPerson(name){
    setContacts([...contacts, name]);
  }
  
  function deletePerson(newContacts){
    setContacts(newContacts);
  }

  return(
    <div>
      <AddPersonForm handleSubmit={addPerson}></AddPersonForm>
      <PeopleList data={contacts} handleDelete={deletePerson}></PeopleList>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const contacts = ["James Smith", "Thomas Anderson", "Bruce Wayne"];

root.render(
  <ContactManager data={contacts} />
);

/*****************************
an Expample for counter
*****************************/

//reducer
const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { count: state.count + action.num };
    default:
      return state;
  }
}

//store
//const store = createStore(reducer);
const store = createStore(reducer);

const el = <Provider store={store}>
    <Counter/>
  </Provider>; 

//const el = <Counter />; 
ReactDOM.render(
  el, 
  document.getElementById('divCounter')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
