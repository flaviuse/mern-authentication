import React from "react";

const Input = ({ name, label, error, icon, ...rest }) => {
  return (
    <div className="field ">
      <div className="ui left icon input">
        <i class={icon} />
        <input {...rest} name={name} id={name} placeholder={label} />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
