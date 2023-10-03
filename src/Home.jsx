import React, { useState, useRef } from "react";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import {
  addTodo,
  delecetTodo,
  editTodo,
  saveTodo,
} from "./ReduxStore/todostore";

function Home() {
  const [inputValue, setInputValue] = useState(""); // State to manage input value
  const myReff = useRef();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.list.todos);
  const revTodo = [...todo].reverse();

  const handleADD = (e) => {
    e.preventDefault();

    dispatch(addTodo(inputValue)); // Dispatch with the current input value
    setInputValue(""); // Reset the input value to empty
  };

  const save = (id) => {
    const saveValue = myReff.current.value;
    dispatch(saveTodo({ id: id, value: saveValue }));
  };

  return (
    <div className="mainDiv">
      <div className="headignDiv">
        <h1>To Do</h1>
        <form onSubmit={handleADD}>
          <Input
            type="text"
            name="todo"
            placeholder="Add Tasks"
            style={{ width: "300px" }}
            id="todo"
            className="inputMain"
            required
            value={inputValue} // Bind input value to state
            onChange={(e) => setInputValue(e.target.value)} // Update state on change
          />

          <button type="submit" className="pluseBTN">
            +
          </button>
        </form>
      </div>
      <div>
        <ul>
          {revTodo.map((todos) => (
            <li className="listDiv">
              {todos.editkey === true ? (
                <>
                  <input style={{ width: "300px" }} value={todos.value} className="inputFields" />

                  <Button type="primary" onClick={() => dispatch(editTodo(todos.id))}>
                    Edit
                  </Button>
                  &nbsp;

                  <Button type="primary" onClick={() => dispatch(delecetTodo(todos.id))}>
                    X
                  </Button>
                </>
              ) : (
                <>
                  <input type="text" ref={myReff} className="inputFields" />

                  <Button type="primary" onClick={() => save(todos.id)}>
                    Save
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
