import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  activateAccount,
  login,
  register,
  setRequestError,
} from 'src/redux/modules/account/actions';
import LOGO from 'src/assets/images/logo.png';
import { Formik, FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from 'src/components/FormField';
import { StoreState } from 'src/utils/storeTypes';
import { sendActivationCodeAPI } from 'src/api/auth';

const inputClass =
  'bg-transparent border-[1px] rounded-full border-blue-500 px-4 py-2 text-sm w-full';

const Login = () => {
  const requestError = useSelector<StoreState, string | undefined>(
    (state) => state.account.error,
  );

  const accountEmail = useSelector<StoreState, string>(
    (state) => state.account.email,
  );
  const showActivationForm = useSelector<StoreState, boolean | undefined>(
    (state) => state.globals.showActivationForm,
  );

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters'),
    ...(showRegisterForm && {
      passwordConfirmation: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    ...(showActivationForm && {
      activationCode: Yup.number()
        .moreThan(100000, 'Invalid activation code')
        .max(999999, 'Invalid activation code')
        .required('Required'),
    }),
  });

  const dispatch = useDispatch();

  const handleLogin = (values: FormikValues) => {
    console.log('here');
    const { email, password } = values;
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  const handleRegister = (values: FormikValues) => {
    console.log('here2');
    const { email, password, passwordConfirmation } = values;
    if (email && password && passwordConfirmation) {
      dispatch(register({ email, password }));
    }
  };

  const toggleRegisterForm = (displayRegisterForm: boolean) => {
    if (displayRegisterForm) {
      setShowRegisterForm(true);
    } else {
      setShowRegisterForm(false);
    }
    dispatch(setRequestError(undefined));
  };

  const handleAccountActivation = (values: FormikValues) => {
    console.log('values: ', values.activationCode);
    const { activationCode } = values;
    if (activationCode) {
      dispatch(activateAccount({ email: accountEmail, activationCode }));
    }
  };

  const resendActivationCode = async () => {
    await sendActivationCodeAPI(accountEmail);
  };

  useEffect(() => {
    if (!showActivationForm) {
      setShowRegisterForm(false);
    }
  }, [showActivationForm]);

  return (
    // <div className="grid grid-cols-1 items-center justify-center">
    <div className="w-1/2 xs:w-full sm:w-full md:w-full items-center justify-center self-center">
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordConfirmation: '',
          activationCode: '',
        }}
        onSubmit={
          // eslint-disable-next-line no-nested-ternary
          showActivationForm
            ? handleAccountActivation
            : showRegisterForm
            ? handleRegister
            : handleLogin
        }
        // onSubmit={showRegisterForm ? handleRegister : handleLogin}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <div className="w-full flex flex-col bg-black bg-opacity-70 rounded-xl h-[40rem] items-center justify-center">
            <img src={LOGO} alt="avatar" className="h-32 w-32" />
            {showActivationForm ? (
              <div className="flex flex-col w-4/6">
                <p className="mt-6 mb-2 text-xl font-semibold">
                  Account activation
                </p>
                <p className="mb-4 text-sm">
                  An activation code was sent to your email. Please enter the
                  code below to activate your account. If you did not receive
                  the code,{' '}
                  <button
                    className="font-medium text-blue-500 underline"
                    onClick={resendActivationCode}
                  >
                    press here
                  </button>{' '}
                  to resend it.
                </p>
                <FormField
                  name="activationCode"
                  className={inputClass}
                  placeholder="6 digit code"
                  isNumber
                  maxLength={6}
                />
                {requestError && (
                  <p className="mt-4 text-red-500">{requestError}</p>
                )}
                <>
                  <button
                    className="mt-6 px-6 w-40 py-1 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg xs:text-sm"
                    onClick={() => {
                      // console.log('here: ', handleSubmit());
                      // console.log('showActivationForm: ', showActivationForm);
                      handleSubmit();
                    }}
                    type="submit"
                  >
                    Activate
                  </button>
                </>
              </div>
            ) : (
              <>
                <div className="flex flex-col w-3/5">
                  <p className="mt-6 mb-2">Email</p>

                  <FormField
                    name="email"
                    className={inputClass}
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div className="flex flex-col w-3/5">
                  <p className="mt-6 mb-2">Password</p>
                  <FormField
                    name="password"
                    className={inputClass}
                    placeholder="Password"
                    isPassword
                  />
                </div>
                {showRegisterForm && (
                  <div className="flex flex-col w-3/5">
                    <p className="mt-6 mb-2">Password Confirmation</p>
                    <FormField
                      name="passwordConfirmation"
                      className={inputClass}
                      placeholder="Password"
                      isPassword
                    />
                  </div>
                )}
                {requestError && (
                  <p className="mt-4 text-red-500">{requestError}</p>
                )}
                {!showRegisterForm ? (
                  <>
                    <button
                      className="mt-6 px-8 w-40 py-1 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg xs:text-sm"
                      onClick={() => handleSubmit()}
                      type="submit"
                    >
                      Log in
                    </button>
                    <p className="mt-4">
                      Don't have an account?{' '}
                      <button
                        onClick={() => toggleRegisterForm(true)}
                        className="text-blue-500 hover:underline"
                      >
                        Register here
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      className="mt-6 px-6 w-40 py-1 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg xs:text-sm"
                      onClick={() => handleSubmit()}
                      type="submit"
                    >
                      Register
                    </button>
                    <p className="mt-4">
                      Already have an account?{' '}
                      <button
                        onClick={() => toggleRegisterForm(false)}
                        className="text-blue-500 hover:underline"
                      >
                        Login here
                      </button>
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </Formik>
      {/* <div className="flex w-full items-center justify-center">
        <img src={LOGO} alt="avatar" className="h-44 w-44 mx-2" />
        <img src="" />
      </div> */}
    </div>
  );
};

export default Login;
