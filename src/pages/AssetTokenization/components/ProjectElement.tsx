import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import SocialMediaIcons from 'src/components/SocialMediaIcons';
// import { assetTokenizationProjects } from 'src/utils/assetTokenizationProjects';

import LaunchpadModal from '../../../components/LaunchpadModal';
import { assetTokenizationProjects } from '../../../utils/assetTokenizationProjects';
import { AssetTokenizationProject } from '../../../utils/types';

interface Props {
  coinTag: string;
  showStakingButton?: boolean;
  showHoverAnimation?: boolean;
}

const ProjectElement: React.FC<Props> = ({
  coinTag,
  showStakingButton,
  showHoverAnimation,
}) => {
  const [project, setProject] = useState<AssetTokenizationProject>(
    assetTokenizationProjects.CVL,
  );

  useEffect(() => {
    if (coinTag === 'CVL') {
      setProject(assetTokenizationProjects.CVL);
    } else if (coinTag === 'default') {
      setProject(assetTokenizationProjects.DEFAULT);
    }
  }, [coinTag]);
  const utcDate = new Date(Date.UTC(2022, 1, 7));

  const renderer = ({
    days,
    hours,
    minutes,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    return !completed ? (
      <p className="text-gray-200 text-sm mb-2">
        Registration opens in {days} {days === 1 ? 'Day' : 'Days'}, {hours}{' '}
        {hours === 1 ? 'Hour' : 'Hours'}, {minutes}{' '}
        {minutes === 1 ? 'Minute' : 'Minutes'}
      </p>
    ) : (
      <p className="text-gray-200 text-sm mb-2">Registration started</p>
    );
  };

  return (
    <div
      className={`flex flex-grow flex-col w-full h-128 bg-black bg-opacity-50 relative rounded-md
      ${
        showHoverAnimation
          ? 'transform duration-100 hover:scale-[1.04]'
          : undefined
      }`}
    >
      <div className="flex justify-between pl-4 pr-3 pt-4 text-white">
        <div>
          <p className="text-start font-oswald uppercase font-bold text-2xl">
            {project.title}
          </p>
          <p className="text-gray-300 text-lg">{project.coinTag}</p>
          <SocialMediaIcons
            hideGitHub
            hideGoogle
            hideInstagram
            hideLinkedIn
            customStyles={'my-1'}
          />
        </div>
        <img
          src={project.imageSource}
          alt={project.title}
          className="h-20 w-20 rounded-full object-cover object-top border-2 border-gray-500"
        ></img>
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <p className="mt-2 mb-1 w-24 bg-gray-700 rounded-full p-1 text-center text-sm text-gray-300 font-poppins uppercase font-semibold ">
            Upcoming
          </p>
          <p className="font-poppins font-regular text-gray-300 text-sm">
            {project.description}
          </p>
        </div>

        <div className="absolute bottom-1 w-full px-4">
          <div className="flex justify-between items-center font-poppins">
            <p className="text-gray-200">Total Raise</p>
            <p className="text-green-400 text-2xl">$200,000</p>
          </div>
          <div className="flex justify-between items-center font-poppins mt-1">
            <p className="text-gray-200">Starts</p>
            <p className="text-green-400 text-md">1st March 22</p>
          </div>

          <div className="flex flex-col font-poppins mt-3">
            <Countdown date={utcDate} renderer={renderer} />
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-indigo-500 h-2.5 rounded-full w-[20%]"></div>
            </div>
            <div className="flex flex-col items-end w-full mt-4">
              <p className="text-gray-200 text-xs text-center">
                Join the group of investors earning from the development of the
                Crypto Village
              </p>
            </div>
          </div>
          {showStakingButton ? (
            <LaunchpadModal
              index={project.id}
              coinTag={'default'}
              projectItem={project}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectElement;
