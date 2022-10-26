// script to interact with external API
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import InputDataDecoder from 'ethereum-input-data-decoder';
import Router from 'src/contracts/Router.json';
import { usdt_tlc_pool_eth } from 'src/utils/globals';

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
  // const API_URL = 'https://explorer.tlchain.live/api';
  const API_URL = 'https://api.etherscan.io/api';
  //   const moralisAPI = 'https://deep-index.moralis.io/api/v2/'
  //   axios({
  //     method: 'GET',
  //   url: `${moralisAPI}/${usdt_tlc_pool_eth}/logs`,
  //   params: {
  //     chain: 'eth',
  //     from_block: '15719340',
  //     to_block: '25000000',
  //     topic0:
  //       '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
  //     limit: 100,
  //   },
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-API-Key':
  //       'Q4BDWHZbfWB50LKU6oC8KgiMnE43qoJ8YMe0XQigvMfoGBYfydL1geLA9vgniWxk',
  //   },
  // }).then((res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const temp_arr: any = [];
  useEffect(() => {
    // check the collection address is available
    axios({
      method: 'GET',
      // url: `${API_URL}?module=logs&action=getLogs&fromBlock=7490000&toBlock=9000000&address=0xfFDDD20d35BF9be18bA46EB5f15eCBDA173157F6&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`,
      // url: `${API_URL}?module=logs&action=getLogs&fromBlock=15719340&toBlock=25000000&address=0x002043eAD35D81B1F5847D8Aad1D18DDEf20389A&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822&page=1&offset=1000&apikey=3SFTR5FF1FAP4ZCVAJH394NEI1NUG7GASS`,
      url: `${API_URL}?module=logs&action=getLogs&fromBlock=15719340&toBlock=25000000&address=${usdt_tlc_pool_eth}&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822&page=1&offset=50&apikey=3SFTR5FF1FAP4ZCVAJH394NEI1NUG7GASS`,
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
        // moralis api path
        const moralis_API_URL =
          'https://deep-index.moralis.io/api/v2/transaction/';
        //const hashURI = `${moralis_API_URL}?module=transaction&action=gettxinfo&txhash=${res.data.result[i].transactionHash}`;
        const hashURI = `${moralis_API_URL}${res.data.result[i].transactionHash}`;
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
          // using hashValue get the path
          // const temp1 = decoder.decodeData(hashValue.data.result.input);
          const temp1 = decoder.decodeData(hashValue.data.input);
          // console.log('decode value', temp1);
          // path index inputs[3]
          // res.data.result[i]['path'] = temp1['inputs'][2];
          const retVal = {
            index: i,
            swapData: res.data.result[i]['data'],
            transactionHash: res.data.result[i]['transactionHash'],
            path: temp1['inputs'][2],
            // timeStamp: hashValue.data.result.timeStamp,
            // timeStamp: hashValue.data.block_timestamp,
            timeStamp: res.data.result[i].timeStamp,
          };
          temp_arr.push(retVal);

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
