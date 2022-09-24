/* eslint-disable @typescript-eslint/no-explicit-any */
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { createRef, useEffect, useRef, useState } from 'react';

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

export const CandleStickChart = (props: any) => {
  //   const { data=[], volumeData=[] } = props;
  const backgroundColor = 'white',
    areaTopColor = '#cc001f',
    textColor = 'black',
    lineColor = '#cc001f';
  //   areaBottomColor = lineColor;
  //   const data = candleStickData;
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [switcherElement, setSwitcherElement] = useState<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };

      chartContainerRef.current.style.display = 'flex';
      chartContainerRef.current.style.flexDirection = 'column';
      chartContainerRef.current.style.width = '100%';
      chartContainerRef.current.style.alignSelf = 'center';

      const chart = createChart(chartContainerRef.current, {
        width: 1120,
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
          borderVisible: false,
        },
        crosshair: {
          horzLine: {
            visible: false,
          },
        },
      });

      chart.timeScale().fitContent();

      chart.timeScale().fitContent();

      window.addEventListener('resize', handleResize);

      let areaSeries = null;

      areaSeries = chart.addAreaSeries({
        topColor: 'rgba(76, 175, 80, 0.56)',
        bottomColor: 'rgba(76, 175, 80, 0.04)',
        lineColor: 'rgba(76, 175, 80, 1)',
        lineWidth: 2,
      });

      const syncToInterval = (interval) => {
        if (areaSeries) {
          //   chart.removeSeries(areaSeries);
          areaSeries = null;
        }
        areaSeries = chart.addAreaSeries({
          topColor: 'rgba(76, 175, 80, 0.56)',
          bottomColor: 'rgba(76, 175, 80, 0.04)',
          lineColor: 'rgba(76, 175, 80, 1)',
          lineWidth: 2,
        });
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
  }, [backgroundColor, lineColor, textColor, areaTopColor, switcherElement]);

  console.log('switcherElement: ', switcherElement);
  const returnSwithcer = () => {
    return switcherElement;
  };
  return (
    <>
      <div ref={chartContainerRef} />
      {switcherElement}
    </>
  );
};

export default CandleStickChart;

// export const volumeData = [
//   // T04:00:00.000Z
//   { time: '2018-12-14', value: 6103293.0 },
//   { time: '2018-12-15', value: 19103293.0 },
//   { time: '2018-12-16', value: 12103293.0 },
//   { time: '2018-12-17', value: 7103293.0 },
//   { time: '2018-12-18', value: 18103293.0 },
//   { time: '2018-12-19', value: 19103293.0 },
//   { time: '2018-12-20', value: 12103293.0 },
//   { time: '2018-12-21', value: 12103293.0 },
//   { time: '2018-12-22', value: 7103293.0 },
//   { time: '2018-12-23', value: 18103293.0 },
//   { time: '2018-12-24', value: 19103293.0 },
//   { time: '2018-12-25', value: 12103293.0 },
//   { time: '2018-12-26', value: 7103293.0 },
//   { time: '2018-12-27', value: 18103293.0 },
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
//     time: '2018-12-15',
//     open: 90.16,
//     high: 123.84,
//     low: 40.16,
//     close: 45.72,
//   },
//   {
//     time: '2018-12-16',
//     open: 67.71,
//     high: 105.85,
//     low: 66.67,
//     close: 91.04,
//   },
//   {
//     time: '2018-12-17',
//     open: 91.04,
//     high: 121.4,
//     low: 82.7,
//     close: 111.4,
//   },
//   {
//     time: '2018-12-18',
//     open: 75.16,
//     high: 100.84,
//     low: 36.16,
//     close: 59.72,
//   },
//   {
//     time: '2018-12-19',
//     open: 75.16,
//     high: 82.84,
//     low: 36.16,
//     close: 45.72,
//   },
//   {
//     time: '2018-12-20',
//     open: 75.16,
//     high: 82.84,
//     low: 36.16,
//     close: 45.72,
//   },
//   {
//     time: '2018-12-21',
//     open: 75.16,
//     high: 82.84,
//     low: 36.16,
//     close: 45.72,
//   },
//   {
//     time: '2018-12-22',
//     open: 75.16,
//     high: 82.84,
//     low: 36.16,
//     close: 45.72,
//   },
//   {
//     time: '2018-12-23',
//     open: 45.12,
//     high: 53.9,
//     low: 45.12,
//     close: 48.09,
//   },
//   {
//     time: '2018-12-24',
//     open: 60.71,
//     high: 60.71,
//     low: 53.39,
//     close: 59.29,
//   },
//   {
//     time: '2018-12-25',
//     open: 68.26,
//     high: 68.26,
//     low: 59.04,
//     close: 60.5,
//   },
//   {
//     time: '2018-12-26',
//     open: 67.71,
//     high: 105.85,
//     low: 66.67,
//     close: 91.04,
//   },
//   {
//     time: '2018-12-27',
//     open: 91.04,
//     high: 121.4,
//     low: 82.7,
//     close: 111.4,
//   },
//   {
//     time: '2018-12-28',
//     open: 111.51,
//     high: 142.83,
//     low: 103.34,
//     close: 131.25,
//   },
//   {
//     time: '2018-12-29',
//     open: 131.33,
//     high: 151.17,
//     low: 77.68,
//     close: 96.43,
//   },
//   {
//     time: '2018-12-30',
//     open: 106.33,
//     high: 110.2,
//     low: 90.39,
//     close: 98.1,
//   },
//   {
//     time: '2018-12-31',
//     open: 109.87,
//     high: 114.69,
//     low: 85.66,
//     close: 111.26,
//   },
// ];

