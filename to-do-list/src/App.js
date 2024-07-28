// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import { findDOMNode } from 'react-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {
  
  let [ToDoList,setToDoList] = useState([]);

  let saveToDoList = (event)=>{
    let todoName = event.target.todoName.value;
    if(!ToDoList.includes(todoName)){
      let finalToDoList = [...ToDoList,todoName];
      setToDoList(finalToDoList);
      NotificationManager.success('Item Successfully Added.');
    }
    else{
      NotificationManager.warning('Item Already Exists.');
    }
    event.preventDefault();
  }

  let list = ToDoList.map((value,index)=>{
    
    return(
      <ToDoListItems value={value} key={index} indexNumber = {index} ToDoList={ToDoList} setToDoList={setToDoList}/>
    )
  })

  return (
    <div className="App">
      <NotificationContainer/>
      <h1>To-Do-List</h1>
      <form onSubmit={saveToDoList}>
        <input type='text' name='todoName'></input>
        <button>Save</button>
      </form>

      <div className='outerDiv'>
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({value, indexNumber, ToDoList, setToDoList}) {

  let [status,setStatus] = useState(false);
  let deleteRow=()=>{
    let finalData = ToDoList.filter((v,i)=>i!=indexNumber)
    // console.log(finalData);
    setToDoList(finalData);
  }

  let checkStatus = ()=>{
    setStatus(!status);
  }
  return(
    <li className={status ? 'completeToDo' : ''} onClick={checkStatus}>{indexNumber+1}. {value}<span onClick={deleteRow}>&times;</span></li>
  )
}
