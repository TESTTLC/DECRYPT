import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn } from 'src/redux/modules/account/actions';
import { setIsLoading } from 'src/redux/modules/globals/actions';

const CustomAuth0Provider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const onRedirectCallback = () => {
    dispatch(setIsLoading(false));
    dispatch(setIsLoggedIn(true));
  };

  return (
    <Auth0Provider
      domain="dev-0dloenkj.us.auth0.com"
      clientId="rSiKsEZ5eiQ5zgvaUNtDqRUZE0mlzZpk"
      redirectUri={'http://localhost:3000'}
      onRedirectCallback={onRedirectCallback}
      audience="Unique Identifier"
      scope="openid profile email"
    >
      {children}
    </Auth0Provider>
  );
};

export default CustomAuth0Provider;
