import { motion } from "framer-motion";

const Grid = ({ index, updateGrids, cls }) => {
    const handleClick = () => {
        updateGrids(index);
    };
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="game-grid w-24 h-24 border-2 border-gray-50 rounded 
                       grid items-center cursor-pointer"
            onClick={handleClick}
        >
            {cls && (
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cls}
                ></motion.span>
            )}
        </motion.div>
    );
};

export default Grid;