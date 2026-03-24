import React, { useEffect } from 'react'
import './style.css';
import GameMenu from '../../shared/components/menu/GameMenu';
import GameTitle from '../../shared/components/title/GameTitle';
import RemoteServer from '../../shared/service/RemoteServer';
import Background from '../../shared/components/background/Background';
const HomePage = () => {
  useEffect(() => {
    RemoteServer.close();
  }, []);
  return (
    <div className="bg-(--homepage-color) w-screen h-screen">
      {/* <Background /> */}
      <GameTitle/>
      <div className="h-[200px]"></div>
      <GameMenu/>
    </div>
  )
}

export default HomePage