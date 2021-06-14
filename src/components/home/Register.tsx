import { FormEvent } from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';

import TextField from '@/components/TextField';
import useForm from '@/hooks/form';

import { RegisterForm } from '@/types/forms';
import { register } from '@/utils/http';
import { RegisterResponse } from '@/types/responses';

const Register = () => {
  const [form, handleChange] = useForm<RegisterForm>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();
    register(form).then(async (res: Response) => {
      if (res.status === 200) {
        const data: RegisterResponse = await res.json();
        const token: string = data.accessToken;
        localStorage.setItem('accessToken', token);
        window.location.reload();
      } else if (res.status === 409) {
        alert('The email address is already in use.');
      } else {
        alert('Unknown error');
      }
    });
    return false;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-3xl text-gray-700 font-light">Register</h3>
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
          pattern={/^.{4,}/}
          validationMessage="Password should atleast have 4 characters."
        />
        <button className="flex items-center justify-center h-12 space-x-2 bg-white border-2 border-gray-200 rounded-md text-orange-500 font-bold shadow-sm transition focus:outline-none focus:border-orange-500 hover:border-orange-200">
          <span>Register</span>
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Register;
