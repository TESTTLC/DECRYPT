import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../../utils/context";
import TheLuxuryPng from "../../assets/images/the_luxury.png";
import LaunchpadModal from "../../components/LaunchpadModal";
import ProjectItem from "./components/ProjectItem";
import GlowingWrapper from "../../components/GlowingWrapper";

const Launchpad: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center px-2">
      <p className="text-white font-bold text-2xl mb-4">Upcoming Projects</p>
      <div className="flex">
        <GlowingWrapper>
          <ProjectItem item={"TLX"} />
        </GlowingWrapper>
        <GlowingWrapper customStyles="mx-6">
          <ProjectItem item={"TLC"} />
        </GlowingWrapper>
      </div>
      {/* <p className="text-white">Launchpad</p> */}
    </div>
  );
};

export default Launchpad;
