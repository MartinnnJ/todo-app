import Todo from "@/models/Todo";
import axios from "axios";

const baseUrl = 'http://localhost:3000';
export const minTodoTextLength = 2;
export const maxTodoTextLength = 50;

export async function fetchTodos() {
  return await axios.get(`${baseUrl}/todos`);
}

export async function createTodo(todoText: string) {
  const newTodo = new Todo(todoText);
  return await axios.post(`${baseUrl}/todos`, newTodo);
}

export async function updateTodo(todoId: string, isComplete: boolean | null, text: string | null) {
  const options: {
    isComplete?: boolean,
    text?: string,
  } = {};

  if (!text && (isComplete === true || isComplete === false)) {
    options.isComplete = isComplete;
  }
  if (text && isComplete === null) {
    options.text = text;
  }
  return await axios.patch(`${baseUrl}/todos/${todoId}`, options);
}

export async function deleteTodo(todoId: string) {
  return await axios.delete(`${baseUrl}/todos/${todoId}`);
}