import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { calculateBingo, clear, fill, markNum, unmarkNum } from "../../redux/slice/TileSlice";
import { Const } from "../static/constants";
import GameHandler from "../handler/GameHandler";
import TimeHandler from "../handler/TimeHandler";
import { useNavigate } from "react-router-dom";

function useGamePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showTimer, setShowTimer] = useState(GameHandler.isMyTurn());
  const [remaining, setRemaining] = useState(Const.gameTimer);
  useEffect(() => {
    const timer = new TimeHandler(Const.gameTimer);

    if (GameHandler.isMyTurn()) {
      timer.exec(timerCallback(setRemaining, setShowTimer, timer));
    }

    dispatch(clear());
    dispatch(fill());

    const unsub1 = GameHandler.onMarkNumber((data) => {
      console.log("Received Data", data);
      const { valid, num } = data;
      if (valid) dispatch(markNum(num)); else dispatch(unmarkNum(num));
      timerHandle(setRemaining, setShowTimer, timer);
      dispatch(calculateBingo());
    });

    const unsub2 = GameHandler.onTurnChange(() =>
      timerHandle(setRemaining, setShowTimer, timer)
    );

    const unsub3 = GameHandler.onWinnerChange((data) => {
      navigate(`/win?winnername=${data.name}&id=${data.id}&roomid=${GameHandler.getRoomID()}`);
    });

    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, []);

  return [showTimer, remaining];
}

function timerCallback(
  setRemaining: React.Dispatch<React.SetStateAction<number>>,
  setShowTimer: React.Dispatch<React.SetStateAction<boolean>>,
  timer: TimeHandler
) {
  return (duration: number) => {
    setRemaining(duration);
    if (duration <= 1) {
      setShowTimer(false);
      timer.shutDown();
      GameHandler.skipMyTurn();
    }
  };
}

function timerHandle(
  setRemaining: React.Dispatch<React.SetStateAction<number>>,
  setShowTimer: React.Dispatch<React.SetStateAction<boolean>>,
  timer: TimeHandler
) {
  if (GameHandler.isMyTurn()) {
    setRemaining(Const.gameTimer);
    setShowTimer(true);
    timer.shutDown();
    timer.exec(timerCallback(setRemaining, setShowTimer, timer));
  } else {
    timer.shutDown();
    setShowTimer(false);
  }
}

export default useGamePage;