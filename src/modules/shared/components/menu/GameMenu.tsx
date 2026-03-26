import React from "react";
import PrimaryButton from "../button/PrimaryButton";
// import { getRoomId } from '../../utils/roomIdGenerator';
import { useNavigate } from "react-router-dom";
import { getRoomId } from "../../utils/IdGenerator";
import GameHandler from "../../handler/GameHandler";
const GameMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center gap-3">
      <PrimaryButton
        style={{animationDuration: '200ms'}}
        backgroundColor={"rgb(4 125 211)"}
        zColor={"rgb(1 85 145)"}
        onClick={() => {
          const roomId = getRoomId();
          GameHandler.hostGame(roomId);
          navigate(`/host/${roomId}`);
        }}
      >
        Host
      </PrimaryButton>
      <PrimaryButton
        style={{animationDuration: '300ms'}}
        backgroundColor={"rgba(255,93,93,1)"}
        zColor={"rgba(155,0,0,1)"}
        onClick={() => navigate("/join")}
      >
        Join
      </PrimaryButton>
    </div>
  );
};

export default GameMenu;
