import React from "react";

export default function Error({ children }) {
  return (
    <div className='error'>
      <b>*{children}</b>
    </div>
  );
}
