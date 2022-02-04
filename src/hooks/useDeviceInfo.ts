import { useEffect, useState } from "react";

export const useDeviceInfo = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    setIsMobileDevice(
      "ontouchstart" in window || "onmsgesturechange" in window
    );
    //maybe add the dependencies ontouchstart and onmsgesturechange
  }, []);

  return { isMobileDevice };
};
