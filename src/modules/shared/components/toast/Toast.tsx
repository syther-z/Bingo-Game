import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux';
import './style.css';
import type { RootState } from '../../../redux/store';

const Toast = () => {
  const value = useSelector<RootState>(state => state.toastSlice.value) as Array<any>;
  useEffect(() => {
    console.log(value);
  }, [value]);
  return createPortal(
    <>
    {
      value.map(toast => {
        return <div className='min-w-(--toast-width) h-[50px] toast-slidein inter '>
          {[<span className='absolute left-4 inline-block rounded bg-green-600'><i className="fa-solid fa-check"></i></span>,
          <span className='absolute left-4 inline-block rounded bg-red-400'><i className="fa-solid fa-xmark"></i></span>,<span></span>
          ][toast.type]}
          <span className='font-bold font-mono ml-6'>{toast.message}</span>
    </div>;
      })
    }
    </>
    , document.body);
}

export default Toast;