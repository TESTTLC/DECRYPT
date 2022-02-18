import React from "react";
import Countdown from "react-countdown";
import TimerBoxComp from "../components/TimberBoxComp";
import logo from "../assets/images/logo.png";
import { useWindowSize } from "../hooks/useWindowSize";
import Home from "./Home";
const CountDown: React.FC = () => {
  const { isMobileSize } = useWindowSize();

  const utcDate = new Date(Date.UTC(2021, 11, 1, 15, 0, 0));
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    return !completed ? (
      <div className="bg-black xs:pt-8 pt-24">
        <img
          src={logo}
          width={isMobileSize ? 150 : 240}
          height={isMobileSize ? 150 : 240}
          alt="logo"
          className="mx-auto"
        />
        <div
          className=""
          style={{
            backgroundPosition: "bottom",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className=""
            style={{
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="py-8 flex flex-col justify-between">
              <div className="mt-8 flex flex-col items-center space-y-12 md:mt-28 md:space-y-24">
                <span className="text-light font-bold text-lg tracking-3xl text-center text-white">
                  WE'RE LAUNCHING SOON
                </span>

                <div>
                  <div className="grid xs:grid-cols-2 grid-cols-4 auto-rows-max gap-8 md:grid-cols-4">
                    <TimerBoxComp value={days} label="days" />
                    <TimerBoxComp value={hours} label="hours" />
                    <TimerBoxComp value={minutes} label="minutes" />
                    <TimerBoxComp value={seconds} label="seconds" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Home />
    );
  };

  return <Countdown date={utcDate} renderer={renderer} />;
};

export default CountDown;
