import Todo from "@models/Todo";

export function updateTodos(prevTodos: Todo[], newTodo: Todo) {
  const updatedTodo = newTodo;
  const todoIndex = prevTodos.findIndex(todo => todo.id === updatedTodo.id);
  const prevTodosCopy = [...prevTodos];
  prevTodosCopy.splice(todoIndex, 1, updatedTodo);

  return prevTodosCopy;
}