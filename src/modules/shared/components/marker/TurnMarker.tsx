import { useEffect, useState } from 'react'
import './style.css';
import GameHandler from '../../handler/GameHandler';
import RemoteServer from '../../service/RemoteServer';
const TurnMarker = () => {
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
    <div className="md:w-[250px] h-[350px] bg-[#26232400] rounded-2xl p-2 border-dotted  border-[#ffffff68] flex">
                <div className='h-full w-[30px] inline-block align-bottom relative'>
        <span 
        style={{
            top: `${pos * 30 + 2}px`
        }}
        className='marker inline-block absolute transition-all duration-200 ease-in-out'></span>
    </div>
                <div className='inline-block h-full align-top flex-1'>
                    {/* <span>1</span> */}
                {
                    players.map((player) => {
                        return <span className="text-black bg-[#faf7f5e6] w-full h-[30px] inline-flex rounded-[15px] justify-center items-center mt-[2px] pixelify-sans font-thin !text-[18px]">
                            {RemoteServer.getID() === player.id ? 'YOU' : player.name}
                        </span>;
            
                    })
                }
                </div>
            </div>
  )
}

export default TurnMarker;