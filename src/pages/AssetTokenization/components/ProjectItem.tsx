import React, { useEffect, useState } from 'react';
import LaunchpadModal from 'src/components/LaunchpadModal';
import { assetTokenizationProjects } from 'src/utils/assetTokenizationProjects';

import { AssetTokenizationProject } from '../../../utils/types';

interface Props {
  coinTag: string;
}

const ProjectItem: React.FC<Props> = ({ coinTag }) => {
  const [projectItem, setProjectItem] = useState<AssetTokenizationProject>(
    assetTokenizationProjects.CVL,
  );

  useEffect(() => {
    if (coinTag === 'CVL') {
      setProjectItem(assetTokenizationProjects.CVL);
    } else if (coinTag === 'default') {
      setProjectItem(assetTokenizationProjects.DEFAULT);
    }
  }, [coinTag]);

  return (
    <div className="flex flex-grow flex-col w-full h-128 bg-gray-300 relative rounded-md">
      <img
        src={projectItem.imageSource}
        alt={projectItem.title}
        className="h-full aspect-w-1 object-cover object-top"
      ></img>
      <div className="flex flex-col items-center justify-between absolute w-full min-h-[9rem] flex-grow py-1 px-3 bottom-0 inset-x-0 bg-gray-700 bg-opacity-70 text-white text-xs leading-4">
        <p className="text-center font-oswald uppercase font-semibold text-xl mb-2">
          {projectItem.title}
        </p>

        <p className="font-poppins font-medium">{projectItem.description}</p>
        {/* <div className="absolute bottom-0"> */}
        <LaunchpadModal
          index={projectItem.id}
          coinTag={'default'}
          projectItem={projectItem}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProjectItem;
