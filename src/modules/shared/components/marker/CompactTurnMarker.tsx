import { useEffect, useState } from 'react'
import GameHandler from '../../handler/GameHandler';
import RemoteServer from '../../service/RemoteServer';

const CompactTurnMarker = () => {
    const [pos, setPos] = useState(0);
        const [players, setPlayers] = useState<Array<any>>([]);
        useEffect(() => {
            const unsub1 = GameHandler.onMarkNumber(() => {
                setPos(GameHandler.getCurrentTurn());
            });
            const unsub2 = GameHandler.onTurnChange(() => {
                setPos(GameHandler.getCurrentTurn());
            });
            const unsub3 = GameHandler.onPlayerChange((data) => {
                const { listOfPlayers } = data;
                setPlayers(listOfPlayers);
            });
    
            return () => {
                unsub1();
                unsub2();
                unsub3();
            };
        }, []);
  return (
    <div className='w-[250px] h-[50px] flex justify-evenly mt-4'>
        {
            players.map((player, i) => {
                return <span
                className={`w-[50px] h-[50px] rounded-3xl inline-flex ${pos === i ? 'bg-(--tileActiveColor) scale-[1.05] shadow-[0_0_15px_2px_var(--tileActiveColor)]' : 'bg-[#a84c4c]'}
                font-extrabold pixelify-sans transition-all duration-200 ease-in-out
                text-white justify-center items-center`}
                >{player.id === RemoteServer.getID() ? 'YOU' : 'P'+(i+1)}</span>
            })
        }
    </div>
  )
}

export default CompactTurnMarker