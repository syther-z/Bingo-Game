import React, { useCallback, useEffect, useMemo, useState } from "react";
import TimeHandler from "../../handler/TimeHandler";
import GameHandler from "../../handler/GameHandler";
// import GameHandler from "../../handler/roomHandler";
// import TimeHanlder from "../../handler/TimerHandler";

const GameTimer = ({ durationSeconds = 12, remaining }: {durationSeconds: number, remaining: number }) => {
  const percent = useMemo(() => {
    if (!durationSeconds) return 0;
    return Math.round((remaining / durationSeconds) * 100);
  }, [remaining]);

  useEffect(() => {
    // GameHandler.onMarkNumber
  }, []);

  return (
    <div
      style={{
        background: `conic-gradient(hotpink ${percent}%, white 0)`,
      }}
      className="w-full h-full rounded-[50%] flex justify-center items-center"
    >
      <div
        className="w-9/10 h-9/10 bg-(--homepage-color) rounded-[50%]
         text-white flex justify-center items-center font-bold text-[18px]"
      >
        {remaining}
      </div>
    </div>
  );
};

export default GameTimer;
