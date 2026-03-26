import { useState } from 'react'
import './App.css'
import HomePage from './modules/pages/home/HomePage';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import HostPage from './modules/pages/host/HostPage';
import JoinPage from './modules/pages/join/JoinPage';
import Handler from './modules/shared/components/layer/Handler';
import LobbyPage from './modules/pages/lobby/LobbyPage';
import GamePage from './modules/pages/game/GamePage';
import WinPage from './modules/pages/win/WinPage';
import Navbar from './modules/shared/components/navbar/Navbar';
import { AnimatePresence } from 'framer-motion';

function App() {
    return <AnimatePresence mode='wait'>
    <BrowserRouter>
      <Handler />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/host/:roomid' element={<HostPage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/lobby/:roomid' element={<LobbyPage />} />
        <Route path='/room/:roomid' element={<GamePage />} />
        <Route path='/win' element={<WinPage />} />
        {/* <Outlet /> */}
      </Routes>
    </BrowserRouter>
    </AnimatePresence>;
}

export default App
