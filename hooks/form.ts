import { ChangeEvent, ChangeEventHandler, useState } from 'react';

const useForm = <T>(
  initialValue: T
): [T, ChangeEventHandler<HTMLInputElement>] => {
  const [values, setValues] = useState<T>(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, onChange];
};

export default useForm;
