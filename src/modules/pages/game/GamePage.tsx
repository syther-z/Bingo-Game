import './style.css';
import GameGrid from "../../shared/components/grid/GameGrid";
import BingoTitle from "../../shared/components/title/BingoTitle";
import GameTimer from "../../shared/components/timer/GameTimer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import Background from "../../shared/components/background/Background";
import useGamePage from "../../shared/hooks/useGame";
import { useEffect, useRef } from 'react';
import GameHandler from '../../shared/handler/GameHandler';
// import GameHandler from "../../shared/handler/roomHandler";
// import TileState from "../../shared/state/TileState";
const GamePage = () => {
    const tileSlice = useSelector((state: RootState) => state.tileSlice);
    const [showTimer, remaining] = useGamePage();
    const skipFirstRender = useRef(false);
    useEffect(() => {
        console.log('Tile Value: ',tileSlice.bingo, skipFirstRender.current);
        if(tileSlice.bingo === 5 && skipFirstRender.current){
            console.log('i am in');
            GameHandler.iAmWinner();
        }
        skipFirstRender.current = true;
    }, [tileSlice.bingo]);
  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
        <Background />
      <BingoTitle fill={tileSlice.bingo} />
      <div className="w-full flex">
        <div className="flex-1 h-full flex justify-center">
            <div className="md:w-[250px] h-[350px] bg-[#2623244f] rounded-2xl">
                <span className="text-black bg-pink-100 w-full h-[30px] inline-flex rounded justify-center items-center">Player-13344</span>
            </div>
        </div>
        <GameGrid valArr={tileSlice.value}/>
        <div className="flex-1 h-full"></div>
      </div>
      <div className="w-[60px] h-[60px] absolute top-5 right-5">
        {showTimer && <GameTimer durationSeconds={12} remaining={remaining as number} />}
      </div>
    </div>
  );
};

export default GamePage;
