/* eslint-disable @typescript-eslint/no-explicit-any */
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { Contract, ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from 'src/utils/storeTypes';
import ERC20 from 'src/contracts/ERC20.json';
import WBNB from 'src/contracts/WTLC.json';
import { useDeviceInfo } from 'src/hooks/useDeviceInfo';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import {
  WTLCTokenContractAddress,
  TLChain_USDT_ChildTokenContractAddress,
  wtlc_eth,
  usdt_eth,
  usdt_tlc_pool_eth,
} from 'src/utils/globals';

import { useSwapTrans } from '../utils/fetchData';
function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
  const switcherElement = document.createElement('div');
  switcherElement.classList.add('switcher');

  const intervalElements = items.map(function (item) {
    const itemEl = document.createElement('button');
    itemEl.innerText = item;
    itemEl.classList.add('switcher-item');
    itemEl.classList.toggle('switcher-active-item', item === activeItem);
    itemEl.addEventListener('click', function () {
      onItemClicked(item);
    });
    switcherElement.appendChild(itemEl);
    return itemEl;
  });

  function onItemClicked(item) {
    if (item === activeItem) {
      return;
    }

    intervalElements.forEach(function (element, index) {
      element.classList.toggle('switcher-active-item', items[index] === item);
    });

    activeItem = item;

    activeItemChangedCallback(item);
  }

  return switcherElement;
}
// const formatDate = (date) => {
//   const d = date;
//   let month = '' + (d.getMonth() + 1);
//   let day = '' + d.getDate();
//   const year = d.getFullYear();

//   if (month.length < 2) month = '0' + month;
//   if (day.length < 2) day = '0' + day;

