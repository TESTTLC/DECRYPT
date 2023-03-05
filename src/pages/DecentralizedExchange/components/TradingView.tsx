import React, { Component } from 'react';
// import CanvasJSReact from '../../assets/canvasjs.stock.react';
import CanvasJSReact from 'src/canvaschart/canvasjs.stock.react';
import axios from 'axios';
import InputDataDecoder from 'ethereum-input-data-decoder';
import Router from 'src/contracts/Router.json';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import {
  WTLCTokenContractAddress,
  TLChain_USDT_ChildTokenContractAddress,
  wtlc_eth,
  usdt_eth,
  usdt_tlc_pool_eth,
  TempUsdt,
} from 'src/utils/globals';
import ERC20 from 'src/contracts/ERC20.json';
import WBNB from 'src/contracts/WTLC.json';
import { Contract, ethers } from 'ethers';

import dataJson from './data.json';
const { CanvasJSStockChart } = CanvasJSReact;
interface MyData {
  x: Date;
  y: number;
}
type MyComponentProps = {
  dataPoints: MyData[];
  isLoaded: boolean;
};
/* eslint-disable  @typescript-eslint/no-explicit-any */
class StockChartWithRangeSelector extends Component<any, MyComponentProps> {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
  }

  async componentDidMount() {
    // const API_URL = 'https://explorer.tlchain.live/api';
    // const temp_arr: any = [];

    // const res1 = await fetch(
    //   `${API_URL}?module=logs&action=getLogs&fromBlock=3486700&toBlock=4500000&address=0xEB5f15235612D31Df253c71b3Ea36E0aAa9F6031&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`,
    // );
    // const json1 = await res1.json();
    // console.log('json1', json1);
    // const decoder = new InputDataDecoder(Router.abi);
    // for (let i = 0; i < json1.result.length; i++) {
    //   const hashURI = `${API_URL}?module=transaction&action=gettxinfo&txhash=${json1.result[i].transactionHash}`;
    //   const res2 = await fetch(hashURI);
    //   const json2 = await res2.json();
    //   console.log('json2', json2);
    //   const temp1 = decoder.decodeData(json2.result.input);
    //   if (temp1.method === 'swapExactTokensForETH') {
    //     const swapExactTokensForETH = {
    //       index: i,
    //       swapData: json1.result[i]['data'],
    //       transactionHash: json1.result[i]['transactionHash'],
    //       path: temp1['inputs'][2],
    //       timeStamp: json2.result.timeStamp,
    //     };
    //     temp_arr.push(swapExactTokensForETH);
    //   } else {
    //     const swapExactETHForTokens = {
    //       index: i,
    //       swapData: json1.result[i]['data'],
    //       transactionHash: json1.result[i]['transactionHash'],
    //       path: temp1['inputs'][1],
    //       timeStamp: json2.result.timeStamp,
    //     };
    //     temp_arr.push(swapExactETHForTokens);
    //   }
    // }

    // console.log('final', temp_arr);

    // if (temp_arr.length == json1.result.length) {
    //   // start the calc
    //   const data = temp_arr;
    //   const chartData: any = [];
    //   for (let i = 0; i < data.length; i++) {
    //     const { index, swapData, path, timeStamp, transactionHash } = data[i];

    //     const temp = swapData.slice(2);
    //     const ori = formatEther(
    //       parseInt(temp.slice(0, 64), 16).toLocaleString('fullwide', {
    //         useGrouping: false,
    //       }),
    //     );
    //     const d2 = formatEther(
    //       parseInt(temp.slice(64, 128), 16).toLocaleString('fullwide', {
    //         useGrouping: false,
    //       }),
    //     );
    //     const d3 = formatEther(
    //       parseInt(temp.slice(128, 192), 16).toLocaleString('fullwide', {
    //         useGrouping: false,
    //       }),
    //     );
    //     const des = formatEther(
    //       parseInt(temp.slice(192, 256), 16).toLocaleString('fullwide', {
    //         useGrouping: false,
    //       }),
    //     );
    //     const wtlc = WTLCTokenContractAddress.slice(2);
    //     let ratio = 4.89;
    //     if (wtlc.toLocaleLowerCase() === path[1].toLocaleLowerCase()) {
    //       ratio = parseFloat(d2) / parseFloat(d3);
    //     } else {
    //       ratio = parseFloat(des) / parseFloat(ori);
    //     }
    //     chartData[index] = { time: parseInt(timeStamp), value: ratio };
    //   }
    //   // console.log('chartData', chartData);
    //   // get current ratio
    //   const url = 'https://mainnet-rpc.tlchain.live/';
    //   const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    //   const tlc_usdt_cont = new Contract(
    //     TLChain_USDT_ChildTokenContractAddress,
    //     ERC20.abi,
    //     customHttpProvider,
    //   );

    //   const usdt_amount = await tlc_usdt_cont.balanceOf(TempUsdt);
    //   const usdt_amount_fl = parseFloat(
    //     formatEther(
    //       usdt_amount.toLocaleString('fullwide', {
    //         useGrouping: false,
    //       }),
    //     ),
    //   );
    //   // wbnb amount
    //   const tlc_wbnb_cont = new Contract(
    //     WTLCTokenContractAddress,
    //     WBNB.abi,
    //     customHttpProvider,
    //   );
    //   const wbnb_amount = await tlc_wbnb_cont.balanceOf(TempUsdt);
    //   const wbnb_amount_fl = parseFloat(
    //     formatEther(
    //       wbnb_amount.toLocaleString('fullwide', {
    //         useGrouping: false,
    //       }),
    //     ),
    //   );
    //   const final_ratio = usdt_amount_fl / wbnb_amount_fl;
    //   // console.log('final ratio', final_ratio);

    //   const cur_timeStamp = Math.floor(Date.now() / 1000);
    //   chartData[chartData.length] = {
    //     time: cur_timeStamp,
    //     value: final_ratio,
    //   };
    //   console.log('chartData', chartData);
    //   // set data
    //   const dps: MyData[] = [];
    //   for (let i = 0; i < chartData.length; i++) {
    //     dps.push({
    //       x: new Date(chartData[i].time * 1000),
    //       y: Number(chartData[i].value),
    //     });
    //   }
    //   this.setState({
    //     isLoaded: true,
    //     dataPoints: dps,
    //   });
    // }

    // user Above comment code later for scraping
    // block 3486700-3779400
    // get current ratio
    let chartData: any = [];
    chartData = dataJson;
    const url = 'https://mainnet-rpc.tlchain.live/';
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    const tlc_usdt_cont = new Contract(
      TLChain_USDT_ChildTokenContractAddress,
      ERC20.abi,
      customHttpProvider,
    );

    const usdt_amount = await tlc_usdt_cont.balanceOf(TempUsdt);
    const usdt_amount_fl = parseFloat(
      formatEther(
        usdt_amount.toLocaleString('fullwide', {
          useGrouping: false,
        }),
      ),
    );
    // wbnb amount
    const tlc_wbnb_cont = new Contract(
      WTLCTokenContractAddress,
      WBNB.abi,
      customHttpProvider,
    );
    const wbnb_amount = await tlc_wbnb_cont.balanceOf(TempUsdt);
    const wbnb_amount_fl = parseFloat(
      formatEther(
        wbnb_amount.toLocaleString('fullwide', {
          useGrouping: false,
        }),
      ),
    );
    const final_ratio = usdt_amount_fl / wbnb_amount_fl;
    // console.log('final ratio', final_ratio);

    const cur_timeStamp = Math.floor(Date.now() / 1000);
    chartData[chartData.length] = {
      time: cur_timeStamp,
      value: final_ratio,
    };
    console.log('chartData', chartData);
    // set data
    const dps: MyData[] = [];
    for (let i = 0; i < chartData.length; i++) {
      dps.push({
        x: new Date(chartData[i].time * 1000),
        y: Number(chartData[i].value),
      });
    }
    this.setState({
      isLoaded: true,
      dataPoints: dps,
    });
  }

  render() {
    console.log('this.state', this.state.dataPoints);
    console.log('thsi.props', this.state.isLoaded);
    const options = {
      title: {
        text: 'TLC Price Chart',
      },
      theme: 'dark1',
      subtitles: [
        {
          text: 'TLC/USD',
        },
      ],
      charts: [
        {
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: 'MMM DD YYYY',
            },
          },
          axisY: {
            title: 'TLC',
            prefix: '$',
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: '$#,###.##',
            },
          },
          toolTip: {
            shared: true,
          },
          data: [
            {
              name: 'Price (in USD)',
              type: 'splineArea',
              color: '#10b981',
              yValueFormatString: '$#,###.##',
              xValueFormatString: 'MMM DD YYYY',
              dataPoints: this.state?.dataPoints,
            },
          ],
        },
      ],
      navigator: {
        slider: {
          minimum: new Date('2017-05-01'),
          maximum: new Date('2018-05-01'),
        },
      },
    };
    const containerProps = {
      width: '100%',
      height: '450px',
      margin: 'auto',
    };
    return (
      <>
        {
          // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
          this.state.isLoaded && (
            <CanvasJSStockChart
              containerProps={containerProps}
              options={options}
              /* onRef = {ref => this.chart = ref} */
            />
          )
        }
      </>
    );
  }
}

export default StockChartWithRangeSelector;
