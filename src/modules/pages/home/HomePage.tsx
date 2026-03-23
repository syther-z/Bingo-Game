import React, { useEffect } from 'react'
import './style.css';
import GameMenu from '../../shared/components/menu/GameMenu';
import GameTitle from '../../shared/components/title/GameTitle';
import RemoteServer from '../../shared/service/RemoteServer';
const HomePage = () => {
  useEffect(() => {
    RemoteServer.close();
  }, []);
  return (
    <div className="w-screen h-screen">
      <div className="w-full blur-[0px] h-screen bg-image absolute top-0 z-[-1]">
        <div className="w-full h-full bg-[#232323]"></div>
      </div>
      <GameTitle/>
      <div className="h-[200px]"></div>
      <GameMenu/>
    </div>
  )
}

export default HomePage