import React, { useEffect } from "react";
import TileButton from "../button/TileButton";
import GameHandler from "../../handler/GameHandler";
import { useDispatch } from "react-redux";
import { markNum, unmarkNum } from "../../../redux/slice/TileSlice";

type propsType = {
    valArr: Array<any>
};

const GameGrid = ({ valArr }: propsType) => {
    const dispatch = useDispatch();

    const onClick = (val: any) => {
        if(GameHandler.getTurn() !== GameHandler.getCurrentTurn()) return null;
        dispatch(markNum(val.num));
        GameHandler.markNumber(val.num);
    };
  return (
   <div className="w-[350px] h-[350px] relative">
     <div className="w-[350px] h-[350px] grid grid-area text-white text-[18px] font-[monospace]">
      {valArr.map((val) => {
        return (
          <TileButton key={val.num} val={val} onClick={() => onClick(val)} />
        );
      })}
    </div>
    {/* <div className="absolute top-0 h-full w-full bg-red-100">

    </div> */}
   </div>
  );
};

export default GameGrid;
