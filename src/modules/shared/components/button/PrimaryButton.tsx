import React, { useEffect, useState, type MouseEventHandler } from "react";
import "./style.css";


type primaryType = {
    style: React.CSSProperties,
    backgroundColor: string,
    zColor: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    children: any
};

const PrimaryButton = (props : primaryType) => {
  const [isDown, setIsDown] = useState(false);
  useEffect(() => {
    const unsub = document.addEventListener('pointerup', () => {
      setIsDown(false);
    });
    () => removeEventListener("pointerup", unsub!);
  }, []);
  return (
    <button
      style={{
        background: props.backgroundColor,
        boxShadow: isDown
          ? `0px 0px 15px ${props.backgroundColor}, 0px 0px 0px ${props.zColor}`
          : `0px 0px 15px ${props.backgroundColor}, 0px 10px 0px ${props.zColor}`,
        translate: isDown ? "0px 10px" : "0px 0px",
        ...props.style,
      }}
      onClick={props.onClick}
      onPointerDown={() => setIsDown(true)}
      // onPointerUp={() => setIsDown(false)}
      className="text-white bg-red-400 h-[50px] rounded-[10px] min-w-[150px]
        transition-all duration-200 primary-style px-2
        "
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
