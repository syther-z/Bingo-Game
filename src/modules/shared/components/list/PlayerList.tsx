import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameHandler from "../../handler/GameHandler";
const PlayerList = () => {
  const [players, setPlayers] = useState<Array<any>>([]);
  // const players: Array<any> = [];
  // const dispatch = useDispatch();
  useEffect(() => {
    const unsub = GameHandler.onPlayerChange((data) => {
      const { listOfPlayers } = data;
      setPlayers(listOfPlayers);
    });

    return () => unsub();
  }, []);
  
  return (
    <div className="max-w-[700px] w-full">
        <div className="text-white font-bold mb-2">Players</div>
        <div className="w-full h-[260px] rounded-[12px] border border-[#3a3a3a] bg-[#252424] p-3">
          {players.length === 0 ? (
            <div className="h-full w-full border border-dashed border-[#3a3a3a] rounded-[10px] flex items-center justify-center text-gray-400 text-sm">
              Waiting for players to join…
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {players.map((player, index) => (
                <div
                  key={`${player.id}-${index}`}
                  className="h-[40px] rounded-[6px] px-3 flex items-center justify-between bg-[#e1e3e3]"
                >
                  <span className="text-gray-900 font-semibold">{player.name}</span>
                  <span className="w-[10px] h-[10px] bg-green-400 rounded-2xl"></span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default PlayerList;
