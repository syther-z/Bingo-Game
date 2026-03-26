import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGridValue } from "../../shared/utils/gridValueGenerator";
import './style.css';
import GameGrid from "../../shared/components/grid/GameGrid";
import BingoTitle from "../../shared/components/title/BingoTitle";
import GameTimer from "../../shared/components/timer/GameTimer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { calculateBingo, clear, fill, markNum, unmarkNum } from "../../redux/slice/TileSlice";
import GameHandler from "../../shared/handler/GameHandler";
import TimeHandler from "../../shared/handler/TimeHandler";
import { Const } from "../../shared/static/constants";
import Background from "../../shared/components/background/Background";
// import GameHandler from "../../shared/handler/roomHandler";
// import TileState from "../../shared/state/TileState";
const GamePage = () => {
    const { roomid } = useParams();
    const tileSlice = useSelector((state: RootState) => state.tileSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showTimer, setShowTimer] = useState(GameHandler.getTurn() === GameHandler.getCurrentTurn());
    const [remaining, setRemaining] = useState(Const.gameTimer);
    if(tileSlice.bingo === 5){
        GameHandler.iAmWinner();
        // navigate(`/win?winnername=${GameHandler.getName()}&id=${GameHandler.get}`);
    }
    useEffect(() => {
        dispatch(clear());
        dispatch(fill());
        const tCallback = (duration: number) => {
            setRemaining(duration);
            if(duration <= 1) {
                setShowTimer(false);
                timer.shutDown();
                GameHandler.skipMyTurn();
            }
        }
        const f = () => {
            if(GameHandler.isMyTurn()){
                setRemaining(() => Const.gameTimer);
                setShowTimer(() => true);
                timer.shutDown();
                timer.exec(tCallback);
            } else {
                timer.shutDown();
                setShowTimer(() => false);
            };
        }
        const timer = new TimeHandler(Const.gameTimer);
        if(GameHandler.isMyTurn()) timer.exec(tCallback);

        //MARK NUMBER
        const unsub = GameHandler.onMarkNumber((data) => {
            console.log('Recieved Data',data);
            const { valid, num } = data;

            if(valid) dispatch(markNum(num)); else dispatch(unmarkNum(num));
            f();
            dispatch(calculateBingo());
        });

        const unsub2 = GameHandler.onTurnChange(() => f());
        const unsub3 = GameHandler.onWinnerChange((data) => {
            navigate(`/win?winnername=${data.name}&id=${data.id}`);
        });
        return () => {
            unsub();
            unsub2();
            unsub3();
        }
    }, []);


  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
        <Background />
      <BingoTitle fill={tileSlice.bingo} />
      <GameGrid valArr={tileSlice.value}/>
      <div className="w-[60px] h-[60px] absolute top-5 right-5">
        {showTimer && <GameTimer durationSeconds={12} remaining={remaining} />}
      </div>
    </div>
  );
};

export default GamePage;
