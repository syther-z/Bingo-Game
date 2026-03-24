import { useNavigate, useParams } from 'react-router-dom'
import PlayerList from '../../shared/components/list/PlayerList';
import PrimaryButton from '../../shared/components/button/PrimaryButton';
import GameHandler from '../../shared/handler/GameHandler';
import { useEffect } from 'react';
import Background from '../../shared/components/background/Background';
const HostPage = () => {
    const { roomid } = useParams();
    const navigate = useNavigate();
    let titleMain = 'ROOM';
    useEffect(() => {
      GameHandler.onStartGame(() => {
        navigate(`/room/${roomid}`);
      });
    }, []);

    

  return (
    <div className='w-screen h-screen p-5 flex flex-col gap-5 items-center'>
      <Background />
        {/* <h2 className='text-center text-[35px] font-bold text-white'>Room ID</h2> */}
        <div>{
        titleMain.split('').map((char, i) => {
          return (
            <span key={`${char}-${i}`}>
              <span className="head-text-size title-sec title-box">{char}</span>
              <span> </span>
            </span>
          );
        })
      }</div>
        <div className='max-w-[600px] h-[60px] w-full rounded-[12px] bg-[#ecf1f2] mt-10 flex shadow-[0_10px_0px_0px_#414141]'>
            <div className='w-8/10 h-full rounded-tl-[10px] rounded-bl-[10px] flex justify-center items-center font-[monospace]
            text-2xl text-gray-700 font-bold'>{roomid}</div>
            <div className='w-2/10 h-full rounded-tr-[10px] rounded-br-[10px] bg-[#474b3f] flex justify-center items-center text-2xl'><i className="fa-solid fa-copy text-gray-300"></i></div>
        </div>
        {/* <PlayerList/> */}

        <PrimaryButton
          style={{marginBottom: '10px'}}
          backgroundColor={'#9b73f8'}
          zColor={'rgb(103 43 243)'}
          onClick={() => GameHandler.startGame()}
        >
          Start <i className="fa-solid fa-arrow-right"></i>
        </PrimaryButton>

        <PlayerList/>
    </div>
  )
}

export default HostPage