const intervals = ['1D', '1W', '1M', '1Y'];

const dayData = [
  { time: '2018-10-19', value: 4.19 },
  { time: '2018-10-22', value: 3.87 },
  { time: '2018-10-23', value: 3.83 },
  { time: '2018-10-24', value: 3.78 },
  { time: '2018-10-25', value: 3.82 },
  { time: '2018-10-26', value: 3.81 },
  { time: '2018-10-29', value: 3.82 },
  { time: '2018-10-30', value: 3.71 },
  { time: '2018-10-31', value: 3.82 },
  { time: '2018-11-01', value: 3.72 },
  { time: '2018-11-02', value: 3.74 },
  { time: '2018-11-05', value: 3.81 },
  { time: '2018-11-06', value: 3.75 },
  { time: '2018-11-07', value: 3.73 },
  { time: '2018-11-08', value: 3.75 },
  { time: '2018-11-09', value: 3.75 },
  { time: '2018-11-12', value: 3.76 },
  { time: '2018-11-13', value: 3.8 },
  { time: '2018-11-14', value: 3.77 },
  { time: '2018-11-15', value: 3.75 },
  { time: '2018-11-16', value: 3.75 },
  { time: '2018-11-19', value: 3.75 },
  { time: '2018-11-20', value: 3.72 },
  { time: '2018-11-21', value: 3.78 },
  { time: '2018-11-23', value: 3.72 },
  { time: '2018-11-26', value: 3.78 },
  { time: '2018-11-27', value: 3.85 },
  { time: '2018-11-28', value: 3.85 },
  { time: '2018-11-29', value: 3.55 },
  { time: '2018-11-30', value: 3.41 },
  { time: '2018-12-03', value: 3.41 },
  { time: '2018-12-04', value: 3.42 },
  { time: '2018-12-06', value: 3.33 },
  { time: '2018-12-07', value: 3.39 },
  { time: '2018-12-10', value: 3.32 },
  { time: '2018-12-11', value: 3.48 },
  { time: '2018-12-12', value: 3.39 },
  { time: '2018-12-13', value: 3.45 },
  { time: '2018-12-14', value: 3.52 },
  { time: '2018-12-17', value: 3.38 },
  { time: '2018-12-18', value: 3.36 },
  { time: '2018-12-19', value: 3.65 },
  { time: '2018-12-20', value: 3.7 },
  { time: '2018-12-21', value: 3.66 },
  { time: '2018-12-24', value: 3.66 },
  { time: '2018-12-26', value: 3.65 },
  { time: '2018-12-27', value: 3.66 },
  { time: '2018-12-28', value: 3.68 },
  { time: '2018-12-31', value: 3.77 },
  { time: '2019-01-02', value: 3.72 },
  { time: '2019-01-03', value: 3.69 },
  { time: '2019-01-04', value: 3.71 },
  { time: '2019-01-07', value: 3.72 },
  { time: '2019-01-08', value: 3.72 },
  { time: '2019-01-09', value: 3.66 },
  { time: '2019-01-10', value: 3.85 },
  { time: '2019-01-11', value: 3.92 },
  { time: '2019-01-14', value: 3.94 },
  { time: '2019-01-15', value: 3.95 },
  { time: '2019-01-16', value: 4.0 },
  { time: '2019-01-17', value: 3.99 },
  { time: '2019-01-18', value: 3.6 },
  { time: '2019-01-22', value: 3.81 },
  { time: '2019-01-23', value: 3.7 },
  { time: '2019-01-24', value: 3.74 },
  { time: '2019-01-25', value: 3.8 },
  { time: '2019-01-28', value: 3.83 },
  { time: '2019-01-29', value: 3.7 },
  { time: '2019-01-30', value: 3.78 },
  { time: '2019-01-31', value: 3.35 },
  { time: '2019-02-01', value: 3.6 },
  { time: '2019-02-04', value: 3.65 },
  { time: '2019-02-05', value: 3.73 },
  { time: '2019-02-06', value: 3.71 },
  { time: '2019-02-07', value: 3.71 },
  { time: '2019-02-08', value: 3.72 },
  { time: '2019-02-11', value: 3.76 },
  { time: '2019-02-12', value: 3.84 },
  { time: '2019-02-13', value: 3.85 },
  { time: '2019-02-14', value: 3.87 },
  { time: '2019-02-15', value: 3.89 },
  { time: '2019-02-19', value: 3.9 },
  { time: '2019-02-20', value: 3.92 },
  { time: '2019-02-21', value: 3.96 },
  { time: '2019-02-22', value: 4.0 },
  { time: '2019-02-25', value: 3.93 },
  { time: '2019-02-26', value: 3.92 },
  { time: '2019-02-27', value: 3.67 },
  { time: '2019-02-28', value: 3.79 },
  { time: '2019-03-01', value: 3.86 },
  { time: '2019-03-04', value: 3.94 },
  { time: '2019-03-05', value: 4.02 },
  { time: '2019-03-06', value: 3.95 },
  { time: '2019-03-07', value: 3.89 },
  { time: '2019-03-08', value: 3.94 },
  { time: '2019-03-11', value: 3.91 },
  { time: '2019-03-12', value: 3.92 },
  { time: '2019-03-13', value: 4.0 },
  { time: '2019-03-14', value: 4.05 },
  { time: '2019-03-15', value: 4.11 },
  { time: '2019-03-18', value: 4.1 },
  { time: '2019-03-19', value: 3.98 },
  { time: '2019-03-20', value: 4.11 },
  { time: '2019-03-21', value: 4.12 },
  { time: '2019-03-22', value: 3.88 },
  { time: '2019-03-25', value: 3.85 },
  { time: '2019-03-26', value: 3.72 },
  { time: '2019-03-27', value: 3.73 },
  { time: '2019-03-28', value: 3.8 },
  { time: '2019-03-29', value: 3.77 },
  { time: '2019-04-01', value: 4.06 },
  { time: '2019-04-02', value: 3.93 },
  { time: '2019-04-03', value: 3.95 },
  { time: '2019-04-04', value: 4.06 },
  { time: '2019-04-05', value: 4.16 },
  { time: '2019-04-08', value: 4.12 },
  { time: '2019-04-09', value: 4.07 },
  { time: '2019-04-10', value: 4.13 },
  { time: '2019-04-11', value: 4.04 },
  { time: '2019-04-12', value: 4.04 },
  { time: '2019-04-15', value: 4.05 },
  { time: '2019-04-16', value: 4.01 },
  { time: '2019-04-17', value: 4.09 },
  { time: '2019-04-18', value: 4.0 },
  { time: '2019-04-22', value: 4.0 },
  { time: '2019-04-23', value: 4.06 },
  { time: '2019-04-24', value: 4.0 },
  { time: '2019-04-25', value: 3.81 },
  { time: '2019-04-26', value: 3.88 },
  { time: '2019-04-29', value: 3.91 },
  { time: '2019-04-30', value: 3.9 },
  { time: '2019-05-01', value: 4.02 },
  { time: '2019-05-02', value: 3.97 },
  { time: '2019-05-03', value: 4.02 },
  { time: '2019-05-06', value: 4.03 },
  { time: '2019-05-07', value: 4.04 },
  { time: '2019-05-08', value: 4.05 },
  { time: '2019-05-09', value: 4.05 },
  { time: '2019-05-10', value: 4.08 },
  { time: '2019-05-13', value: 4.05 },
  { time: '2019-05-14', value: 4.01 },
  { time: '2019-05-15', value: 4.03 },
  { time: '2019-05-16', value: 4.14 },
  { time: '2019-05-17', value: 4.09 },
  { time: '2019-05-20', value: 4.01 },
  { time: '2019-05-21', value: 4.12 },
  { time: '2019-05-22', value: 4.15 },
  { time: '2019-05-23', value: 4.18 },
  { time: '2019-05-24', value: 4.16 },
  { time: '2019-05-28', value: 4.89 },
];

