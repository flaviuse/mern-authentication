import React from 'react';

const Input = ({ name, label, error, icon, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <i className={icon} />
        <input {...rest} name={name} id={name} placeholder={label} />
      </div>
      {error && !error.includes('to be empty') && (
        <div className="error">{error}</div>
      )}
    </div>
  );
};

export default Input;
