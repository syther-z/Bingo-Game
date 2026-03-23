import React from 'react'
import './style.css';
const GameTitle = () => {
    let titleMain = "BINGO";
    let titleSec = "GAME";
  return (
    <div className="text-center pt-[100px] flex gap-1 flex-col justify-center items-center">
      <div>
      {
        titleMain.split('').map((char, index) => {
          return <span key={`${char}-${index}`}><span className="head-text-size title-main title-box">{char}</span><span> </span></span>
        })
      }
      </div>
      <div>
      {
        titleSec.split('').map((char, index) => {
          return <span key={`${char}-${index}`}><span className="head-text-size title-sec title-box">{char}</span><span> </span></span>
        })
      }
      </div>
      </div>
  );
}

export default GameTitle;