const weekData = [
  { time: '2016-07-18', value: 4.1 },
  { time: '2016-07-25', value: 4.19 },
  { time: '2016-08-01', value: 4.24 },
  { time: '2016-08-08', value: 4.22 },
  { time: '2016-08-15', value: 3.98 },
  { time: '2016-08-22', value: 3.85 },
  { time: '2016-08-29', value: 3.98 },
  { time: '2016-09-05', value: 3.71 },
  { time: '2016-09-12', value: 3.84 },
  { time: '2016-09-19', value: 3.89 },
  { time: '2016-09-26', value: 3.65 },
  { time: '2016-10-03', value: 3.69 },
  { time: '2016-10-10', value: 3.67 },
  { time: '2016-10-17', value: 4.11 },
  { time: '2016-10-24', value: 3.8 },
  { time: '2016-10-31', value: 3.7 },
  { time: '2016-11-07', value: 3.4 },
  { time: '2016-11-14', value: 3.32 },
  { time: '2016-11-21', value: 3.48 },
  { time: '2016-11-28', value: 3.08 },
  { time: '2016-12-05', value: 3.06 },
  { time: '2016-12-12', value: 3.11 },
  { time: '2016-12-19', value: 3.34 },
  { time: '2016-12-26', value: 3.2 },
  { time: '2017-01-02', value: 3.33 },
  { time: '2017-01-09', value: 3.56 },
  { time: '2017-01-16', value: 3.32 },
  { time: '2017-01-23', value: 3.71 },
  { time: '2017-01-30', value: 3.85 },
  { time: '2017-02-06', value: 3.77 },
  { time: '2017-02-13', value: 3.94 },
  { time: '2017-02-20', value: 3.67 },
  { time: '2017-02-27', value: 3.6 },
  { time: '2017-03-06', value: 3.54 },
  { time: '2017-03-13', value: 3.84 },
  { time: '2017-03-20', value: 3.96 },
  { time: '2017-03-27', value: 3.9 },
  { time: '2017-04-03', value: 3.97 },
  { time: '2017-04-10', value: 4.0 },
  { time: '2017-04-17', value: 4.13 },
  { time: '2017-04-24', value: 4.02 },
  { time: '2017-05-01', value: 4.3 },
  { time: '2017-05-08', value: 4.27 },
  { time: '2017-05-15', value: 4.24 },
  { time: '2017-05-22', value: 4.02 },
  { time: '2017-05-29', value: 4.2 },
  { time: '2017-06-05', value: 4.12 },
  { time: '2017-06-12', value: 4.2 },
  { time: '2017-06-19', value: 4.46 },
  { time: '2017-06-26', value: 4.39 },
  { time: '2017-07-03', value: 4.52 },
  { time: '2017-07-10', value: 4.57 },
  { time: '2017-07-17', value: 4.65 },
  { time: '2017-07-24', value: 4.45 },
  { time: '2017-07-31', value: 4.37 },
  { time: '2017-08-07', value: 4.13 },
  { time: '2017-08-14', value: 4.21 },
  { time: '2017-08-21', value: 4.31 },
  { time: '2017-08-28', value: 4.33 },
  { time: '2017-09-04', value: 4.38 },
  { time: '2017-09-11', value: 4.38 },
  { time: '2017-09-18', value: 4.5 },
  { time: '2017-09-25', value: 4.39 },
  { time: '2017-10-02', value: 3.95 },
  { time: '2017-10-09', value: 4.15 },
  { time: '2017-10-16', value: 4.43 },
  { time: '2017-10-23', value: 4.22 },
  { time: '2017-10-30', value: 4.14 },
  { time: '2017-11-06', value: 4.08 },
  { time: '2017-11-13', value: 4.27 },
  { time: '2017-11-20', value: 4.3 },
  { time: '2017-11-27', value: 3.92 },
  { time: '2017-12-04', value: 4.1 },
  { time: '2017-12-11', value: 3.88 },
  { time: '2017-12-18', value: 3.82 },
  { time: '2017-12-25', value: 3.82 },
  { time: '2018-01-01', value: 3.81 },
  { time: '2018-01-08', value: 3.95 },
  { time: '2018-01-15', value: 4.03 },
  { time: '2018-01-22', value: 4.04 },
  { time: '2018-01-29', value: 3.96 },
  { time: '2018-02-05', value: 3.99 },
  { time: '2018-02-12', value: 4.0 },
  { time: '2018-02-19', value: 4.06 },
  { time: '2018-02-26', value: 3.77 },
  { time: '2018-03-05', value: 3.81 },
  { time: '2018-03-12', value: 3.88 },
  { time: '2018-03-19', value: 3.72 },
  { time: '2018-03-26', value: 3.75 },
  { time: '2018-04-02', value: 3.7 },
  { time: '2018-04-09', value: 3.73 },
  { time: '2018-04-16', value: 3.74 },
  { time: '2018-04-23', value: 3.69 },
  { time: '2018-04-30', value: 3.76 },
  { time: '2018-05-07', value: 3.89 },
  { time: '2018-05-14', value: 3.89 },
  { time: '2018-05-21', value: 4.0 },
  { time: '2018-05-28', value: 3.79 },
  { time: '2018-06-04', value: 4.11 },
  { time: '2018-06-11', value: 4.43 },
  { time: '2018-06-18', value: 4.3 },
  { time: '2018-06-25', value: 4.58 },
  { time: '2018-07-02', value: 4.33 },
  { time: '2018-07-09', value: 4.33 },
  { time: '2018-07-16', value: 4.32 },
  { time: '2018-07-23', value: 4.2 },
  { time: '2018-07-30', value: 4.03 },
  { time: '2018-08-06', value: 4.15 },
  { time: '2018-08-13', value: 4.17 },
  { time: '2018-08-20', value: 4.28 },
  { time: '2018-08-27', value: 3.86 },
  { time: '2018-09-03', value: 3.69 },
  { time: '2018-09-10', value: 3.69 },
  { time: '2018-09-17', value: 3.64 },
  { time: '2018-09-24', value: 3.67 },
  { time: '2018-10-01', value: 3.55 },
  { time: '2018-10-08', value: 3.59 },
  { time: '2018-10-15', value: 4.19 },
  { time: '2018-10-22', value: 3.81 },
  { time: '2018-10-29', value: 3.74 },
  { time: '2018-11-05', value: 3.75 },
  { time: '2018-11-12', value: 3.75 },
  { time: '2018-11-19', value: 3.72 },
  { time: '2018-11-26', value: 3.41 },
  { time: '2018-12-03', value: 3.39 },
  { time: '2018-12-10', value: 3.52 },
  { time: '2018-12-17', value: 3.66 },
  { time: '2018-12-24', value: 3.68 },
  { time: '2018-12-31', value: 3.71 },
  { time: '2019-01-07', value: 3.92 },
  { time: '2019-01-14', value: 3.6 },
  { time: '2019-01-21', value: 3.8 },
  { time: '2019-01-28', value: 3.6 },
  { time: '2019-02-04', value: 3.72 },
  { time: '2019-02-11', value: 3.89 },
  { time: '2019-02-18', value: 4.0 },
  { time: '2019-02-25', value: 3.86 },
  { time: '2019-03-04', value: 3.94 },
  { time: '2019-03-11', value: 4.11 },
  { time: '2019-03-18', value: 3.88 },
  { time: '2019-03-25', value: 3.77 },
  { time: '2019-04-01', value: 4.16 },
  { time: '2019-04-08', value: 4.04 },
  { time: '2019-04-15', value: 4.0 },
  { time: '2019-04-22', value: 3.88 },
  { time: '2019-04-29', value: 4.02 },
  { time: '2019-05-06', value: 4.08 },
  { time: '2019-05-13', value: 4.09 },
  { time: '2019-05-20', value: 4.16 },
  { time: '2019-05-27', value: 4.89 },
];

