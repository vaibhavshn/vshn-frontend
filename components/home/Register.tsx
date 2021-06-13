import { FormEvent } from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';

import TextField from '@/components/TextField';
import useForm from '@/hooks/useForm';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [form, handleChange] = useForm<RegisterForm>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();
    console.log('Form submitted:', form);
    return false;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-3xl text-gray-700 font-bold">Register</h3>
      <form onSubmit={handleSubmit} className="flex flex-col mt-4 space-y-4">
        <TextField
          name="name"
          label="Name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required={true}
        />
        <TextField
          name="email"
          label="Email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required={true}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required={true}
        />
        <button className="flex items-center justify-center h-12 space-x-2 bg-white border-2 border-gray-200 rounded-md text-orange-500 font-bold shadow-sm transition focus:outline-none focus:border-orange-500">
          <span>Register</span>
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Register;
