import { useEffect, useState } from "react";
import { isTimestamp } from "./types";
import { Timestamp } from "firebase/firestore";

type WindowDimensions = {
  width: number | undefined;
  height: number | undefined;
};

export const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};

export const deadlineToString = (deadline: any) => {
  const checkStamp = isTimestamp(deadline);
  if (checkStamp) {
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    var time = deadline.toMillis();
    var localISOTime = new Date(time - tzoffset).toISOString().slice(0, -1);
    return localISOTime;
  }
};
export const deadlineToDate = (ddeadline: any) => {
  const checkStamp = isTimestamp(ddeadline);
  if (checkStamp) {
    return ddeadline.toDate().toString();
  }
};
export const dateStringToTimestamp = (date: string) => {
  if (typeof date === "string" && date.length > 0) {
    var newdate = new Date(Date.parse(date));
    var timestamp = Timestamp.fromDate(newdate);
    return timestamp;
  }
  return "";
};
