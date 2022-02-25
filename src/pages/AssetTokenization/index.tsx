import React from 'react';
import { useNavigate } from 'react-router-dom';

import GlowingWrapper from '../../components/GlowingWrapper';

import ProjectItem from './components/ProjectItem';
import ProjectElement from './components/ProjectElement';

const AssetTokenization: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center px-2">
      <div className="justify-center items-center flex flex-col">
        <p className="text-white font-poppins font-bold text-3xl mb-2 mt-2 text-center">
          DECRYPTION | Multi-Chain Assets Tokenization
        </p>
        <p className="text-white font-poppins font-normal text-lg mb-2 text-center">
          Hand-picked high-quality Blockchain projects.
        </p>
      </div>
      <p className="text-white font-poppins font-bold text-2xl mb-4 mt-4">
        Upcoming Projects
      </p>
      <div className="grid gap-4 grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
        <div className="flex" onClick={() => navigate('/tokenization/CVL')}>
          <ProjectElement coinTag={'CVL'} showHoverAnimation />
        </div>
        <div className="flex">
          <GlowingWrapper>
            <ProjectItem coinTag={'default'} />
          </GlowingWrapper>
        </div>
        <div className="flex">
          <GlowingWrapper>
            <ProjectItem coinTag={'default'} />
          </GlowingWrapper>
        </div>
        <div className="flex">
          <GlowingWrapper customStyles="">
            <ProjectItem coinTag={'default'} />
          </GlowingWrapper>
        </div>
      </div>
      <p className="text-white text-center font-poppins mt-16 font-bold text-md">
        Want to launch your project on Decryption? Apply to AssetTokenization
      </p>
      <div className="flex items-center justify-center mt-4">
        <input
          type="text"
          className="
                form-control
                block
                w-60
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-black opacity-60 bg-clip-padding
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
          id="exampleFormControlInput1"
          placeholder="Email address"
        />
        <div className="ml-4">
          <button
            type="submit"
            className="font-poppins inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetTokenization;
