import { ChangeEvent, useEffect, useState } from "react";
import TodoInput from "@components/TodoInput";
import TodoSelect from "@components/TodoSelect";
import TodoItem from "@components/TodoItem";
import ErrorMessage from "@components/ErrorMessage";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "./helpers/http";
import { filterOptions } from "./helpers/filter";
import Todo from "./models/Todo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectValue, setSelectValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | false>(false);

  const filteredTodos = todos.filter(filterOptions[selectValue]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchTodos();
        if (response.status !== 200) {
          throw new Error('Unable to fetch todos!');
        }
        setTodos(response.data);
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        if (err instanceof Error) {
          setIsError(err.message);
        }
      }
    })();
  }, []);

  async function onCreateTodo(todoText: string) {
    try {
      const response = await createTodo(todoText);
      if (response.status !== 201) {
        throw new Error('Unable to create new todo!');
      }
      setTodos(prevTodos => ([...prevTodos, response.data]));
    } catch(err) {
      setTodos([]);
      if (err instanceof Error) {
        setIsError(err.message);
      }
    }
  }

  async function onDeleteTodo(todoId: string) {
    try {
      const response = await deleteTodo(todoId);
      if (response.status !== 200) {
        throw new Error('Unable to delete todo!');
      }
      setTodos(prevTodos => {
        const updatedTodos = prevTodos.filter(todo => todo.id !== response.data.id);
        return [...updatedTodos];
      });
    } catch (err) {
      setTodos([]);
      if (err instanceof Error) {
        setIsError(err.message);
      }
    }
  }

  async function onUpdateTodoText(todoId: string, updatedTodoText: string) {
    try {
      const response = await updateTodo(todoId, null, updatedTodoText);
      if (response.status !== 200) {
        throw new Error('Unable to update todo!');
      }
      // TODO: refactor on single state update fn !!! + refactor imports + one error handler fn
      setTodos(prevTodos => {
        const updatedTodo = response.data;
        const todoIndex = prevTodos.findIndex(todo => todo.id === updatedTodo.id);
        const prevTodosCopy = [...prevTodos];
        prevTodosCopy.splice(todoIndex, 1, updatedTodo);
        return prevTodosCopy;
      });
    } catch (err) {
      setTodos([]);
      if (err instanceof Error) {
        setIsError(err.message);
      }
    }
  }

  async function onUpdateTodoStatus(e: ChangeEvent, todoId: string) {
    const el = e.target as HTMLInputElement;
    const newStatusValue = el.checked;
    
    try {
      const response = await updateTodo(todoId, newStatusValue, null);
      if (response.status !== 200) {
        throw new Error('Unable to update todo!');
      }
      // TODO: refactor on single fn !!!
      setTodos(prevTodos => {
        const updatedTodo = response.data;
        const todoIndex = prevTodos.findIndex(todo => todo.id === updatedTodo.id);
        const prevTodosCopy = [...prevTodos];
        prevTodosCopy.splice(todoIndex, 1, updatedTodo);
        return prevTodosCopy;
      });
    } catch (err) {
      setTodos([]);
      if (err instanceof Error) {
        setIsError(err.message);
      }
    }
  }

  function selectChangeHandler(e: ChangeEvent) {
    const el = e.target as HTMLSelectElement;
    setSelectValue(+el.value);
  }

  return (
    <div>
      <h1 className="display-1 text-center">
        Todo App
      </h1>
      <TodoInput onFormSubmit={onCreateTodo} />
      <TodoSelect selected={selectValue} onSelectChange={selectChangeHandler} />
      <hr />
      <ul>
        {isLoading && (
          <li className="text-center">
            Loading...
          </li>
        )}
        {!isLoading && isError && (
          <ErrorMessage message={isError} />
        )}
        {!isLoading && filteredTodos.length === 0 && (
          <li className="text-center">
            No todos for display
          </li>
        )}
        {filteredTodos.map(item => {
          return (
            <TodoItem
              key={item.id}
              id={item.id}
              isComplete={item.isComplete}
              text={item.text}
              onStatusUpdate={onUpdateTodoStatus}
              onTextUpdate={onUpdateTodoText}
              onDelete={onDeleteTodo}
            />
          )
        })}
      </ul>
    </div>
  )
}
