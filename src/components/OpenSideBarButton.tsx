import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar } from 'src/redux/modules/globals/actions';
import { StoreState } from 'src/utils/storeTypes';

const OpenSideBarButton: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector<StoreState, boolean>(
    (state) => state.globals.isSidebarOpen,
  );

  return (
    <button
      onClick={() => {
        dispatch(openSidebar());
      }}
      className={`${
        isSidebarOpen ? '-translate-x-20' : 'translate-x-0 '
      }  top-2 transition transform ease-linear duration-500 text-white w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800
        mt-4 fixed z-50`}
    >
      <FaBars className="w-5 h-5" />
    </button>
  );
};

export default OpenSideBarButton;
