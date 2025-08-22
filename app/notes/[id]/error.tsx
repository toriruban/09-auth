'use client';

type Props = {
  error: Error;
  reset: () => void;
}

const ErrorComponent = ({ error, reset }: Props) => {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default ErrorComponent;
