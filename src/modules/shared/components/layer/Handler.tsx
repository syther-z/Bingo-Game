import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import GameHandler from '../../handler/GameHandler';
const Handler = () => {
    useEffect(() => {
        // GameHandler
    }, []);
  return <Outlet />;
}

export default Handler;