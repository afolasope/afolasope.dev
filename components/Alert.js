import React from "react";

const Alert = ({ type, message, close }) => {
  return (
    <div className={`alert alert-${type} alert-dismissible`} role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={close}
      ></button>
    </div>
  );
};

export default Alert;
