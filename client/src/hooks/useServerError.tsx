import { AxiosError } from "axios";
import { useState } from "react";

export const useServerError = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const handleServerError = (error: AxiosError<{ message: string }>) => {
    if (error.response) {
      setServerError(error.response.data.message);
    }
  };

  return { serverError, handleServerError };
};
