import React, { ChangeEvent, FormEvent, useState } from "react";
import { maxTodoTextLength, minTodoTextLength } from "@helpers/http";
import "./TodoInput.css";

type T = {
  onFormSubmit: (input: string) => void,
};

const TodoInput: React.FC<T> = ({ onFormSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputInvalid, setInputInvalid] = useState(false);

  const inputInvalidStyles = inputInvalid ? 'invalid form-control form-control-lg' : 'form-control form-control-lg';

  function inputChangeHandler(e: ChangeEvent) {
    const el = e.target as HTMLInputElement;
    setInputValue(el.value);
    setInputInvalid(false);
  }

  function formSubmitHandler(e: FormEvent) {
    e.preventDefault();

    if (
      inputValue.length > minTodoTextLength &&
      inputValue.length < maxTodoTextLength
    ) {
      onFormSubmit(inputValue);
      setInputValue('');
    } else {
      setInputInvalid(true);
    }
  }

  return (
    <form
      className="input-form"
      onSubmit={formSubmitHandler}
    >
      <input
        type="text"
        className={inputInvalidStyles}
        placeholder="Todo Text"
        aria-label="default input example"
        value={inputValue}
        onChange={inputChangeHandler}
      />
      <button className="btn btn-primary btn-lg">
        Add Todo
      </button>
    </form>
  );
}

export default TodoInput;