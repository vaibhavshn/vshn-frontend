import { FormEvent, Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';

import TextField from '@/components/TextField';
import useForm from '@/hooks/form';
import { logIn } from '@/utils/http';

import { LoginForm } from '@/types/forms';
import { LogInResponse } from '@/types/responses';

enum LoginStates {
  idle,
  loggedIn,
  invalid,
}

const Login = () => {
  const [form, handleChange] = useForm<LoginForm>({ email: '', password: '' });
  const [loginState, setLoginState] = useState<LoginStates>(LoginStates.idle);

  const handleSubmit = (e: FormEvent) => {
    if (e) e.preventDefault();
    logIn(form)
      .then(async (res: Response) => {
        if (res.status === 200) {
          const data: LogInResponse = await res.json();
          const token = data.accessToken;

          localStorage.setItem('accessToken', token);
          setLoginState(LoginStates.loggedIn);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setLoginState(LoginStates.invalid);
        }
      })
      .catch(() => {
        alert('Unknown error');
      });
    return false;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-3xl text-gray-700 font-light">Login</h3>
      <form onSubmit={handleSubmit} className="flex flex-col mt-4 space-y-4">
        <TextField
          type="email"
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
          <span>Login</span>
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </form>

      <Transition appear show={loginState !== LoginStates.idle} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setLoginState(LoginStates.idle)}
          className="fixed w-full z-10 inset-0 overflow-y-auto"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex items-center justify-center min-h-screen w-full max-w-md p-4 mx-auto">
              <Dialog.Overlay className="fixed z-0 inset-0 bg-black bg-opacity-10" />

              {loginState === LoginStates.loggedIn && (
                <div className="z-10 w-full bg-white p-4 rounded-md space-y-4 shadow-xl">
                  <div className="space-y-2">
                    <Dialog.Title className="text-lg">Logged In</Dialog.Title>
                    <Dialog.Description className="text-gray-700">
                      You are being logged in...
                    </Dialog.Description>
                  </div>
                  <div>
                    <Link href="/dashboard">
                      <button className="block ml-auto text-orange-500 focus:outline-none">
                        Go to Dashboard
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {loginState === LoginStates.invalid && (
                <div className="z-10 w-full bg-white p-4 rounded-md space-y-4 shadow-xl">
                  <div className="space-y-2">
                    <Dialog.Title className="text-lg">
                      Invalid Details
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-700">
                      Please try again...
                    </Dialog.Description>
                  </div>
                  <div>
                    <button
                      onClick={() => setLoginState(LoginStates.idle)}
                      className="block ml-auto text-gray-500 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Login;
export type { LoginForm };
