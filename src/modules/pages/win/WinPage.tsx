import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

const WinPage = () => {
  const navigate = useNavigate();
  const { roomid } = useParams();
  const title = "BINGO".split("");

  return (
    <div className="win-page w-screen h-screen flex items-center justify-center">
      <div className="win-confetti" aria-hidden="true"></div>
      <div className="win-shell relative z-10 w-full max-w-[980px] px-5">
        <div className="win-card p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <div className="win-badge">Victory Unlocked</div>
              <h1 className="win-title">Champion!</h1>
              <p className="win-subtitle">
                You completed the board and clinched the win in style.
              </p>
              <div className="win-bingo-row mt-6">
                {title.map((char, index) => (
                  <span key={`${char}-${index}`} className="win-bingo-tile">
                    {char}
                  </span>
                ))}
              </div>
              <div className="win-room-tag mt-5">
                Room ID: <span>{(roomid || "----").toUpperCase()}</span>
              </div>
            </div>

            <div className="win-trophy-block">
              <div className="win-trophy-ring">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div className="win-trophy-caption">Top Player</div>
            </div>
          </div>

          <div className="win-stats mt-10">
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
          </div>

          <div className="win-actions mt-10">
            <button className="win-btn-primary" onClick={() => navigate("/")}
            >
              Play Again
            </button>
            <button className="win-btn-ghost" onClick={() => navigate("/join")}
            >
              Join New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinPage;
