import { useEffect } from 'react'
import './style.css';
import GameMenu from '../../shared/components/menu/GameMenu';
import GameTitle from '../../shared/components/title/GameTitle';
import Background from '../../shared/components/background/Background';
import Navbar from '../../shared/components/navbar/Navbar';
// import useToast from '../../shared/hooks/usetoast';
import MyName from '../../shared/components/editname/MyName';
const HomePage = () => {
  // const toast = useToast();
  useEffect(() => {
    // RemoteServer.close();
      
  }, []);
  return (
    <div className=" w-screen h-screen">
      <Background />
      <Navbar title={'HOME'} />
      {/* <Background /> */}
      <GameTitle/>
      <div className="h-[200px]"></div>
      <MyName />
      <GameMenu/>
    </div>
  )
}

export default HomePage