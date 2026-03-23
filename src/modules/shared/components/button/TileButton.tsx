import React from "react";
import './style.css';

type tileType = {
    val: any,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const TileButton = ({val, onClick} : tileType) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className={`rounded-[7px] transition-all duration-200 ${val.selected ? 'tile-selected' :  (val.marked) ? 'tile-active' : 'tile-passive'}`}
    >
      {val.num}
    </button>
  );
};

export default TileButton;
