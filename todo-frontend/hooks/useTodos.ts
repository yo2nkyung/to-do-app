// hooks are a way to manage the state of the app.

// purpose of this part is to define the logic of the data that will be used in the app

// custom hook is a function that returns a value that can be used in the app
// in this case, the value is the todos
// the todos are an array of Todo objects
// the todos are stored in the todos state variable
// the todos are fetched from the todos API

import { useEffect, useState } from "react"; //useState is a hook that is used to create a state variable
import { Todo } from "../types"; //
import axios from "axios";
import { API_URL } from "@env";

console.log("API_URL at runtime:", API_URL)

const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(()=>{
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    loadTodos();
  }, []);

// this is the custom hook
// export const useTodos = () => {
//   const [todos, setTodos] = useState<Todo[]>([
//     { id: 1, text: "practice React", completed: true },
//     { id: 2, text: "practice TypeScript", completed: false },
//     { id: 3, text: "practice React Native", completed: false },
//   ]);

  // in here, toggle means to change the property of the todo object
  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      if (!todo) return;

      const res = await axios.patch(`${API_URL}/${id}`, {
        completed: !todo.completed,
      });

      const updated = res.data;
      setTodos(prev => prev.map(todo => todo.id === id ? updated : todo));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
    
    // this is the old way to toggle the todo
    // setTodos((prev) =>  // 1. 이전 todos 배열을 받음
    //   prev.map((todo) =>  // 2. 각 할 일을 순회
    //        todo.id === id  // 3. id가 일치하는 할 일을 찾음
    //            ? { ...todo, completed: !todo.completed }  // 4. completed 상태를 반대로 변경
    //            : todo  // 5. 다른 할 일은 그대로 유지
    //   )
    // );
  };

  const addTodo = async(text: string) => {
    try {
      const res = await axios.post(API_URL, { text });
      const newTodo = res.data;
      setTodos(prev => [newTodo, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const editTodo = async(id: number, text: string) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, { text });
      setTodos(prev => prev.map(todo => todo.id === id ? res.data : todo));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  }

  const deleteTodo = async(id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
  return { todos, toggleTodo, addTodo, deleteTodo, editTodo };
};