//   return [year, month, day].join('-');
// };
export const CandleStickChart = (props: any) => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const intervals = ['1D', '1W', '1M', '1Y'];
  const [dayData, setDayData] = useState([
    // { time: '2019-05-22 09:30', value: 4.5 },
  ]);

  const seriesesData = new Map([
    ['1D', dayData],
    // ['1W', weekData],
    // ['1M', monthData],
    // ['1Y', yearData],
  ]);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [switcherElement, setSwitcherElement] = useState<HTMLDivElement>();
  const [swapTrans, setSwapTrans] = useSwapTrans();

  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };

      window.addEventListener('resize', handleResize);

      chartContainerRef.current.style.display = 'flex';
      chartContainerRef.current.style.flexDirection = 'column';
      chartContainerRef.current.style.width = '100%';
      chartContainerRef.current.style.alignSelf = 'center';

      const chart = createChart(chartContainerRef.current, {
        // width: isMobileDevice ? 300 : 1120,
        width: chartContainerRef.current?.clientWidth,
        height: 300,
        layout: {
          backgroundColor: '#000000',
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            color: 'rgba(42, 46, 57, 0.5)',
          },
        },
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderVisible: true,
          timeVisible: true,
          secondsVisible: false,
        },
        crosshair: {
          horzLine: {
            visible: false,
          },
        },
      });

      chart.timeScale().fitContent();
      chart.timeScale().scrollToRealTime();
      let areaSeries;

      areaSeries = chart.addAreaSeries({
        topColor: 'rgba(76, 175, 80, 0.56)',
        bottomColor: 'rgba(76, 175, 80, 0.04)',
        lineColor: 'rgba(76, 175, 80, 1)',
        lineWidth: 2,
      });

      const syncToInterval = (interval: string) => {
        // if (areaSeries) {
        //   //   chart.removeSeries(areaSeries);
        //   areaSeries = null;
        // }
        areaSeries = chart.addAreaSeries({
          topColor: 'rgba(76, 175, 80, 0.56)',
          bottomColor: 'rgba(76, 175, 80, 0.04)',
          lineColor: 'rgba(76, 175, 80, 1)',
          lineWidth: 2,
        });
        //@ts-ignore
        areaSeries.setData(seriesesData.get(interval));
      };

      syncToInterval(intervals[0]);

      const _switcherElement = createSimpleSwitcher(
        intervals,
        intervals[0],
        syncToInterval,
      );
      setSwitcherElement(_switcherElement);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    }
  }, [dayData]);
  // get transaction from
  useEffect(() => {
    async function fetchData() {
      if (swapTrans) {
        const data = swapTrans;
        console.log('chart data length', data.length);
        const chartData: any = [];
        for (let i = 0; i < data.length; i++) {
          const { index, swapData, path, timeStamp, transactionHash } = data[i];

          const temp = swapData.slice(2);
          const ori = formatEther(
            parseInt(temp.slice(0, 64), 16).toLocaleString('fullwide', {
              useGrouping: false,
            }),
          );
          // const d2 = formatEther(
          //   parseInt(temp.slice(64, 128), 16).toLocaleString('fullwide', {
          //     useGrouping: false,
          //   }),
          // );
          const d2 = formatUnits(
            parseInt(temp.slice(64, 128), 16).toLocaleString('fullwide', {
              useGrouping: false,
            }),
            6,
          );
          const d3 = formatEther(
            parseInt(temp.slice(128, 192), 16).toLocaleString('fullwide', {
              useGrouping: false,
            }),
          );
          // const des = formatEther(
          //   parseInt(temp.slice(192, 256), 16).toLocaleString('fullwide', {
          //     useGrouping: false,
          //   }),
          // );
          const des = formatUnits(
            parseInt(temp.slice(192, 256), 16).toLocaleString('fullwide', {
              useGrouping: false,
            }),
            6,
          );

          // console.log('ori', ori);
          // console.log('d2', d2);
          // console.log('d3', d3);
          // console.log('des', des);
          // console.log('path', path);
          //const wtlc = WTLCTokenContractAddress.slice(2);
          const wtlc = wtlc_eth.slice(2);
          let ratio = 4.89;
          /* if (wtlc.toLocaleLowerCase() === path[0].toLocaleLowerCase()) {
            ratio = parseFloat(d3) / parseFloat(d2);
          } else {
            ratio = parseFloat(ori) / parseFloat(des);
          } */
          if (wtlc.toLocaleLowerCase() === path[1].toLocaleLowerCase()) {
            ratio = parseFloat(d2) / parseFloat(d3);
          } else {
            ratio = parseFloat(des) / parseFloat(ori);
          }
          // console.log('ori', ori);
          // console.log('d2', d2);
          // console.log('d3', d3);
          // console.log('des', des);
          // console.log('ratio', ratio);
          // console.log('time', timeStamp);
          // console.log('date', date);
          // chartData[index] = { time: date, value: ratio };
          // chartData[index] = { time: parseInt(timeStamp), value: ratio };
          chartData[index] = { time: parseInt(timeStamp, 16), value: ratio };
        }
        // console.log('chartData', chartData);
        // get current ratio
        /*const url = 'https://mainnet-rpc.tlxscan.com/ https://mainnet-rpc.tlchain.live/';
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
        ); */

        const url =
          'https://mainnet.infura.io/v3/7f7f3d56bbbb45389554ccbaf12df8e3';
        const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
        const tlc_usdt_cont = new Contract(
          usdt_eth,
          ERC20.abi,
          customHttpProvider,
        );

        const usdt_amount = await tlc_usdt_cont.balanceOf(usdt_tlc_pool_eth);

        const usdt_amount_fl = parseFloat(
          formatUnits(
            usdt_amount.toLocaleString('fullwide', {
              useGrouping: false,
            }),
            6,
          ),
        );
        // console.log(
        //   'amount',
        //   formatEther(
        //     usdt_amount.toLocaleString('fullwide', {
        //       useGrouping: false,
        //     }),
        //   ),
        // );
        // wbnb amount
        /*const tlc_wbnb_cont = new Contract(
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
        ); */
        const tlc_wbnb_cont = new Contract(
          wtlc_eth,
          WBNB.abi,
          customHttpProvider,
        );
        const wbnb_amount = await tlc_wbnb_cont.balanceOf(usdt_tlc_pool_eth);
        const wbnb_amount_fl = parseFloat(
          formatEther(
            wbnb_amount.toLocaleString('fullwide', {
              useGrouping: false,
            }),
          ),
        );
        // console.log(
        //   'amount',
        //   formatEther(
        //     wbnb_amount.toLocaleString('fullwide', {
        //       useGrouping: false,
        //     }),
        //   ),
        // );
        const final_ratio = usdt_amount_fl / wbnb_amount_fl;
        // console.log('final ratio', final_ratio);

        const cur_timeStamp = Math.floor(Date.now() / 1000);
        chartData[chartData.length] = {
          time: cur_timeStamp,
          value: final_ratio,
        };
        // console.log('chartData', chartData);
        setDayData(chartData);
        // sort type
        // check swapTrans one by one
        // for (let i = 0; i < swapTrans['result'].length; i++) {
        //   // console.log('swaptrans', swapTrans['result'][i]);
        //   // pharse input data
        //   const swapData = swapTrans['result'][i]['data'].toString();
        //   // console.log('data', swapData);
        //   // remove 0x
        //   const temp = swapData.slice(2);
        //   const ori = formatEther(parseInt(temp.slice(0, 64), 16).toString());
        //   const d2 = parseInt(temp.slice(64, 128), 16);
        //   const d3 = parseInt(temp.slice(128, 192), 16);
        //   const des = formatEther(parseInt(temp.slice(192, 256), 16).toString());
        //   // console.log('ori', ori.toString());
        // console.log('d2', d2);
        // console.log('d3', d3);
        // console.log('des', des.toString());
        // }
      }
    }
    fetchData();
    // after receive
  }, [swapTrans]);
  return (
    <>
      <div ref={chartContainerRef} />
      {/* {switcherElement} */}
    </>
  );
};

export default CandleStickChart;

// export const volumeData = [
//   // T04:00:00.000Z
//   { time: '2018-12-28', value: 19103293.0 },
//   { time: '2018-12-29', value: 12103293.0 },
// ];

// const candleStickData = [
//   {
//     time: '2018-12-14',
//     open: 75.16,
//     high: 70.84,
//     low: 30.16,
//     close: 40.72,
//   },
//   {
//     time: '2018-12-31',
//     open: 109.87,
//     high: 114.69,
//     low: 85.66,
//     close: 111.26,
//   },
// ];

// const weekData = [
//   { time: '2016-07-18', value: 4.1 },
//   { time: '2019-05-27', value: 4.89 },
// ];

// const monthData = [
//   { time: '2006-12-01', value: 3.4 },
//   { time: '2019-05-01', value: 4.89 },
// ];

// const yearData = [
//   { time: '2006-01-02', value: 24.89 },
//   { time: '2019-01-01', value: 4.89 },
// ];
