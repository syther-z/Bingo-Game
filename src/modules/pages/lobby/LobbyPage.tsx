import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../shared/components/button/PrimaryButton";
// import "./style.css";
import PlayerList from "../../shared/components/list/PlayerList";
import GameHandler from "../../shared/handler/GameHandler";
import RemoteServer from "../../shared/service/RemoteServer";
import Background from "../../shared/components/background/Background";
import Navbar from "../../shared/components/navbar/Navbar";

const LobbyPage = () => {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const titleMain = "LOBBY";

  useEffect(() => {
    GameHandler.onStartGame((data) => {
      navigate(`/room/${GameHandler.getRoomID()}`);
    });
  }, []);

  return (
    <div className="w-screen h-screen p-5 flex flex-col gap-5 items-center">
      <Background />
      <Navbar title={'lobby'} />
      {/* <div>
        {titleMain.split("").map((char, index) => {
          return (
            <span key={`${char}-${index}`}>
              <span className="head-text-size title-sec title-box">{char}</span>
              <span> </span>
            </span>
          );
        })}
      </div> */}

      <div className="max-w-[600px] h-[60px] mt-12 w-full rounded-[12px] bg-[#ecf1f2] mt-6 flex shadow-[0_10px_0px_0px_#414141] overflow-hidden">
        <div
          className="w-8/10 h-full rounded-tl-[10px] rounded-bl-[10px] flex justify-center items-center font-[monospace]
            text-2xl text-gray-700 font-bold"
        >
          {(roomid || "----").toUpperCase()}
        </div>
        <div className="w-2/10 h-full rounded-tr-[10px] rounded-br-[10px] bg-[#474b3f] flex justify-center items-center text-2xl">
          <i className="fa-solid fa-users text-gray-300"></i>
        </div>
      </div>

      <div className="max-w-[700px] w-full rounded-[12px] border border-[#3a3a3a5f] bg-[#1f1f1f60] p-4 shadow-[0_10px_0px_0px_#1a1a1a] pixelify-sans">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Status</span>
          <div className="flex items-center gap-2">
            <span className="w-[8px] h-[8px] bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-yellow-200 text-sm">Waiting for host to start…</span>
          </div>
        </div>
        <div className="text-gray-300 text-sm mt-3">
          You will enter the game automatically when the host presses start.
        </div>
      </div>

      <PlayerList/>

      <PrimaryButton
        style={{ marginBottom: "10px" }}
        backgroundColor={"rgba(255,93,93,1)"}
        zColor={"rgba(155,0,0,1)"}
        onClick={() => {
          RemoteServer.close();
          navigate("/join");
        }}
      >
        Leave Lobby
      </PrimaryButton>
    </div>
  );
};

export default LobbyPage;
