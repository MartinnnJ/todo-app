import React, { ChangeEvent, FormEvent, useState } from "react";
import "./TodoItem.css";
import { maxTodoTextLength, minTodoTextLength } from "@/helpers/http";

type T = {
  onTextUpdate: (id: string, newText: string) => void,
  onStatusUpdate: (event: ChangeEvent, id: string) => void,
  onDelete: (id: string) => void,
  id: string,
  isComplete: boolean,
  text: string,
};

const TodoItem: React.FC<T> = ({ onTextUpdate, onStatusUpdate, onDelete, id, isComplete, text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [editedTextInvalid, setEditedTextInvalid] = useState(false);

  const inputInvalidStyles = editedTextInvalid ? "invalid form-control" : "form-control";

  function formSubmitHandler(e: FormEvent) {
    e.preventDefault();
    
    if (
      editedText.length > minTodoTextLength &&
      editedText.length < maxTodoTextLength
    ) {
      onTextUpdate(id, editedText);
      setIsEditing(prevState => !prevState);
    } else {
      setEditedTextInvalid(true);
    }
  }

  function inputChangeHandler(e: ChangeEvent) {
    const el = e.target as HTMLInputElement;
    setEditedText(el.value);
    setEditedTextInvalid(false);
  }

  function cancelEditingHandler() {
    setIsEditing(false);
    setEditedText(text);
    setEditedTextInvalid(false);
  }

  return (
    <li>
      <div className="alert alert-dark alert-dismissible fade show" role="alert">

        {!isEditing && (
          <input
            type="checkbox"
            className="form-check-input"
            checked={isComplete}
            onChange={e => onStatusUpdate(e, id)}
          />
        )}

        {!isEditing && (
          <p className={`${isComplete ? 'text-decoration-line-through' : ''}`}>
            {text}
          </p>
        )}

        {isEditing && (
          <form onSubmit={formSubmitHandler}>
            <input
              type="text"
              className={inputInvalidStyles}
              aria-label="default input example"
              value={editedText}
              onChange={inputChangeHandler}
              autoFocus
            />
            <small
              className="cancel-btn"
              onClick={cancelEditingHandler}
            >
              ✖
            </small>
          </form>
        )}

        {(!isComplete && !isEditing) && (
          <small onClick={() => setIsEditing(true)}>
            Edit
          </small>
        )}

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => onDelete(id)}
        ></button>
        
      </div>
    </li>
  );
};

export default TodoItem;