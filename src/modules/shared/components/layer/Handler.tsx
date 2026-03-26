import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import GameHandler from '../../handler/GameHandler';
import useToast from '../../hooks/usetoast';
const Handler = () => {
  const toast = useToast();
    useEffect(() => {
        GameHandler.onAlertChange((data) => {
          const { message, type } = data;
          toast(message, type ? {
            type
          } : undefined);
        });
    }, []);
  return <Outlet />;
}

export default Handler;