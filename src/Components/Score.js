const Score = ({xscore,oscore}) => {
    return (
      <span
        className="py-2 px-2 my-2 bg-transparent text-gray-50 bg-gray-50 w-full 
        rounded transition font-bold cursor-default text-5xl"
      >
        {`X : ${xscore} | O : ${oscore}`}
      </span>
    );
  };
  
  export default Score;
  