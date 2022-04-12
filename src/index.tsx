/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import { ChainId } from '../thirdweb-dev/sdk';
import { ThirdwebProvider } from '../thirdweb-dev/react';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import store from './redux/store';

// replace console.* for disable log on production
if (process.env.REACT_APP_NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <ThirdwebProvider desiredChainId={ChainId.TLChain}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThirdwebProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
