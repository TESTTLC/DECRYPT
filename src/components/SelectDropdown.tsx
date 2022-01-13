import React, { useEffect, useRef, useState } from "react";
import { useWalletConnector } from "../hooks/useWalletConnector";
import Header from "./Header";
import Modal from "react-modal";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../utils/context";

interface Props {
  text: string;
  elements: any[];
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputDropdown: React.FC<Props> = ({ text, elements, onSelect }) => {
  const [itemIndex, setItemIndex] = useState(0);
  return (
    <div className="inline-flex">
      <svg
        className="w-4 h-2 absolute top-3 right-3  pointer-events-none"
        viewBox="0 0 412 232"
      >
        <path
          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
          fill="#648299"
        />
      </svg>
      <select
        defaultValue={text}
        onChange={(e) => {
          onSelect(e);
          setItemIndex(e.target.selectedIndex);
        }}
        className={`
        ${
          itemIndex === 0 ? "text-gray-400" : "text-white"
        } bg-customBlue-300 borde border-gray-300 rounded-md h-8 pl-5 pr-10 
        hover:border-gray-400 focus:outline-none appearance-none`}
      >
        <option disabled>{text}</option>
        {elements.map((element, index) => (
          <option key={`${index}/${element}`}>{element}</option>
        ))}
      </select>
    </div>
  );
};

export default InputDropdown;
