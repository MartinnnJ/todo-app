import Todo from "@/models/Todo";

export const filterOptions = [
  (todo: Todo) => todo,
  (todo: Todo) => todo.isComplete === true,
  (todo: Todo) => todo.isComplete === false,
];