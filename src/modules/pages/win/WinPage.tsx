import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./style.css";
import Background from "../../shared/components/background/Background";

const WinPage = () => {
  const navigate = useNavigate();
  const { roomid } = useParams();
  const title = "BINGO".split("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [player, setPlayer] = useState({
    name: '------',
    id: '-------',
    roomid: '--------'
  });
  useEffect(() => {
    setPlayer({
      name: searchParams.get('winnername') ?? '-----',
      id: searchParams.get('id') ?? '-----',
      roomid: searchParams.get('roomid') ?? '------'
    });
  }, []);

  return (
    <div className=" text-white bg-(--homepage-color) w-screen h-screen flex items-center justify-center">
      {/* <Background /> */}
      <div className="win-grid" aria-hidden="true"></div>
      <div className="win-shell relative z-10 w-full max-w-[900px] px-5">
        <div className="win-card p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <div className="win-pill">YOU WON</div>
              <h1 className="win-title">BINGO!</h1>
              {/* <p className="win-subtitle">
                Clean lines, quick taps. That board is yours.
              </p> */}
              <p className="win-subtitle">
                {player.name}
              </p>
              <div className="win-bingo-row mt-6">
                {/* {title.map((char, index) => (
                  <span key={`${char}-${index}`} className="win-bingo-tile">
                    {char}
                  </span>
                ))} */}
              </div>
              <div className="win-room-tag mt-5">
                Room ID: <span>{(player.roomid).toUpperCase()}</span>
              </div>
            </div>

            <div className="win-stamp">
              <i className="fa-solid fa-trophy"></i>
              <span className="win-stamp-text">Winner</span>
            </div>
          </div>

          {/* <div className="win-stats mt-10">
            <div className="win-stat">
              <span className="win-stat-label">Lines</span>
              <span className="win-stat-value">5</span>
            </div>
            <div className="win-stat">
              <span className="win-stat-label">Tiles Marked</span>
              <span className="win-stat-value">17</span>
            </div>
            <div className="win-stat">
              <span className="win-stat-label">Finish Time</span>
              <span className="win-stat-value">02:18</span>
            </div>
          </div> */}

          <div className="win-actions mt-10">
            <button className="win-btn-primary" onClick={() => navigate("/")}>
              Play Again
            </button>
            <button className="win-btn-ghost" onClick={() => navigate("/join")}>
              Join New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinPage;
