import React, {useState, useEffect} from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  
  useEffect(()=>{
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos){
      setTodos(loadedTodos);
    }
  },[])

  useEffect(()=>{
    if (todos.length > 0){
      const json = JSON.stringify(todos);
      localStorage.setItem("todos",json);
    }
  },[todos])
  // Add the handlesubmit code here
  function handlesubmit (e) {
    e.preventDefault();
    let todo = document.getElementById("todoAdd").value;

  const newToDo = {id: new Date().getTime(), text:todo.trim(), completed:false} ; 

  if (newToDo.text.length > 0){
    setTodos([...todos].concat(newToDo));
  } else {
    alert ("Enter Valid Task");
  }
  document.getElementById("todoAdd").value = "";

  }
  
  // Add the deleteToDo code here
  function deleteToDo (id) {
    let updated_Todos = [...todos].filter((todo)=>todo.id !== id);
    setTodos(updated_Todos);
  }
  
  // Add the toggleComplete code here
function toggleComplete(id){
  let updated_Todos = [...todos].map((todo)=> {
    if (todo.id===id){todo.completed=!todo.completed}
      return todo;});
    setTodos(updated_Todos);
}
  
  // Add the submitEdits code here
  function submitEdits (newtodo){
    const updatedTodos = [...todos].map((todo)=>{
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  
return(
<div id="todo-list">
<h1>Todo List</h1>
<form onSubmit={handlesubmit}>
<input type ="text" align ="right" id= 'todoAdd'/>
<button type ="submit">Add Todo</button>
</form>
{todos.map((element)=><div className="todo" key={element.id}>
<div className="todo-text">
  <input type="checkbox" id="completed" checked={element.completed} onChange={()=> toggleComplete(element.id)}/>
{element.id === todoEditing? 
(<input type='text' id = {element.id} defaultValue = {element.text}/>):
(<div>{element.text}</div>)
}
</div>

<div id="todo-actions">
{element.id === todoEditing?
(<button onClick={()=>submitEdits(element)}>Submit edits</button>):
(<button onClick={()=>setTodoEditing(element.id)}>Edit</button>)}
<button onClick={() => deleteToDo(element.id)}>Delete</button>

</div>
</div>
)}

</div>);
};

export default App;
