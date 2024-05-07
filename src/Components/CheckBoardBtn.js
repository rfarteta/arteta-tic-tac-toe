const CheckBoardBtn = ({ checkBoard }) => {
  return (
    <button
      className="py-2 px-2 my-2 bg-transparent border-2 border-gray-50 text-gray-50 bg-gray-50 w-full 
        rounded transition font-bold cursor-pointer hover:bg-gray-950 hover:text-gray-50"
      onClick={() => checkBoard()}
    >
      Check Board
    </button>
  );
};

export default CheckBoardBtn;
