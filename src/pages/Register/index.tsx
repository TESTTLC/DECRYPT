import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CustomButton from 'src/components/CustomButton';
import { useDispatch } from 'react-redux';
import { login } from 'src/redux/modules/account/actions';
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
        <div className="my-4">
          <button className="px-8 py-1 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg">
            Log in
          </button>
        </div>
        <button className="px-6 py-1 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg">
          Create New Account
        </button>
      </div>
      <div className="flex w-full items-center justify-center">
        <img src={SMALL_LOGO} alt="avatar" className="h-44 w-44 mx-2" />
        <img src="" />
      </div>
    </div>
  );
};

export default Login;
