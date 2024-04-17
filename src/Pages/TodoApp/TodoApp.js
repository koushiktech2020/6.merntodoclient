/* eslint-disable */
import { useState, useEffect } from "react";
import TaskItem from "Components/TaskItem/TaskItem";
import "./TodoApp.css";

import { baseUrl } from "Helper/UrlHelper/UrlHelper";
import {
  addNewTodo,
  getAllTodos,
  getTodoDetails,
  updateTodo,
  deleteTodo,
} from "Helper/UrlHelper/TodoUrlHelper";

import { postData, getData, putData } from "Utils/HttpClient"; // Importing HTTP client utility functions

const TodoApp = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [todoTitle, setTodoTitle] = useState("");
  const [todoMark, setTodoMark] = useState(false);

  const [todoList, setTodoList] = useState([]);

  const [updatedTodoId, setUpdatedTodoId] = useState(null);

  //logout function
  const logoutHandler = () => {
    try {
      if (token) {
        localStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //save todo function
  const saveTodoHandler = async () => {
    try {
      let todoData = {
        title: todoTitle,
        mark: todoMark,
      };

      const endPoint = `${baseUrl}${
        updatedTodoId ? `${updateTodo}/${updatedTodoId}` : addNewTodo
      }?token=${token}`;

      const response = updatedTodoId
        ? await putData(endPoint, todoData)
        : await postData(endPoint, todoData); // Making HTTP POST request

      if (response.status) {
        resetAllState();
        getAllTodoList();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //get all todo function
  const getAllTodoList = async () => {
    try {
      const endPoint = `${baseUrl}${getAllTodos}?token=${token}`; // API endpoint for save new todo
      const response = await getData(endPoint); // Making HTTP POST request

      console.log(response);

      if (response.status) {
        setTodoList(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //update to do function
  const editTodoHandler = (todo) => {
    setTodoTitle(todo.title);
    setTodoMark(todo.mark);
    setUpdatedTodoId(todo._id);
  };

  //update todo mark function
  const updateTodoMark = async (e) => {
    try {
      let todoData = {
        mark: e.target.checked,
      };

      const endPoint = `${baseUrl}${updateTodo}/${e.target.value}?token=${token}`; // API endpoint for save/update new todo

      const response = await putData(endPoint, todoData); // Making HTTP POST request

      if (response.status) {
        resetAllState();
        getAllTodoList();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //reset all state
  const resetAllState = () => {
    setTodoTitle("");
    setUpdatedTodoId(null);
  };

  useEffect(() => {
    getAllTodoList();
  }, []);

  return (
    <section className="todo_main_body">
      <div className="todo_container">
        <div className="logout_sec">
          <h4>
            Welcome{" "}
            <span>
              {user.name} {user.surname}
            </span>
          </h4>
          <button className="logoutBtn" onClick={logoutHandler}>
            Log out
          </button>
        </div>
        {/* todo title */}
        <h1 className="todo_title">My Todo List</h1>

        {/* todo input */}
        <div className="add_todo_input_sec">
          <input
            type="text"
            name="todotitle"
            id="todotitle"
            placeholder="Add New To"
            className="text_input"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <button className="add_todo_btn" onClick={saveTodoHandler}>
            {updatedTodoId ? "Update" : "Add"}
          </button>
        </div>

        {/* todo list */}
        <div className="todo_list_sec">
          {/*todo lists card */}
          {todoList.map((todo, index) => {
            return (
              <TaskItem
                key={index}
                todo={todo}
                updateTodoMark={updateTodoMark}
                editTodoHandler={editTodoHandler}
                clearState={resetAllState}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TodoApp;
