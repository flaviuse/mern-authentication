import { FC } from "react";

export const Error: FC = ({ children }) => {
  return (
    <div className='error'>
      <b>*{children}</b>
    </div>
  );
};
