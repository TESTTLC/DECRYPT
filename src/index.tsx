/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { DappUI, DappProvider } from '@elrondnetwork/dapp-core';

import { ChainId } from '../thirdweb-dev/sdk';
import { ThirdwebProvider } from '../thirdweb-dev/react';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import store from './redux/store';

const environment = 'devnet';
const {
  SignTransactionsModals,
  DappCorePages: { UnlockPage },
} = DappUI;

// replace console.* for disable log on production
if (
  process.env.REACT_APP_NODE_ENV === 'production' ||
  process.env.REACT_APP_NODE_ENV === 'staging'
) {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

ReactDOM.render(
  <React.StrictMode>
    <DappProvider
      environment={environment}
      customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
      completedTransactionsDelay={200}
    >
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <SignTransactionsModals className="custom-class-for-modals" />
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    </DappProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
