import React, { useState, type MouseEventHandler } from "react";
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
      onPointerUp={() => setIsDown(false)}
      className="text-white bg-red-400 h-[50px] rounded-[10px] w-[150px] button-text-size
        transition-all duration-200
        "
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
