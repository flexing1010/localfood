import { useState } from "react";

const useInputChanges = (initValues) => {
  const [values, setValues] = useState(initValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, handleInputChange };
};

export default useInputChanges;
