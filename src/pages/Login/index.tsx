import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { login, register } from 'src/redux/modules/account/actions';
import SMALL_LOGO from 'src/assets/images/logo.png';

const inputClass =
  'bg-transparent border-[1px] rounded-full border-blue-500 px-4 py-2 text-sm w-full';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onLogin = () => {
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  const onRegister = () => {
    if (email && password) {
      dispatch(register({ email, password }));
    }
  };

  return (
    <div className="grid grid-cols-2 items-center justify-center">
      <div className="flex flex-col bg-black bg-opacity-70 rounded-xl h-screen items-center justify-center">
        <div className="flex flex-col w-3/5">
          <p className="mt-6 mb-2">Email</p>
          <input
            className={inputClass}
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-3/5">
          <p className="mt-6 mb-2">Password</p>
          <input
            className={inputClass}
            placeholder="password"
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 mt-6 gap-y-4 gap-x-6">
          <button
            className="px-8 w-40 py-1 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg xs:text-sm"
            onClick={onLogin}
          >
            Log in
          </button>
          <button
            className="px-6 w-40 py-1 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg xs:text-sm"
            onClick={onRegister}
          >
            Register
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <img src={SMALL_LOGO} alt="avatar" className="h-44 w-44 mx-2" />
        <img src="" />
      </div>
    </div>
  );
};

export default Login;