const monthData = [
  { time: '2006-12-01', value: 3.4 },
  { time: '2007-01-01', value: 3.5 },
  { time: '2007-02-01', value: 3.11 },
  { time: '2007-03-01', value: 3.24 },
  { time: '2007-04-02', value: 3.34 },
  { time: '2007-05-01', value: 24.82 },
  { time: '2007-06-01', value: 23.85 },
  { time: '2007-07-02', value: 23.24 },
  { time: '2007-08-01', value: 23.05 },
  { time: '2007-09-03', value: 22.26 },
  { time: '2007-10-01', value: 22.52 },
  { time: '2007-11-01', value: 20.84 },
  { time: '2007-12-03', value: 20.37 },
  { time: '2008-01-01', value: 23.9 },
  { time: '2008-02-01', value: 22.58 },
  { time: '2008-03-03', value: 21.74 },
  { time: '2008-04-01', value: 22.5 },
  { time: '2008-05-01', value: 22.38 },
  { time: '2008-06-02', value: 20.58 },
  { time: '2008-07-01', value: 20.6 },
  { time: '2008-08-01', value: 20.82 },
  { time: '2008-09-01', value: 17.5 },
  { time: '2008-10-01', value: 17.7 },
  { time: '2008-11-03', value: 15.52 },
  { time: '2008-12-01', value: 18.58 },
  { time: '2009-01-01', value: 15.4 },
  { time: '2009-02-02', value: 11.68 },
  { time: '2009-03-02', value: 14.89 },
  { time: '2009-04-01', value: 16.24 },
  { time: '2009-05-01', value: 18.33 },
  { time: '2009-06-01', value: 18.08 },
  { time: '2009-07-01', value: 20.07 },
  { time: '2009-08-03', value: 20.35 },
  { time: '2009-09-01', value: 21.53 },
  { time: '2009-10-01', value: 21.48 },
  { time: '2009-11-02', value: 20.28 },
  { time: '2009-12-01', value: 21.39 },
  { time: '2010-01-01', value: 22.0 },
  { time: '2010-02-01', value: 22.31 },
  { time: '2010-03-01', value: 22.82 },
  { time: '2010-04-01', value: 22.58 },
  { time: '2010-05-03', value: 21.02 },
  { time: '2010-06-01', value: 21.45 },
  { time: '2010-07-01', value: 22.42 },
  { time: '2010-08-02', value: 23.61 },
  { time: '2010-09-01', value: 24.4 },
  { time: '2010-10-01', value: 24.46 },
  { time: '2010-11-01', value: 23.64 },
  { time: '2010-12-01', value: 22.9 },
  { time: '2011-01-03', value: 23.73 },
  { time: '2011-02-01', value: 23.52 },
  { time: '2011-03-01', value: 24.15 },
  { time: '2011-04-01', value: 24.37 },
  { time: '2011-05-02', value: 24.4 },
  { time: '2011-06-01', value: 24.45 },
  { time: '2011-07-01', value: 24.24 },
  { time: '2011-08-01', value: 24.0 },
  { time: '2011-09-01', value: 22.77 },
  { time: '2011-10-03', value: 24.21 },
  { time: '2011-11-01', value: 23.4 },
  { time: '2011-12-01', value: 23.9 },
  { time: '2012-01-02', value: 24.84 },
  { time: '2012-02-01', value: 3.04 },
  { time: '2012-03-01', value: 24.9 },
  { time: '2012-04-02', value: 3.06 },
  { time: '2012-05-01', value: 24.63 },
  { time: '2012-06-01', value: 3.07 },
  { time: '2012-07-02', value: 3.3 },
  { time: '2012-08-01', value: 3.08 },
  { time: '2012-09-03', value: 3.27 },
  { time: '2012-10-01', value: 3.39 },
  { time: '2012-11-01', value: 3.06 },
  { time: '2012-12-03', value: 3.03 },
  { time: '2013-01-01', value: 3.26 },
  { time: '2013-02-01', value: 3.2 },
  { time: '2013-03-01', value: 3.3 },
  { time: '2013-04-01', value: 3.38 },
  { time: '2013-05-01', value: 3.22 },
  { time: '2013-06-03', value: 24.88 },
  { time: '2013-07-01', value: 24.98 },
  { time: '2013-08-01', value: 24.6 },
  { time: '2013-09-02', value: 24.65 },
  { time: '2013-10-01', value: 24.62 },
  { time: '2013-11-01', value: 24.65 },
  { time: '2013-12-02', value: 24.7 },
  { time: '2014-01-01', value: 24.98 },
  { time: '2014-02-03', value: 24.95 },
  { time: '2014-03-03', value: 3.45 },
  { time: '2014-04-01', value: 3.4 },
  { time: '2014-05-01', value: 3.51 },
  { time: '2014-06-02', value: 3.34 },
  { time: '2014-07-01', value: 3.3 },
  { time: '2014-08-01', value: 3.36 },
  { time: '2014-09-01', value: 3.16 },
  { time: '2014-10-01', value: 3.53 },
  { time: '2014-11-03', value: 3.4 },
  { time: '2014-12-01', value: 3.7 },
  { time: '2015-01-01', value: 3.95 },
  { time: '2015-02-02', value: 3.81 },
  { time: '2015-03-02', value: 3.63 },
  { time: '2015-04-01', value: 3.39 },
  { time: '2015-05-01', value: 3.62 },
  { time: '2015-06-01', value: 3.23 },
  { time: '2015-07-01', value: 3.47 },
  { time: '2015-08-03', value: 3.18 },
  { time: '2015-09-01', value: 3.3 },
  { time: '2015-10-01', value: 3.68 },
  { time: '2015-11-02', value: 3.63 },
  { time: '2015-12-01', value: 3.57 },
  { time: '2016-01-01', value: 3.55 },
  { time: '2016-02-01', value: 3.05 },
  { time: '2016-03-01', value: 3.61 },
  { time: '2016-04-01', value: 3.91 },
  { time: '2016-05-02', value: 3.84 },
  { time: '2016-06-01', value: 3.94 },
  { time: '2016-07-01', value: 4.19 },
  { time: '2016-08-01', value: 4.06 },
  { time: '2016-09-01', value: 3.65 },
  { time: '2016-10-03', value: 3.8 },
  { time: '2016-11-01', value: 3.06 },
  { time: '2016-12-01', value: 3.2 },
  { time: '2017-01-02', value: 3.7 },
  { time: '2017-02-01', value: 3.78 },
  { time: '2017-03-01', value: 3.9 },
  { time: '2017-04-03', value: 4.02 },
  { time: '2017-05-01', value: 4.02 },
  { time: '2017-06-01', value: 4.39 },
  { time: '2017-07-03', value: 4.3 },
  { time: '2017-08-01', value: 4.14 },
  { time: '2017-09-01', value: 4.39 },
  { time: '2017-10-02', value: 4.12 },
  { time: '2017-11-01', value: 3.81 },
  { time: '2017-12-01', value: 3.82 },
  { time: '2018-01-01', value: 4.06 },
  { time: '2018-02-01', value: 3.78 },
  { time: '2018-03-01', value: 3.75 },
  { time: '2018-04-02', value: 3.72 },
  { time: '2018-05-01', value: 3.75 },
  { time: '2018-06-01', value: 4.58 },
  { time: '2018-07-02', value: 4.14 },
  { time: '2018-08-01', value: 3.86 },
  { time: '2018-09-03', value: 3.67 },
  { time: '2018-10-01', value: 3.82 },
  { time: '2018-11-01', value: 3.41 },
  { time: '2018-12-03', value: 3.77 },
  { time: '2019-01-01', value: 3.35 },
  { time: '2019-02-01', value: 3.79 },
  { time: '2019-03-01', value: 3.77 },
  { time: '2019-04-01', value: 3.9 },
  { time: '2019-05-01', value: 4.89 },
];

const yearData = [
  { time: '2006-01-02', value: 24.89 },
  { time: '2007-01-01', value: 3.5 },
  { time: '2008-01-01', value: 23.9 },
  { time: '2009-01-01', value: 15.4 },
  { time: '2010-01-01', value: 22.0 },
  { time: '2011-01-03', value: 23.73 },
  { time: '2012-01-02', value: 24.84 },
  { time: '2013-01-01', value: 3.26 },
  { time: '2014-01-01', value: 24.98 },
  { time: '2015-01-01', value: 3.95 },
  { time: '2016-01-01', value: 3.55 },
  { time: '2017-01-02', value: 3.7 },
  { time: '2018-01-01', value: 4.06 },
  { time: '2019-01-01', value: 4.89 },
];

const seriesesData = new Map([
  ['1D', dayData],
  ['1W', weekData],
  ['1M', monthData],
  ['1Y', yearData],
]);
