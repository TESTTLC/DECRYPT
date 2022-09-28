// script to interact with external API
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import InputDataDecoder from 'ethereum-input-data-decoder';
import Router from 'src/contracts/Router.json';

interface TransData {
  index: number;
  swapData: string;
  transactionHash: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  path: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timeStamp: any;
}

export function useSwapTrans() {
  const [value, setValue] = useState([]);
  const API_URL = 'https://tlxscan.com/api';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const temp_arr: any = [];
  useEffect(() => {
    // check the collection address is available
    axios({
      method: 'GET',
      url: `${API_URL}?module=logs&action=getLogs&fromBlock=7000000&toBlock=8000000&address=0xfFDDD20d35BF9be18bA46EB5f15eCBDA173157F6&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // console.log('resdata', res);
      //
      //setValue(res.data);
      // fetch data using response data
      const decoder = new InputDataDecoder(Router.abi);

      for (let i = 0; i < res.data.result.length; i++) {
        // console.log('seperate data', res.data.result[i]);
        // get hashtransactions
        const hashURI = `${API_URL}?module=transaction&action=gettxinfo&txhash=${res.data.result[i].transactionHash}`;
        axios.get(hashURI).then((hashValue) => {
          // console.log('index', i);
          // console.log('hash value', hashValue);
          // using hashValue get the path
          const temp1 = decoder.decodeData(hashValue.data.result.input);
          // console.log('decode value', temp1);
          // path index inputs[3]
          // res.data.result[i]['path'] = temp1['inputs'][2];
          const retVal = {
            index: i,
            swapData: res.data.result[i]['data'],
            transactionHash: res.data.result[i]['transactionHash'],
            path: temp1['inputs'][2],
            timeStamp: hashValue.data.result.timeStamp,
          };
          temp_arr.push(retVal);
          // console.log('final res', temp_arr);

          if (temp_arr.length == res.data.result.length) {
            setValue(temp_arr);
          }
          // setValue((prevState) => {
          //   return { ...prevState, retVal };
          // });
        });
      }
    });
  }, []);

  // console.log('final', value);
  return [value, setValue];
}
