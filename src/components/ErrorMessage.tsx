import React from "react";
import "./ErrorMessage.css";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Error Occurred!</strong>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;