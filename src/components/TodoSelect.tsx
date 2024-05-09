import React, { ChangeEvent } from "react";
import "./TodoSelect.css";

type T = {
  onSelectChange: (event: ChangeEvent) => void,
  selected: number,
}

const TodoSelect: React.FC<T> = ({ selected, onSelectChange }) => {
  const selectOptions = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Fulfilled' },
    { value: 2, label: 'Unfulfilled' },
  ];

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      value={selected}
      onChange={onSelectChange}
    >
      {selectOptions.map(option => {
        return (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        )
      })}
    </select>
  );
}

export default TodoSelect;