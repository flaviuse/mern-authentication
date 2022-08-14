interface ErrorProps {
  children?: JSX.Element | string;
}

export const Error = ({ children }: ErrorProps): JSX.Element => {
  return (
    <div className='error'>
      <b>*{children}</b>
    </div>
  );
};
