import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../shared/components/button/PrimaryButton";
// import "./style.css";
import GameHandler from '../../shared/handler/GameHandler';
import RemoteServer from "../../shared/service/RemoteServer";
import Navbar from "../../shared/components/navbar/Navbar";
import Background from "../../shared/components/background/Background";
const JoinPage = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const titleMain = "JOIN";

  const handleJoin = async () => {
    if (!roomId.trim()) return;
    await RemoteServer.connect();
    const id = parseInt(roomId);
    if(isNaN(id)) return;
    GameHandler.joinRoom(id, () => {
      navigate(`/lobby/${id}`);
    });
  };

  return (
    <div className="w-screen h-screen  p-5 flex flex-col gap-5 items-center justify-center">
      <Background />
      <Navbar title={'JOIN'} />
      {/* <div className="mt-12">
        {titleMain.split("").map((char, index) => {
          return (
            <span key={`${char}-${index}`}>
              <span className="head-text-size title-sec title-box">{char}</span>
              <span> </span>
            </span>
          );
        })}
      </div> */}

      <div className="max-w-[600px] h-[60px] w-full rounded-[12px] bg-[#ecf1f2] mt-10 flex shadow-[0_10px_0px_0px_#919191] overflow-hidden">
        <input
          type="text"
          value={roomId}
          maxLength={8}
          onChange={(event) => setRoomId(event.target.value.toUpperCase())}
          placeholder="Enter Room ID"
          className="w-full h-full px-6 font-[monospace] text-2xl text-gray-700 font-bold outline-none"
        />
      </div>

      <PrimaryButton
        style={{ marginBottom: "10px" }}
        backgroundColor={"rgba(255,93,93,1)"}
        zColor={"rgba(155,0,0,1)"}
        onClick={handleJoin}
      >
        Join Room  <i className="fa-solid fa-arrow-right"></i>
      </PrimaryButton>
    </div>
  );
};

export default JoinPage;
