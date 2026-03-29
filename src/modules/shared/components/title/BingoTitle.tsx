const BingoTitle = ({ fill = 5}) => {
    const title = ['B','I','N','G','O'];
  return (
    <div className="font-bold flex justify-center">
      {title.map((char, i) => {
        return (
          <span className="mr-[2px]">
            <div
              className={`flex justify-center w-[50px] ${
                fill - 1 >= i ? "text-[#a08eed] text-4xl" : "text-white text-4xl"
              }`}
            >
              {char}
            </div>
            <div className="w-full h-[50px] flex justify-center">
              {fill - 1 >= i && (
                <i className="fa-solid fa-check text-[#0ffa0f]"></i>
              )}
            </div>
          </span>
        );
      })}
    </div>
  );
};

export default BingoTitle;
