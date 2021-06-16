import { ChangeEvent, ChangeEventHandler, useState } from 'react';

interface FormReturn<T> {
  form: T;
  formChange: ChangeEventHandler<HTMLInputElement>;
  clearForm: () => void;
}

const useForm = <T>(initialValue: T): FormReturn<T> => {
  const [form, setForm] = useState<T>(initialValue);

  const formChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm(initialValue);
  };

  return { form, formChange, clearForm };
};

export default useForm;
