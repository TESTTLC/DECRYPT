import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../../utils/context";
// import TheLuxuryPng from "../../assets/images/the_luxury.png";

const Dashboard: React.FC = () => {
  return (
    <div className="px-2 w-full flex flex-col justify-center">
      <p className="text-white font-bold text-2xl mb-4">Dashboard</p>
      <div className="grid gap-y-4 2xl:gap-x-8 xl:gap-x-8 lg:gap-x-8 grid-cols-7 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1">
        <div className="flex w-full col-span-2 flex-col h-96 bg-customBlue-300 justify-center items-center">
          <p className="text-white font-bold text-2xl mb-4">0 Projects</p>
          <p className="text-white font-bold text-2xl mb-4">0 Tokens</p>
          <p className="text-white font-bold text-2xl mb-4">3% Power</p>
        </div>
        <div className="w-full flex justify-center items-center col-start-3 col-span-5 md:col-span-1 sm:col-span-1 xs:col-span-1 h-96 bg-customBlue-300">
          <p className="text-white text-center font-poppins text-sm mb-4">
            You have not participated yet in any projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
