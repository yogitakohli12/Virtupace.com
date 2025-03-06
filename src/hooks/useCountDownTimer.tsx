import React, { useEffect, useState } from "react";

const useCountdownTimer = (deadline: Date) => {
  const [countDown, setCountDown] = useState<{
    d: number;
    h: number;
    m: number;
    s: number;
  }>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;
      if (distance <= 0) {
        clearInterval(intervalId);
        setCountDown({ ...countDown, d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesRemaining = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);
      setCountDown({
        ...countDown,
        d: daysRemaining,
        h: hoursRemaining,
        m: minutesRemaining,
        s: secondsRemaining,
      });
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  const isExpired = () => {
    return (
      countDown.d === 0 &&
      countDown.h === 0 &&
      countDown.m === 0 &&
      countDown.s === 0
    );
  };
  return { ...countDown, isExpired };
};

export default useCountdownTimer;
