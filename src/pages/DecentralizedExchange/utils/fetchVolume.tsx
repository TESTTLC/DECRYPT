// script to interact with external API
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import InputDataDecoder from 'ethereum-input-data-decoder';
import Router from 'src/contracts/Router.json';

export function useUsdtTrans(currentBlock: number) {
  const [value, setValue] = useState([]);
  // const API_URL = 'https://tlxscan.com/api';
  const API_URL = 'https://api.etherscan.io/api';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const temp_arr: any = [];

  // block generate every 3 sec=> 24 * 3600 / 3 = 28800 block before
  // block generate every 12 sec => 24 * 3600 /12 = 7200 block
  // const fromBlock = currentBlock - 28800;
  const fromBlock = currentBlock - 7200;

  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (currentBlock == 0 || flag == true) {
      return;
    }
    if (flag == false) setFlag(true);

    // check the collection address is available
    axios({
      method: 'GET',
      // url: `${API_URL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${currentBlock}&address=0xfFDDD20d35BF9be18bA46EB5f15eCBDA173157F6&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`,
      url: `${API_URL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${currentBlock}&address=0x002043eAD35D81B1F5847D8Aad1D18DDEf20389A&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822&page=1&offset=1000&apikey=GD75EC4NMBMDBRY1PVBI4QEP4E576JBQ46`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // parse usdt transaction using response data
      const decoder = new InputDataDecoder(Router.abi);

      for (let i = 0; i < res.data.result.length; i++) {
        // moralis api path
        const moralis_API_URL =
          'https://deep-index.moralis.io/api/v2/transaction/';
        // get hashtransactions
        // const hashURI = `${API_URL}?module=transaction&action=gettxinfo&txhash=${res.data.result[i].transactionHash}`;
        const hashURI = `${moralis_API_URL}${res.data.result[i].transactionHash}`;
        // axios.get(hashURI).then((hashValue) => {
        axios({
          method: 'GET',
          url: hashURI,
          params: { chain: 'eth' },
          headers: {
            accept: 'application/json',
            'X-API-Key':
              'Q4BDWHZbfWB50LKU6oC8KgiMnE43qoJ8YMe0XQigvMfoGBYfydL1geLA9vgniWxk',
          },
        }).then((hashValue) => {
          // const temp1 = decoder.decodeData(hashValue.data.result.input);
          const temp1 = decoder.decodeData(hashValue.data.input);
          const retVal = {
            index: i,
            swapData: res.data.result[i]['data'],
            transactionHash: res.data.result[i]['transactionHash'],
            path: temp1['inputs'][2],
            // timeStamp: hashValue.data.result.timeStamp,
            timeStamp: res.data.result[i].timeStamp,
          };
          temp_arr.push(retVal);

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
  // const API_URL = 'https://tlxscan.com/api';
  const API_URL = 'https://api.etherscan.io/api';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const temp_arr: any = [];
  // block generate every 3 sec=> 24 * 3600 / 3 = 28800 block before
  // block generate every 12 sec => 24 * 3600 /12 = 7200 block
  // const fromBlock = currentBlock - 28800;
  const fromBlock = currentBlock - 7200;
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (currentBlock == 0 || flag == true) {
      return;
    }
    if (flag == false) setFlag(true);
    // check the collection address is available
    axios({
      method: 'GET',
      // url: `${API_URL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${currentBlock}&address=0x284ad65F779Ca1d8f52e710EE6728638FB3BAfa9&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`,
      url: `${API_URL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${currentBlock}&address=0xFd432595DCff5783C1acAb91971daF4ad383219F&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822&page=1&offset=1000&apikey=9MC59K6UFJEVBGFB7RNQF5YYM9XCD8345I`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // parse usdt transaction using response data
      const decoder = new InputDataDecoder(Router.abi);

      for (let i = 0; i < res.data.result.length; i++) {
        // moralis api path
        const moralis_API_URL =
          'https://deep-index.moralis.io/api/v2/transaction/';
        // get hashtransactions
        // const hashURI = `${API_URL}?module=transaction&action=gettxinfo&txhash=${res.data.result[i].transactionHash}`;
        const hashURI = `${moralis_API_URL}${res.data.result[i].transactionHash}`;
        // axios.get(hashURI).then((hashValue) => {
        axios({
          method: 'GET',
          url: hashURI,
          params: { chain: 'eth' },
          headers: {
            accept: 'application/json',
            'X-API-Key':
              'Q4BDWHZbfWB50LKU6oC8KgiMnE43qoJ8YMe0XQigvMfoGBYfydL1geLA9vgniWxk',
          },
        }).then((hashValue) => {
          // const temp1 = decoder.decodeData(hashValue.data.result.input);
          const temp1 = decoder.decodeData(hashValue.data.input);
          const retVal = {
            index: i,
            swapData: res.data.result[i]['data'],
            transactionHash: res.data.result[i]['transactionHash'],
            path: temp1['inputs'][2],
            // timeStamp: hashValue.data.result.timeStamp,
            timeStamp: res.data.result[i].timeStamp,
          };
          temp_arr.push(retVal);

          if (temp_arr.length == res.data.result.length) {
            setValue(temp_arr);
          }
        });
      }
    });
  }, [currentBlock]);
  return [value, setValue];
}
