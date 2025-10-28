import * as React from "react";
export type ErrorMessageProps = {
  error?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <p className="text-sm text-destructive mt-1">
      {error}
    </p>
  );
};

export default ErrorMessage;   
export { ErrorMessage };
