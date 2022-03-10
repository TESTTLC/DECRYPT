import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { launchpadProjects } from 'src/utils/launchpadProjects';
import { LaunchpadProject } from 'src/utils/types';

import ProjectElement from '../Launchpad/components/ProjectElement';

const ProjectDetails: React.FC = () => {
  const { coinTag } = useParams();
  const [project, setProject] = useState<LaunchpadProject>();
  useEffect(() => {
    if (coinTag === 'TLX') {
      setProject(launchpadProjects.TLX);
    } else if (coinTag === 'TLC') {
      setProject(launchpadProjects.TLC);
    } else if (coinTag === 'LSO') {
      setProject(launchpadProjects.LSO);
    } else if (coinTag === 'default') {
      setProject(launchpadProjects.DEFAULT);
    }
  }, [coinTag]);

  return project ? (
    // bg-blockchain bg-cover blur-xl
    <div className="py-4 w-full grid gap-y-4 gap-x-4 md:gap-x-0 sm:gap-x-0 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 grid-cols-7 justify-center ">
      <div className="flex flex-col h-128 col-span-2 lg:col-span-3 xs:col-span-7">
        {/* <GlowingWrapper customStyles=""> */}
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        <ProjectElement coinTag={coinTag!} showStakingButton />
        {/* </GlowingWrapper> */}
      </div>
      <div className="flex flex-col col-span-4 md:col-span-5 xs:col-span-7">
        <div className="py-8 xs:py-4 px-10 xs:px-2 flex flex-grow flex-col w-full min-h-[52rem] bg-black bg-opacity-50 relative rounded-md">
          <div className="flex items-center justify-center text-white">
            <img
              src={project.imageSource}
              alt={project.title}
              className="h-14 w-14 rounded-full object-cover object-top border-2 border-gray-500"
            ></img>
            <p className="ml-6 text-start font-oswald uppercase font-bold text-3xl">
              {project.title} ({project.coinTag})
            </p>
          </div>
          <a
            href={`https://${project.website}`}
            target={'_blank'}
            className="text-center text-white flex w-full justify-center font-poppins hover:cursor-pointer"
            rel="noreferrer"
          >
            <p>See more on&nbsp;</p>
            <p className="text-green-400">{project.website}</p>
          </a>
          <p className="text-gray-300 text-md font-poppins mt-4">
            {project.moreDetails}
          </p>
          <div className="mt-10">
            <p className="uppercase font-oswald text-2xl text-white">
              Pool Details
            </p>
            <div className="w-full mt-4">
              <div className="w-3/5 xl:w-4/5 lg:w-full md:w-full sm:w-full xs:w-full">
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Start/End:</p>
                  <p className="text-green-400 text-md">
                    7 Feb 11am UTC - 7pm UTC
                  </p>
                </div>
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Registration:</p>
                  <p className="text-green-400 text-md">
                    5 Feb 11am UTC - 6 Feb 8pm UTC
                  </p>
                </div>
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">FCFS Opens:</p>
                  <p className="text-green-400 text-md">7 Feb 6:40pm UTC</p>
                </div>
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Swap Rate:</p>
                  <p className="text-green-400 text-md">
                    1 LSO = $0.07 | 15 LSO per 1 USDT
                  </p>
                </div>
              </div>
              <div className="mb-2 flex justify-start items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Base Allocation:</p>
                <p className="text-gray-300 text-md">
                  Distribution is calculated based on power and number of users
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="uppercase font-oswald text-2xl text-white">Token</p>
            <div className="w-full mt-4">
              <div className="w-3/5 xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-full xs:w-full">
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Token:</p>
                  <p className="text-green-400 text-md">Lusso (LSO)</p>
                </div>
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Total Supply:</p>
                  <p className="text-green-400 text-md">1,000,000,000</p>
                </div>
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Initial Supply:</p>
                  <p className="text-green-400 text-md">100,000,000 LSO</p>
                </div>
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Market Cap:</p>
                  <p className="text-green-400 text-md">$7,000,000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="uppercase font-oswald text-2xl text-white">
              Distribution
            </p>
            <div className="w-full mt-4">
              <div className="w-3/5 xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-full xs:w-full">
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Distribution:</p>
                  <p className="text-green-400 text-md">
                    Claimed on Decryption
                  </p>
                </div>
                <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                  <p className="text-gray-200">Vesting:</p>
                  <p className="text-green-400 text-md">
                    10% TGE, then 6 Months linear
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProjectDetails;
