import { useState } from 'react'
import GameHandler from '../../handler/GameHandler';

const MyName = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState(GameHandler.getName());
    let onClick = () => {
        setShowEdit(!showEdit);
    };
    console.log(name);
  return (
    <div className='text-white w-full text-center mb-4'>
        {!showEdit ? 
            <>
            <span className='text-[1.1rem]'>{GameHandler.getName()} </span>
        <button className='cursor-pointer' onClick={() => { onClick(); }}><i className="fa-solid fa-pencil"></i></button> </>: <>
        <input  autoFocus={true}
            onBlur={() => setShowEdit(false)}
        className='rounded border w-[150px]'
        type="text" value={name!} onChange={(v) => { setName(v.target.value); localStorage.setItem('player-name', v.target.value); }} />
        <button className='cursor-pointer bg-white text-black rounded ml-1' onClick={() => { onClick(); }}><i className="fa-solid fa-check"></i></button></>}
    </div>
  );
}

export default MyName;