import React from "react";

const Input = ({ name, label, error, icon, ...rest }) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className="ui left icon attached input ">
        <i className={icon} />
        <input {...rest} name={name} id={name} placeholder={label} />
      </div>
      {error &&
      !error.includes("to be empty") && ( // Don't show message "input is not allowed to be empty"
          <div className="ui red mini message bottom attached">
            <i className="exclamation icon " /> {error}
          </div>
        )}
    </div>
  );
};

export default Input;
