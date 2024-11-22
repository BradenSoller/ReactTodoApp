
import React from 'react';

import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import "./homePage.css"



function HomePage() {

  const Todos = useSelector((store) => store.AllTodos)
  console.log(Todos);
  

  let [text, setText] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_TODOS" });

    window.scrollTo(0, 0);
  }, []);

  const newTodo = (event) => {
    event.preventDefault();
    dispatch({
      type: "POST_TODOS",
      payload: {text: text }
    }
    );
    setText('')



  }

  return (

    <div id="TodoCard">

   
      <input className='inputTodo' type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={newTodo}>submit</button>

      <div>
        {Todos.map((todo) => {

          return (
            <div>
              <h3>{todo.text}</h3>
          </div>

          )
        })
          
}
      </div>
    </div>



  )
}
export default HomePage;