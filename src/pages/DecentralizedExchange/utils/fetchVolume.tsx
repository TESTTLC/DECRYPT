// script to interact with external API
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import InputDataDecoder from 'ethereum-input-data-decoder';
import Router from 'src/contracts/Router.json';

export function useUsdtTrans(currentBlock: number) {
  const [value, setValue] = useState([]);
  const API_URL = 'https://explorer.tlchain.live/api';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const temp_arr: any = [];

  // block generate every 3 sec=> 24 * 3600 / 3 = 28800 block before
  const fromBlock = currentBlock - 28800;

  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (currentBlock == 0 || flag == true) {
      return;
    }
    if (flag == false) setFlag(true);

    // check the collection address is available
    axios({
      method: 'GET',
      url: `${API_URL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${currentBlock}&address=0xEB5f15235612D31Df253c71b3Ea36E0aAa9F6031&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // parse usdt transaction using response data
      const decoder = new InputDataDecoder(Router.abi);
      for (let i = 0; i < res.data.result.length; i++) {
        // get hashtransactions
        const hashURI = `${API_URL}?module=transaction&action=gettxinfo&txhash=${res.data.result[i].transactionHash}`;
        axios.get(hashURI).then((hashValue) => {
          // using hashValue get the path
          const temp1 = decoder.decodeData(hashValue.data.result.input);
          if (temp1.method === 'swapExactTokensForETH') {
            const swapExactTokensForETH = {
              index: i,
              swapData: res.data.result[i]['data'],
              transactionHash: res.data.result[i]['transactionHash'],
              path: temp1['inputs'][2],
              timeStamp: hashValue.data.result.timeStamp,
            };
            temp_arr.push(swapExactTokensForETH);
          } else {
            const swapExactETHForTokens = {
              index: i,
              swapData: res.data.result[i]['data'],
              transactionHash: res.data.result[i]['transactionHash'],
              path: temp1['inputs'][1],
              timeStamp: hashValue.data.result.timeStamp,
            };
            temp_arr.push(swapExactETHForTokens);
          }
          if (temp_arr.length == res.data.result.length) {
            setValue(temp_arr);
          }
        });
      }
    });
  }, [currentBlock]);
  return [value, setValue];
}

export function useUsdcTrans(currentBlock: number) {
  const [value, setValue] = useState([]);
  const API_URL = 'https://explorer.tlchain.live/api';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const temp_arr: any = [];
  // block generate every 3 sec=> 24 * 3600 / 3 = 28800 block before
  const fromBlock = currentBlock - 28800;
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (currentBlock == 0 || flag == true) {
      return;
    }
    if (flag == false) setFlag(true);
    // check the collection address is available
    axios({
      method: 'GET',
      url: `${API_URL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${currentBlock}&address=0x03B03AeC4b14dc8aA9Ab3ef61A31Af63DD247cAB&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // parse usdt transaction using response data
      const decoder = new InputDataDecoder(Router.abi);

      for (let i = 0; i < res.data.result.length; i++) {
        // get hashtransactions
        const hashURI = `${API_URL}?module=transaction&action=gettxinfo&txhash=${res.data.result[i].transactionHash}`;
        axios.get(hashURI).then((hashValue) => {
          // using hashValue get the path
          const temp1 = decoder.decodeData(hashValue.data.result.input);
          if (temp1.method === 'swapExactTokensForETH') {
            const swapExactTokensForETH = {
              index: i,
              swapData: res.data.result[i]['data'],
              transactionHash: res.data.result[i]['transactionHash'],
              path: temp1['inputs'][2],
              timeStamp: hashValue.data.result.timeStamp,
            };
            temp_arr.push(swapExactTokensForETH);
          } else {
            const swapExactETHForTokens = {
              index: i,
              swapData: res.data.result[i]['data'],
              transactionHash: res.data.result[i]['transactionHash'],
              path: temp1['inputs'][1],
              timeStamp: hashValue.data.result.timeStamp,
            };
            temp_arr.push(swapExactETHForTokens);
          }
          if (temp_arr.length == res.data.result.length) {
            setValue(temp_arr);
          }
        });
      }
    });
  }, [currentBlock]);
  return [value, setValue];
}
