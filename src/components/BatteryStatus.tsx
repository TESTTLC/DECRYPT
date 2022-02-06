import React, { useState, useEffect } from "react";

interface Props {
  power: number;
  powerColor: string;
}

const BatteryStatus: React.FC<Props> = ({ power, powerColor }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-48 flex items-center justify-center ">
        <p
          className="mr-8 text-2xl font-semibold font-poppins"
          style={{ color: powerColor }}
        >
          {power}%
        </p>
        <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
          <div className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div>
          <div
            className=" cursor-default z-40 animate-pulse  text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
            style={{
              width: `${power.toString()}%`,
              backgroundColor: powerColor,
            }}
          ></div>
          <div className="absolute z-50 left-0 mx-8 mt-2 text-yellow-400 ">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryStatus;
