import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import LaunchpadModal from "../../../components/LaunchpadModal";
import TheLuxuryPng from "../../../assets/images/the_luxury.png";
import { launchpadProjects } from "../../../utils/launchpadProjects";
import { LaunchpadProject } from "../../../utils/types";

interface Props {
  item: "TLX" | "TLC";
}

const ProjectItem: React.FC<Props> = ({ item }) => {
  const [projectItem, setProjectItem] = useState<LaunchpadProject>(
    launchpadProjects.TLX
  );

  useEffect(() => {
    if (item === "TLX") {
      setProjectItem(launchpadProjects.TLX);
    } else if (item === "TLC") {
      setProjectItem(launchpadProjects.TLC);
    }
  }, [item]);

  return (
    <div className="flex flex-grow flex-col w-full h-96 bg-gray-300 relative rounded-md overflow-hidden">
      <img
        src={TheLuxuryPng}
        className="h-full aspect-w-1 object-cover object-top"
      ></img>
      <div className="justify-center items-center absolute w-full py-1 px-3 bottom-0 inset-x-0 bg-gray-700 bg-opacity-70 text-white text-xs leading-4">
        <p className="text-center font-oswald uppercase font-semibold text-xl mb-2">
          The Luxury • TLX
        </p>

        <p className="font-poppins font-medium">
          The decentralized cryptocurrency created to become the token of
          reference for the luxury industry.
        </p>
        <LaunchpadModal index={projectItem.id} />
      </div>
    </div>
  );
};

export default ProjectItem;