import { useCallback } from "react";
import { useState } from "react";

const useInput = ({ initialState }) => {
  console.log("initial ",initialState);
  const [input, setinput] = useState(initialState);
  const changeTextHandler = useCallback((toChange, value) => {
    setinput((p) => ({ ...p, [toChange]: value }));
  }, []);
  return { inputState: input, changeTextHandler };
};
export default useInput;
